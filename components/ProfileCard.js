import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useAuth } from '../utils/context/authContext';

function ProfileCard({
  userObj, usersPosts, usersCollections, usersComments,
}) {
  const router = useRouter();
  const { user } = useAuth();

  const pushToMyPosts = () => {
    router.push('/myPosts');
  };

  const pushToMyCollections = () => {
    router.push('/collections');
  };

  return (
    <div className="profileCard">
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Col xs={6} md={4}>
            <Image src={user.photoURL} roundedCircle />
          </Col>
          <h3 className="profileCardTitle">
            {userObj.userName}&apos;s Profile
          </h3>
          <div className="profileUserItems">
            <p>
              Email: {userObj.emailAddress}
            </p>
            <p>
              Bio: {userObj.bio}
            </p>
            <p>
              City: {userObj.city}
            </p>
            <p>
              State: {userObj.state}
            </p>
          </div>
          <div className="profileUserStats">
            <p>
              Number of Posts: {usersPosts.length}
            </p>
            <p>
              Number of Collections: {usersCollections.length}
            </p>
            <p>
              Number of Comments: {usersComments.length}
            </p>
          </div>
          <div className="profileButtons">
            <Button variant="outline-secondary" className="singleProfileButton" onClick={pushToMyPosts}>Go to your Posts</Button>
            <Button variant="outline-secondary" onClick={pushToMyCollections}>Go to your Collections</Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

ProfileCard.propTypes = {
  userObj: PropTypes.shape({
    userName: PropTypes.string,
    email: PropTypes.string,
    bio: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
  }).isRequired,
  usersPosts: PropTypes.arrayOf(PropTypes.object),
  usersCollections: PropTypes.arrayOf(PropTypes.object),
  usersComments: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

export default ProfileCard;
