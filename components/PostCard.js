import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { deletePost } from '../api/postData';
import { useAuth } from '../utils/context/authContext';

function PostCard({ postObj, onUpdate, location }) {
  const router = useRouter();
  const { user } = useAuth();
  const deleteThisPost = () => {
    if (window.confirm('Delete this post?')) {
      deletePost(postObj.id).then(() => {
        onUpdate();
      });
    }
  };

  const viewDetails = () => {
    router.push(`/post/${postObj.id}`);
  };

  return (
    <Card className="postCardBody" style={{ width: '18rem' }}>
      <Card.Img className="postImage" src={postObj.image} />
      <Card.Body>
        <Card.Title />
        <Card.Text className="postDescription">
          {postObj.description}
        </Card.Text>
        <div className="tagContainer">
          {location === 'feed' ? postObj.tags.map((tag) => (
            <div
              className="tag"
              style={
            {
              padding: '5px',
              margin: '5px',
              borderRadius: '5px',
              border: '1px solid black',
              display: 'inline-block',
            }
          }
              key={tag.id}
            >{tag.tagType}
            </div>
          )) : <div />}
        </div>
      </Card.Body>
      {location !== 'details' ? (
        <Button className="postCardButtons" variant="outline-secondary" onClick={viewDetails}>View</Button>
      ) : <><div /></>}
      {location !== 'details' && postObj.userId === user.id ? (
        <Button className="postCardButtons" variant="outline-secondary" onClick={deleteThisPost}>Delete</Button>
      ) : <><div /></>}
    </Card>
  );
}

PostCard.propTypes = {
  postObj: PropTypes.shape({
    id: PropTypes.number,
    userId: PropTypes.number,
    collectionId: PropTypes.number,
    image: PropTypes.string,
    latitude: PropTypes.number,
    longitude: PropTypes.number,
    description: PropTypes.string,
    favorite: PropTypes.bool,
    tags: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        tagType: PropTypes.string,
      }),
    ),
  }).isRequired,
  location: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default PostCard;
