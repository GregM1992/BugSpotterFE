import { Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';
import Map from '../components/Map';
import { getPosts } from '../api/postData';
import RegisterForm from '../components/RegisterForm';

function Home() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const isUser = user?.id;

  const getAllPosts = () => {
    getPosts().then((data) => {
      setPosts(data);
    });
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  if (!isUser) {
    return (
      <RegisterForm />
    );
  }

  return (
    <div
      className="text-center flex-column justify-content-center landingPageContainer"
      style={{
        height: '75vh',
        padding: '30px',
        maxWidth: '700px',
        margin: '0 auto',
      }}
    >
      <h1 className="landingPageHeader">Welcome</h1>
      <h1 className="userName">{user.userName}</h1>
      <h1 className="landingPageHeader">to BugSpotter!</h1>
      <h4>Check out some of the posts around you!</h4>
      <Map posts={posts} />
      <h6 className="logOutText">Click the button below to logout!</h6>
      <Button variant="outline-danger" type="button" size="lg" className="copy-btn" onClick={signOut}>
        Sign Out
      </Button>
    </div>
  );
}

export default Home;
