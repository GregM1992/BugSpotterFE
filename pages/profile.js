import { useEffect, useState } from 'react';
import { getSingleUsersPosts } from '../api/postData';
import { getCollectionsByUserId } from '../api/collectionData';
import { getCommentsByUserId } from '../api/commentData';
import { useAuth } from '../utils/context/authContext';
import ProfileCard from '../components/ProfileCard';
import { getSingleUser } from '../api/userData';

function Profile() {
  const [userDetails, setUserDetails] = useState({});
  const [usersPosts, setUsersPosts] = useState([]);
  const [usersCollections, setUsersCollections] = useState([]);
  const [usersComments, setUsersComments] = useState([]);
  const { user } = useAuth();

  const getUser = () => {
    getSingleUser(user.id).then((data) => {
      setUserDetails(data);
    });
  };

  const getUsersPosts = () => {
    getSingleUsersPosts(user.id).then((data) => {
      setUsersPosts(data);
    });
  };

  const getUsersCollections = () => {
    getCollectionsByUserId(user.id).then((data) => {
      setUsersCollections(data);
    });
  };

  const getUsersComments = () => {
    getCommentsByUserId(user.id).then((data) => {
      setUsersComments(data);
    });
  };

  useEffect(() => {
    getUser();
    getUsersPosts();
    getUsersCollections();
    getUsersComments();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.id]);

  return (
    <ProfileCard userObj={userDetails} usersPosts={usersPosts} usersCollections={usersCollections} usersComments={usersComments} />
  );
}

export default Profile;
