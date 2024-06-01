import Card from 'react-bootstrap/Card';
import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { deleteComment } from '../api/commentData';
import { useAuth } from '../utils/context/authContext';

function CommentCard({ commentObj, onUpdate }) {
  const { user } = useAuth();
  const deleteThisComment = () => {
    if (window.confirm('Delete this comment?')) {
      deleteComment(commentObj.id).then(() => {
        onUpdate();
      });
    }
  };

  return (
    <Card className="commentCardBody">
      <Card.Header>{commentObj.user.userName} commented:</Card.Header>
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p>
            {' '}
            {commentObj.content}
            {' '}
          </p>
        </blockquote>
      </Card.Body>
      {commentObj.userId === user.id ? (
        <Card.Footer>
          <Button type="button" variant="outline-danger" onClick={deleteThisComment}>Delete</Button>
        </Card.Footer>
      ) : null}
    </Card>
  );
}

CommentCard.propTypes = {
  commentObj: PropTypes.shape({
    id: PropTypes.number,
    userId: PropTypes.number,
    postId: PropTypes.number,
    content: PropTypes.string,
    user: PropTypes.shape({
      id: PropTypes.number,
      userName: PropTypes.string,
    }),
  }),
  onUpdate: PropTypes.func.isRequired,
}.isRequired;

export default CommentCard;
