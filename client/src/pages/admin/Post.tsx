import React from 'react';
import Wrapper from '../../assets/wrappers/admin/Post';
import PostForm from '../../components/PostForm';
import HeadNav from '../../components/HeadNav';
import { useParams } from 'react-router-dom';

const Post: React.FC = () => {
  const { postId } = useParams();
  return (
    <Wrapper>
      {postId ? (
        <HeadNav
          navs={[{ name: 'Posts', to: '/admin/posts' }, { name: 'Post' }]}
        />
      ) : (
        <HeadNav navs={[{ name: 'Add post' }]} />
      )}
      <div className='card-container'>
        <PostForm _id={postId} />
      </div>
    </Wrapper>
  );
};

export default Post;
