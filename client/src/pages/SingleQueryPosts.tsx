import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getAuthClient } from '../api/client';
import Loading from '../components/Loading';
import PostCardI from '../components/postcard/PostCardI';
import Wrapper from '../assets/wrappers/SingleQueryPosts';
import { MdOutlineQueryStats } from "react-icons/md";
import { message } from 'antd';
import { AxiosError } from 'axios';
import Pagination from '../components/Pagination';

interface SingleQueryPostsProps {
  option?: {
    sort: 'updated' | 'added' | 'name-asc' | 'name-desc' | 'release';
    type: 'all' | 'tv' | 'movie' | 'ona' | 'ova';
    status: 'all' | 'airing' | 'completed' | 'waiting';
    season: 'all' | 'spring' | 'summer' | 'fall' | 'winter';
  };
  pageName: string;
}

interface Post {
  _id: string;
  title: string;
  posterVerticalPath: string;
  type: string;
  duration: number;
  episodeCount: number;
}

const SingleQueryPosts: React.FC<SingleQueryPostsProps> = ({
  option,
  pageName,
}) => {
  const navigate = useNavigate();
  const { genreId } = useParams();

  const [curPage, setCurPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [pgName, setPgName] = useState(pageName);

  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const getAllPosts = async () => {
      setLoading(true);
      try {
        let query: string;
        if (genreId) {
          query = `/by-genre/${genreId}?page=${curPage}`;
        } else if (option) {
          query = `?type=${option.type}&status=${option.status}&season=${option.season}&sort=${option.sort}&page=${curPage}`;
        } else {
          setLoading(false);
          return;
        }
        const response = await getAuthClient().get(`/posts${query}`);
        setPosts(response.data.posts);
        setTotalPages(response.data.totalPages);
        if ('genre' in response.data)
          setPgName(`${pageName}: ${response.data.genre}`);
      } catch (err) {
        const error = err as AxiosError;
        message.error((error.response!.data as any).msg);
      }
      setLoading(false);
    };
    getAllPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [curPage, option, genreId]);

  const handleChangePage = (page: number) => {
    setCurPage(page);
  };

  return (
    <Wrapper>
      <header>
        <span className='fav-icon'>
          <MdOutlineQueryStats />
        </span>
        <p>{pgName}</p>
      </header>
      {loading ? (
        <Loading
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        />
      ) : (
        <div className='container'>
          {posts.map((post) => {
            return (
              <PostCardI
                duration={post.duration}
                episodeCount={post.episodeCount}
                imgUrl={post.posterVerticalPath}
                title={post.title}
                type={post.type}
                className='post'
                key={post._id}
                onClick={() => {
                  navigate(`/posts/${post._id}`);
                }}
              />
            );
          })}
        </div>
      )}
      <Pagination
        disabled={loading}
        curPage={curPage}
        setCurPage={handleChangePage}
        totalPages={totalPages}
      />
    </Wrapper>
  );
};

export default SingleQueryPosts;
