import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import React from 'react';
import PropTypes from 'prop-types';

function PostCard({ postObj, onUpdate }) {
  const deletePost = () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      deletePost(postObj.id)
        .then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={postObj.image} />
      <Card.Body>
        <Card.Title />
        <Card.Text>
          {postObj.description}
        </Card.Text>
        <Button variant="primary" onClick={deletePost}>Delete</Button>
      </Card.Body>
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
    tags: PropTypes.shape({
      id: PropTypes.number,
      tagType: PropTypes.string,
    }),
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default PostCard;
