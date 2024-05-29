import React, { useEffect, useState } from 'react';
import { getSingleUsersPosts } from '../api/postData';
import PostCard from '../components/PostCard';
import { useAuth } from '../utils/context/authContext';

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const { user } = useAuth();

  const getAllPosts = () => {
    getSingleUsersPosts(user.id).then((data) => {
      setPosts(data);
    });
  };

  useEffect(() => {
    getAllPosts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.id]);

  return (
    <div>
      <h1>My Posts</h1>
      <div>
        {posts.map((post) => (
          <PostCard key={post.id} postObj={post} onUpdate={getAllPosts} location="feed" />
        ))}

      </div>
    </div>

  );
}
