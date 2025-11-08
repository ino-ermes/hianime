import { NotFoundError } from '../errors';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Post from '../models/Post';
import PostGenre from '../models/PostGenre';
import ViewCount from '../models/ViewCount';
import Episode from '../models/Episode';
import User from '../models/User';
import Genre from '../models/Genre';
import { Types } from 'mongoose';
import Favorite from '../models/Favorite';
import History from '../models/History';
import Comment from '../models/Comment';

export const createPost = async (req: Request, res: Response) => {
  const body = Object.fromEntries(
    Object.entries(req.body).filter(
      ([_, value]) => value !== null && value !== undefined && value !== ''
    )
  );

  const post = await Post.create(body);

  const genres = body.genres as string[];
  const postGenres = genres.map((genre) => {
    return { post: post._id, genre };
  });

  await PostGenre.deleteMany({ post: post._id.toString() });
  await PostGenre.create(postGenres);

  res.status(StatusCodes.OK).json({ post: { ...post.toObject(), genres } });
};

export const updatePost = async (req: Request, res: Response) => {
  const { id } = req.params;

  const body = Object.fromEntries(
    Object.entries(req.body).filter(
      ([_, value]) => value !== null && value !== undefined && value !== ''
    )
  );

  const post = await Post.findByIdAndUpdate(id, body, {
    runValidators: true,
    new: true,
  });

  if (!post) throw new NotFoundError('post not found');

  const genres = body.genres as string[];
  const postGenres = genres.map((genre) => {
    return { post: post._id, genre };
  });

  await PostGenre.deleteMany({ post: post._id.toString() });
  await PostGenre.create(postGenres);

  res.status(StatusCodes.OK).json({ post: { ...post.toObject(), genres } });
};

export const getPost = async (req: Request, res: Response) => {
  const { id } = req.params;

  const { info } = req.query;

  if (info) {
    const post = await Post.findById(id).populate('studio');

    if (!post) throw new NotFoundError('post not found');

    const postGenres = await PostGenre.find({ post: id }).populate('genre');
    const episodeCount = await Episode.countDocuments({
      post: id,
      releaseDate: { $lt: new Date() },
    });
    const genres = postGenres.map((postGenre) => {
      return { _id: postGenre.genre._id, name: (postGenre.genre as any).name };
    });

    res
      .status(StatusCodes.OK)
      .json({ post: { ...post.toObject(), genres, episodeCount } });
  } else {
    const post = await Post.findById(id);

    if (!post) throw new NotFoundError('post not found');

    const postGenres = await PostGenre.find({ post: id }).select('-post');
    const genres = postGenres.map((postGenre) => postGenre.genre);
    const episodeCount = await Episode.countDocuments({
      post: id,
      releaseDate: { $lt: new Date() },
    });

    res
      .status(StatusCodes.OK)
      .json({ post: { ...post.toObject(), genres, episodeCount } });
  }
};

type SortOption = 'updated' | 'added' | 'name-asc' | 'name-desc' | 'release';
type TypeOption = 'all' | 'tv' | 'movie' | 'ona' | 'ova';
type StatusOption = 'all' | 'airing' | 'completed' | 'waiting';
type SeasonOption = 'all' | 'spring' | 'summer' | 'fall' | 'winter';

