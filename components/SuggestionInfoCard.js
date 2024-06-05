import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import ListGroup from 'react-bootstrap/ListGroup';

function SuggestionInfoCard({ suggestionObj }) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{suggestionObj.name}</Card.Title>
        <Card.Text>
          {suggestionObj.description.value}
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        {suggestionObj.common_names.map((name) => (
          <ListGroup.Item key={name}>{name}</ListGroup.Item>
        ))}
      </ListGroup>
      <Card.Body>
        <Card.Link href={suggestionObj.url}>More Info</Card.Link>
      </Card.Body>
    </Card>
  );
}

SuggestionInfoCard.propTypes = {
  suggestionObj: PropTypes.shape({
    common_names: PropTypes.arrayOf(PropTypes.string),
    url: PropTypes.string,
    description: PropTypes.shape({
      value: PropTypes.string,
    }),
    image: PropTypes.shape({
      value: PropTypes.string,
    }),
    name: PropTypes.string,
  }),
}.isRequired;

export default SuggestionInfoCard;
