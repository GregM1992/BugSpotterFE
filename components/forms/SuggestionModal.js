import { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { getSinglePostByPostId } from '../../api/postData';
import { createIdentification } from '../../api/kindWiseApiData';
import { createSuggestion } from '../../api/suggestionData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  userId: 0,
  suggestionContent: '',
  postId: 0,
  suggestionId: 0,
};

function SuggestionModal({ onUpdate }) {
  const router = useRouter();
  const [suggestionOptions, setSuggestionOptions] = useState({ result: { classification: { suggestions: [] } } });

  const [formInput, setFormInput] = useState({});
  const { id } = router.query;
  const [show, setShow] = useState(false);
  const { user } = useAuth();

  const handleClose = () => setShow(false);

  const handleShow = async () => {
    const data = await getSinglePostByPostId(id);
    const idData = await createIdentification(data.image);
    setSuggestionOptions(idData);
    setShow(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createSuggestion(formInput).then(() => router.push(`/post/${id}`)).then(handleClose).then(() => {
      onUpdate();
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
      userId: user.id,
      postId: id,
      suggestionId: suggestionOptions.result.classification.suggestions.find((suggestion) => suggestion.name === value).id,
    }));
  };

  return (
    <>
      <Button variant="outline-dark" onClick={handleShow}>
        Add Suggestion
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Select a Suggestion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="ControlInput1">
              <Form.Label>What do you think this is?</Form.Label>
              <Form.Select
                aria-label="Select Suggestion"
                name="suggestionContent"
                onChange={handleInputChange}
                value={formInput.suggestionContent}
                required
              >
                <option value="" label="Select a Suggestion" />
                {suggestionOptions.result.classification.suggestions.map((suggestion) => (
                  <option
                    key={suggestion.id}
                    value={suggestion.name}
                    label={suggestion.name}
                    required
                  />
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="outline-secondary" onClick={handleSubmit}>
            Save Suggestion
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

SuggestionModal.propTypes = {
  suggestionObj: PropTypes.shape({
    id: PropTypes.number,
    suggestionContent: PropTypes.string,
    userId: PropTypes.number,
    postId: PropTypes.number,
  }),
  onUpdate: PropTypes.func.isRequired,
};

SuggestionModal.defaultProps = {
  suggestionObj: initialState,
};

export default SuggestionModal;
