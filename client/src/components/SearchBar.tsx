import React, { useEffect, useMemo, useRef, useState } from 'react';
import Wrapper from '../assets/wrappers/SearchBar';
import { FaRegTimesCircle } from 'react-icons/fa';
import { FaSearch } from 'react-icons/fa';
import { client } from '../api/client';
import { AxiosError } from 'axios';
import { message } from 'antd';
import Loading from './Loading';
import PostCardU from './postcard/PostCardU';
import { Empty } from 'antd';
import { useNavigate } from 'react-router-dom';

interface SearchBarProps {
  className?: string;
}

interface IPost {
  _id: string;
  title: string;
  posterVerticalPath: string;
  type: string;
  duration: number;
  episodeCount: number;
  totalViews: number;
  airedFrom: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ className }) => {
  const [posts, setPosts] = useState<IPost[]>([]);

  const [title, setTitle] = useState('');
  const [searchTitle, setSearchTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [focus, setFocus] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const handleClickOutside = (event: MouseEvent) => {
    if (
      searchRef.current &&
      !searchRef.current.contains(event.target as Node)
    ) {
      setFocus(false);
    }
  };
  useEffect(() => {
    if (focus) {
      document.addEventListener('mouseup', handleClickOutside);
    } else {
      document.removeEventListener('mouseup', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mouseup', handleClickOutside);
    };
  }, [focus]);

  const navigate = useNavigate();

  const debouce = () => {
    let id: ReturnType<typeof setTimeout>;
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      clearTimeout(id);
      setTitle(e.target.value);
      id = setTimeout(() => {
        setSearchTitle(e.target.value);
      }, 1000);
    };
  };

  const opitimizeDebouce = useMemo(() => debouce(), []);

  useEffect(() => {
    if (!searchTitle || searchTitle.trim().length === 0) {
      setPosts([]);
      return;
    }

    const getPosts = async () => {
      setLoading(true);
      try {
        const response = await client.get(`/posts?name=${searchTitle}&limit=6`);
        setPosts(response.data.posts);
      } catch (err) {
        const error = err as AxiosError;
        message.error((error.response?.data as any)?.msg || 'unknow error');
      }
      setLoading(false);
    };

    getPosts();
  }, [searchTitle]);

  return (
    <Wrapper {...{ className }} ref={searchRef}>
      <button>
        <FaSearch />
      </button>
      <input
        type='text'
        value={title}
        onChange={opitimizeDebouce}
        onFocus={() => setFocus(true)}
      />
      <button
        onClick={() => {
          setTitle('');
          setSearchTitle('');
        }}
      >
        <FaRegTimesCircle />
      </button>
      <section className={`search-result${focus ? ' show' : ''}`}>
        {loading ? (
          <Loading />
        ) : (
          <div className='result-container'>
            {posts.length === 0 ? (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            ) : (
              posts.map((post) => {
                return (
                  <PostCardU
                    episodeCount={post.episodeCount}
                    imgUrl={post.posterVerticalPath}
                    title={post.title}
                    type={post.type}
                    key={post._id}
                    className='post'
                    onClick={() => {
                      setFocus(false);
                      navigate(`/posts/${post._id}`);
                    }}
                  />
                );
              })
            )}
            {/* {posts.length > 0 && (
                <button className='more-search'>More</button>
              )} */}
          </div>
        )}
      </section>
    </Wrapper>
  );
};

export default SearchBar;
