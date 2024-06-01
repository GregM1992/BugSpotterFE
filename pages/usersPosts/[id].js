import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleUsersPosts } from '../../api/postData';
import PostCard from '../../components/PostCard';
import { getSingleUser } from '../../api/userData';

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});
  const router = useRouter();
  const { id } = router.query;

  const getAllPosts = () => {
    getSingleUsersPosts(id).then((data) => {
      setPosts(data);
    });
  };
  const getUserInfo = () => {
    getSingleUser(id).then((data) => {
      setUser(data);
    });
  };

  useEffect(() => {
    getAllPosts();
    getUserInfo();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div className="myPostsDiv">
      <h1 className="myPostsTitle">{user.userName}&apos;s Posts</h1>
      <div className="myPostsDiv">
        {posts.length === 0 ? <h2>No posts yet</h2> : null}
        {posts.map((post) => (
          <PostCard key={post.id} postObj={post} onUpdate={getAllPosts} location="feed" />
        ))}

      </div>
    </div>

  );
}
