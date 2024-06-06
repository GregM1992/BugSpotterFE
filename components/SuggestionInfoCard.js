import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import ListGroup from 'react-bootstrap/ListGroup';

function SuggestionInfoCard({ suggestionObj }) {
  return (
    <div className="detailsDiv">
      <Card className="suggestionDetailsCard" style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{suggestionObj.name}</Card.Title>
          {suggestionObj.image && suggestionObj.image.value && (
          <Card.Img variant="top" src={suggestionObj.image.value} />
          )}
          {suggestionObj.description && suggestionObj.description.value && (
          <Card.Text>
            {suggestionObj.description.value}
          </Card.Text>
          )}
        </Card.Body>
        <Card.Body>
          <Card.Title>Common Names</Card.Title>
          <ListGroup className="list-group-flush">
            {suggestionObj.common_names && suggestionObj.common_names.length > 0 ? (
              suggestionObj.common_names.map((name) => (
                <ListGroup.Item key={name}>{name}</ListGroup.Item>
              ))
            ) : (
              <ListGroup.Item>No common names found</ListGroup.Item>
            )}
          </ListGroup>
        </Card.Body>
        <Card.Body>
          {suggestionObj.url && (
          <Card.Link className="infoButton" href={suggestionObj.url} target="_blank">More Info</Card.Link>
          )}
        </Card.Body>
      </Card>
    </div>
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
  }).isRequired,
};

export default SuggestionInfoCard;