export const getAllPosts = async (req: Request, res: Response) => {
  let { sort, page, limit, name, type, status, season, year } = req.query;

  const isValidSort = (value: any): value is SortOption =>
    ['updated', 'added', 'name-asc', 'name-desc', 'release'].includes(value);
  const isValidType = (value: any): value is TypeOption =>
    ['all', 'tv', 'movie', 'ona', 'ova'].includes(value);
  const isValidStatus = (value: any): value is StatusOption =>
    ['all', 'airing', 'completed', 'waiting'].includes(value);
  const isValidSeason = (value: any): value is SeasonOption =>
    ['all', 'spring', 'summer', 'fall', 'winter'].includes(value);

  const sortT: SortOption = isValidSort(sort) ? sort : 'updated';
  const typeT: TypeOption = isValidType(type) ? type : 'all';
  const statusT: StatusOption = isValidStatus(status) ? status : 'all';
  const seasonT: SeasonOption = isValidSeason(season) ? season : 'all';
  const nameT = (name as string) || '';
  const pageT = Number.parseInt(page as string) || 1;
  const limitT = Number.parseInt(limit as string) || 12;
  const yearT = Number.parseInt(year as string) || null;

  let order: any;
  switch (sortT) {
    case 'added':
      order = {
        createdAt: -1,
      };
      break;
    case 'name-asc':
      order = {
        title: 1,
      };
      break;
    case 'name-desc':
      order = {
        title: -1,
      };
      break;
    case 'updated':
      order = {
        updatedAt: -1,
      };
      break;
    case 'release':
      order = {
        airedFrom: 1,
      };
      break;
  }

  const match: any = {};

  if (yearT) {
    let startDate: Date, endDate: Date;
    if (seasonT != 'all') {
      startDate = new Date();
      startDate.setFullYear(yearT);
      switch (seasonT) {
        case 'spring':
          startDate.setMonth(2);
          break;
        case 'summer':
          startDate.setMonth(5);
          break;
        case 'fall':
          startDate.setMonth(8);
          break;
        case 'winter':
          startDate.setMonth(11);
          break;
      }
      endDate = new Date(startDate);
      endDate.setMonth(startDate.getMonth() + 3);
    } else {
      startDate = new Date(yearT, 0, 1);
      endDate = new Date(yearT + 1, 0, 1);
    }
    match.airedFrom = { $gte: startDate, $lt: endDate };
  }

  if (typeT != 'all') match.type = typeT;
  if (statusT != 'all') match.status = statusT;
  if (nameT != '') {
    const nameRegex = new RegExp(nameT, 'i');
    match.title = { $regex: nameRegex };
  }
  const [result] = await Post.aggregate([
    {
      $match: match,
    },
    {
      $facet: {
        paginatedResults: [
          {
            $sort: order,
          },
          {
            $skip: (pageT - 1) * limitT,
          },
          {
            $limit: limitT,
          },
          {
            $lookup: {
              from: 'episodes',
              let: { post: '$_id' },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $and: [
                        { $eq: ['$post', '$$post'] },
                        { $lt: ['$releaseDate', new Date()] },
                      ],
                    },
                  },
                },
              ],
              as: 'episodes',
            },
          },
          {
            $addFields: {
              episodeCount: { $size: '$episodes' },
            },
          },
          {
            $project: {
              title: 1,
              posterVerticalPath: 1,
              duration: 1,
              episodeCount: 1,
              type: 1,
            },
          },
        ],
        totalCount: [{ $count: 'total' }],
      },
    },
  ]);

  const posts = result.paginatedResults;
  const totalCount =
    result.totalCount.length > 0 ? result.totalCount[0].total : 0;
  const totalPages = Math.floor(totalCount / limitT) + 1;

  res.status(StatusCodes.OK).json({ posts, page: pageT, totalPages });
};

export const deletePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await Post.deleteOne({ _id: id });

  if (result.deletedCount == 0)
    throw new NotFoundError('imagine there no heaven');

  await PostGenre.deleteMany({ post: id });
  await Episode.deleteMany({ post: id });
  await Favorite.deleteMany({ post: id });
  await History.deleteMany({ post: id });

  res.status(StatusCodes.OK).json({ msg: 'deleted successfully' });
};

export const getTopPosts = async (req: Request, res: Response) => {
  const { ago, description, posterHorizonPath, posterVerticalPath } = req.query;

  let numDays = 0;
  if (typeof ago === 'string') {
    numDays = Number.parseInt(ago) || 0;
  }

  const fromDate = new Date();
  fromDate.setDate(fromDate.getDate() - numDays);

  const project: any = {
    _id: 1,
    title: 1,
    type: 1,
    duration: 1,
    episodeCount: 1,
    totalViews: 1,
    airedFrom: 1,
  };

  if (description) project.description = 1;
  if (posterHorizonPath) project.posterHorizonPath = 1;
  if (posterVerticalPath) project.posterVerticalPath = 1;

  const posts = await ViewCount.aggregate([
    {
      $match: {
        date: { $gte: fromDate },
      },
    },
    {
      $group: {
        _id: '$post',
        totalViews: { $sum: '$count' },
      },
    },
    {
      $sort: { totalViews: -1 },
    },
    {
      $limit: 9,
    },
    {
      $lookup: {
        from: 'posts',
        localField: '_id',
        foreignField: '_id',
        as: 'postDetails',
      },
    },
    {
      $unwind: '$postDetails',
    },
    {
      $lookup: {
        from: 'episodes',
        let: { post: '$postDetails._id' },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ['$post', '$$post'] },
                  { $lt: ['$releaseDate', new Date()] },
                ],
              },
            },
          },
        ],
        as: 'filteredEpisodes',
      },
    },
    {
      $addFields: {
        'postDetails.episodeCount': { $size: '$filteredEpisodes' },
      },
    },
    {
      $addFields: {
        postDetails: {
          $mergeObjects: ['$postDetails', { totalViews: '$totalViews' }],
        },
      },
    },
    {
      $project: {
        _id: 0,
        postDetails: 1,
      },
    },
    {
      $replaceRoot: { newRoot: '$postDetails' },
    },
    {
      $project: project,
    },
  ]);

  res.status(StatusCodes.OK).json({ posts });
};

