import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { client } from '../api/client';
import { AxiosError } from 'axios';
import { message } from 'antd';
import SearchForm from '../components/SearchForm';
import Wrapper from '../assets/wrappers/QueryPosts';
import Loading from '../components/Loading';
import PostCardI from '../components/postcard/PostCardI';
import Pagination from '../components/Pagination';
import { FaFilter } from 'react-icons/fa';

const QueryPosts: React.FC = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [curPage, setCurPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<
    {
      _id: string;
      title: string;
      posterVerticalPath: string;
      duration: number;
      episodeCount: number;
      type: string;
    }[]
  >([]);
  useEffect(() => {
    if (loading === false) {
      const getAllPosts = async () => {
        setLoading(true);
        try {
          const response = await client.get(`/posts?page=${curPage}&${query}`);
          setPosts(response.data.posts);
          setTotalPages(response.data.totalPages);
        } catch (err) {
          const error = err as AxiosError;
          message.error((error.response!.data as any)?.msg || 'unknow error');
        }
        setLoading(false);
      };
      getAllPosts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [curPage, query]);

  return (
    <Wrapper>
      <header>
        <span className='fav-icon'>
          <FaFilter />
        </span>
        <p>Filter</p>
      </header>
      <SearchForm
        disabled={loading}
        onFilter={(query) => {
          setQuery(query);
          setCurPage(1);
        }}
      />
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
      {posts.length > 0 && (
        <Pagination
          disabled={loading}
          curPage={curPage}
          setCurPage={setCurPage}
          totalPages={totalPages}
        />
      )}
    </Wrapper>
  );
};

export default QueryPosts;
