import { Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';
import Map from '../components/Map';
import { getPosts } from '../api/postData';

function Home() {
  const { user } = useAuth();
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
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <h1>Hello {user.fbUser.displayName}! </h1>
      <p>Your Bio: {user.bio}</p>
      <Map posts={posts} />
      <p>Click the button below to logout!</p>
      <Button variant="danger" type="button" size="lg" className="copy-btn" onClick={signOut}>
        Sign Out
      </Button>
    </div>
  );
}

export default Home;