export const increaseView = async (req: Request, res: Response) => {
  const { id } = req.params;

  const curDate = new Date();
  curDate.setHours(0, 0, 0, 0);

  await ViewCount.updateOne(
    {
      post: id,
      date: curDate,
    },
    { $inc: { count: 1 } },
    { upsert: true, setDefaultsOnInsert: true }
  );

  res.status(StatusCodes.OK).json();
};

export const getStats = async (req: Request, res: Response) => {
  const usersCount = await User.countDocuments();
  const genresCount = await Genre.countDocuments();
  const postsCount = await Post.countDocuments();

  const postsCountPerGenre = await PostGenre.aggregate([
    {
      $group: {
        _id: { genre: '$genre' },
        count: { $count: {} },
      },
    },
    {
      $lookup: {
        from: 'genres',
        localField: '_id.genre',
        foreignField: '_id',
        as: 'genreInfo',
      },
    },
    {
      $unwind: '$genreInfo',
    },
    {
      $project: {
        _id: 0,
        genre: '$genreInfo.name',
        count: 1,
      },
    },
  ]);

  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  const viewsCountPerType = await ViewCount.aggregate([
    {
      $match: {
        date: { $gte: sixMonthsAgo },
      },
    },
    {
      $group: {
        _id: {
          year: { $year: '$date' },
          month: { $month: '$date' },
          post: '$post',
        },
        totalViews: { $sum: '$count' },
      },
    },
    {
      $project: {
        _id: 0,
        year: '$_id.year',
        month: '$_id.month',
        post: '$_id.post',
        totalViews: 1,
      },
    },
    {
      $lookup: {
        from: 'posts',
        localField: 'post',
        foreignField: '_id',
        as: 'postInfo',
      },
    },
    {
      $unwind: '$postInfo',
    },
    {
      $group: {
        _id: {
          year: '$year',
          month: '$month',
          type: '$postInfo.type',
        },
        totalViews: { $sum: '$totalViews' },
      },
    },
    {
      $project: {
        _id: 0,
        year: '$_id.year',
        month: '$_id.month',
        type: '$_id.type',
        totalViews: 1,
      },
    },
    {
      $sort: {
        year: 1,
        month: 1,
        type: 1,
      },
    },
  ]);

  const transformedData = viewsCountPerType.reduce((acc, item) => {
    const monthName = getMonthName(item.month);
    const name = `${monthName} ${item.year}`;

    if (!acc[name]) {
      acc[name] = { name };
    }

    acc[name][item.type] = item.totalViews;
    return acc;
  }, {});

  res.status(StatusCodes.OK).json({
    count: {
      usersCount,
      postsCount,
      genresCount,
    },
    viewsCountPerType: Object.values(transformedData),
    postsCountPerGenre,
  });
};

const getMonthName = (monthNumber: number) => {
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  return monthNames[monthNumber - 1];
};

export const getAllPostsByGenre = async (req: Request, res: Response) => {
  const { id } = req.params;

  const limit = Number.parseInt(req.query.limit as string) || 12;
  const page = Number.parseInt(req.query.page as string) || 1;

  const [result] = await PostGenre.aggregate([
    {
      $match: {
        genre: new Types.ObjectId(id),
      },
    },
    {
      $facet: {
        paginatedResults: [
          {
            $sort: {
              updatedAt: -1,
            },
          },
          {
            $skip: (page - 1) * limit,
          },
          {
            $limit: limit,
          },
          {
            $lookup: {
              from: 'posts',
              foreignField: '_id',
              localField: 'post',
              as: 'postInfo',
            },
          },
          {
            $unwind: '$postInfo',
          },
          {
            $replaceRoot: {
              newRoot: '$postInfo',
            },
          },
          {
            $lookup: {
              from: 'episodes',
              let: { post: '$_id' },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $and: [
                        { $eq: ['$post', '$$post'] },
                        { $lt: ['$releaseDate', new Date()] },
                      ],
                    },
                  },
                },
              ],
              as: 'episodes',
            },
          },
          {
            $addFields: {
              episodeCount: { $size: '$episodes' },
            },
          },
          {
            $project: {
              title: 1,
              posterVerticalPath: 1,
              duration: 1,
              episodeCount: 1,
              type: 1,
            },
          },
        ],
        totalCount: [{ $count: 'total' }],
      },
    },
  ]);

  const posts = result.paginatedResults;
  const totalCount =
    result.totalCount.length > 0 ? result.totalCount[0].total : 0;
  const totalPages = Math.floor(totalCount / limit) + 1;
  const genre = (await Genre.findById(id))?.name;

  res.status(StatusCodes.OK).json({ posts, page: page, totalPages, genre });
};
