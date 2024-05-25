import Card from 'react-bootstrap/Card';
import React from 'react';
import PropTypes from 'prop-types';
import { deleteComment } from '../api/commentData';

function CommentCard({ commentObj, onUpdate }) {
  const deleteThisComment = () => {
    if (window.confirm('Delete this comment?')) {
      deleteComment(commentObj.id).then(() => {
        onUpdate();
      });
    }
  };

  return (
    <Card>
      <Card.Header>{commentObj.user.userName}</Card.Header>
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p>
            {' '}
            {commentObj.content}
            {' '}
          </p>
        </blockquote>
      </Card.Body>
      <button type="button" className="btn btn-danger" onClick={deleteThisComment}>Delete</button>
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
