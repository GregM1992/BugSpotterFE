import Card from 'react-bootstrap/Card';
import React from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { deleteSuggestion } from '../api/suggestionData';
import { useAuth } from '../utils/context/authContext';

function SuggestionCard({ suggestionObj, onUpdate }) {
  const { user } = useAuth();
  const router = useRouter();
  const deleteThisSuggestion = () => {
    if (window.confirm('Delete this suggestion?')) {
      deleteSuggestion(suggestionObj.id).then(() => {
        onUpdate();
      });
    }
  };

  const pushToSuggestionDetails = () => {
    router.push(`/suggestion/${suggestionObj.suggestionContent}`);
  };

  return (
    <Card className="suggestionCardBody">
      <Card.Header>{suggestionObj.user.userName} suggests:</Card.Header>
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p>
            {' '}
            {suggestionObj.suggestionContent}
            {' '}
          </p>
        </blockquote>
      </Card.Body>
      {suggestionObj.userId === user.id ? (
        <Card.Footer>
          <Button type="button" variant="outline-danger" onClick={deleteThisSuggestion}>Delete</Button>
          <Button type="button" variant="outline-secondary" onClick={pushToSuggestionDetails}>Suggestion Info</Button>
        </Card.Footer>
      ) : null}
    </Card>
  );
}

SuggestionCard.propTypes = {
  suggestionObj: PropTypes.shape({
    id: PropTypes.number,
    userId: PropTypes.number,
    postId: PropTypes.number,
    suggestionContent: PropTypes.string,
    suggestionId: PropTypes.string,
    user: PropTypes.shape({
      id: PropTypes.number,
      userName: PropTypes.string,
    }),
  }),
  onUpdate: PropTypes.func.isRequired,
}.isRequired;

export default SuggestionCard;
