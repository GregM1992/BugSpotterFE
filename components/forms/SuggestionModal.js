import { useEffect, useState } from 'react';
import { Form, Image } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { getSinglePostByPostId } from '../../api/postData';
import { createIdentification, getInsectDetails, searchInsects } from '../../api/kindWiseApiData';
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
  const [suggestionImage, setSuggestionImage] = useState('');
  const [, setInsectAccessToken] = useState('');
  const [, setInsect] = useState({
    common_names: [], url: '', description: { value: '' }, image: { value: '' },
  });

  const [formInput, setFormInput] = useState(initialState);
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

  const getInsect = async () => {
    try {
      const data = await searchInsects(formInput.suggestionContent);
      if (data.entities && data.entities.length > 0) {
        const accessToken = data.entities[0].access_token;
        setInsectAccessToken(accessToken);

        const insectData = await getInsectDetails(accessToken);
        setInsect(insectData);
        setSuggestionImage(insectData.image.value);
      } else {
        console.warn('No entities found for the provided suggestion content.');
      }
    } catch (error) {
      console.error('Error fetching insect data:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const selectedSuggestion = suggestionOptions.result.classification.suggestions.find((suggestion) => suggestion.name === value);

    if (selectedSuggestion) {
      setFormInput((prevState) => ({
        ...prevState,
        [name]: value,
        userId: user.id,
        postId: id,
        suggestionId: selectedSuggestion.id,
      }));
    }
  };

  useEffect(() => {
    if (formInput.suggestionContent) {
      getInsect();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formInput.suggestionContent]);

  return (
    <>
      <Button className="suggestionModalButton" variant="outline-dark" onClick={handleShow}>
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
              {suggestionImage && (
                <Image className="suggestionImage" src={suggestionImage} alt="suggestionImage" fluid />
              )}
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
  onUpdate: PropTypes.func.isRequired,
};

export default SuggestionModal;
