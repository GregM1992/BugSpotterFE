import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { deleteCollection } from '../api/collectionData';

function CollectionCard({ collectionObj, onUpdate }) {
  const router = useRouter();
  const deleteThisCollection = () => {
    if (window.confirm('Delete this collection?')) {
      deleteCollection(collectionObj.id).then(() => {
        onUpdate();
      });
    }
  };
  const viewPosts = () => { router.push(`/collection/${collectionObj.id}`); };
  const editPost = () => { router.push(`/collection/edit/${collectionObj.id}`); };

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{collectionObj.name}</Card.Title>
        <Card.Text>
          Posts in this collection: {collectionObj.numberOfPosts}
        </Card.Text>
        <Button variant="primary" onClick={viewPosts}>View Posts</Button>
        <Button variant="primary" onClick={editPost}>Edit</Button>
        <Button variant="danger" onClick={deleteThisCollection}>Delete</Button>
      </Card.Body>
    </Card>
  );
}

CollectionCard.propTypes = {
  collectionObj: PropTypes.shape({
    id: PropTypes.number,
    userId: PropTypes.number,
    name: PropTypes.string,
    numberOfPosts: PropTypes.number,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default CollectionCard;
