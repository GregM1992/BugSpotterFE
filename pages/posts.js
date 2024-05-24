import React, { useEffect, useState } from 'react';
import { getPosts } from '../api/postData';
import PostCard from '../components/PostCard';

export default function Posts() {
  const [posts, setPosts] = useState([]);

  const getAllPosts = () => {
    getPosts().then((data) => {
      setPosts(data);
    });
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <div>
      <h1>Posts</h1>
      <div>
        {posts.map((post) => (
          <PostCard key={post.id} postObj={post} onUpdate={getAllPosts} />
        ))}
      </div>
    </div>

  );
}
