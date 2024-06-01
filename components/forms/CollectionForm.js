import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { PropTypes } from 'prop-types';
import Button from 'react-bootstrap/Button';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import { createCollection, updateCollection } from '../../api/collectionData';

const initialState = {
  name: '',
  favorite: false,
};
function CollectionForm({ collectionObj }) {
  const [formInput, setFormInput] = useState({ ...initialState });
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormInput({
      ...formInput,
      [name]: value,
      userId: user.id,
    });
  };

  useEffect(() => {
    if (collectionObj.id) {
      setFormInput(collectionObj);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collectionObj.id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (collectionObj.id) {
      updateCollection(collectionObj.id, formInput)
        .then(() => router.push(`/collection/${id}`));
      setFormInput(initialState);
    } else {
      createCollection(formInput).then(() => router.push('/collections'));
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="ControlInput1">
        <Form.Label>Collection Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Name this collection"
          name="name"
          onChange={handleInputChange}
          value={formInput.name}
          required
        />
      </Form.Group>
      <Button variant="outline-secondary" type="submit">
        Create Collection
      </Button>
    </Form>
  );
}

CollectionForm.propTypes = {
  collectionObj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    userId: PropTypes.number,
    favorite: PropTypes.bool,
  }),
};

CollectionForm.defaultProps = {
  collectionObj: initialState,
};
export default CollectionForm;
