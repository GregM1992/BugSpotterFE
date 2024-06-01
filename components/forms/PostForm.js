import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { PropTypes } from 'prop-types';
import Button from 'react-bootstrap/Button';
import { useRouter } from 'next/router';
import { Container } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createPost, updatePost } from '../../api/postData';
import { getAllTags, addTagToPost } from '../../api/tagData';
import { getCollectionsByUserId } from '../../api/collectionData';
import Map from '../Map';

const initialState = {
  userId: 0,
  collectionId: 0,
  image: '',
  latitude: 0,
  longitude: 0,
  description: '',
  favorite: false,
  tags: [],
};

function PostForm({ postObj }) {
  const [formInput, setFormInput] = useState({ ...initialState });
  const [tags, setTags] = useState([]);
  const [collections, setCollections] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  const handleInputChange = (e, tagId) => {
    const {
      name, value, type, checked,
    } = e.target;

    if (type === 'checkbox') {
      const selectedTags = checked
        ? [...formInput.tags, tagId]
        : formInput.tags.filter((id) => id !== tagId);
      setFormInput((prevState) => ({
        ...prevState,
        tags: selectedTags,
        userId: user.id,
      }));
    } else {
      setFormInput((prevState) => ({
        ...prevState,
        [name]: value,
        userId: user.id,
      }));
    }
  };

  const handleLocationSelect = (location) => {
    setFormInput((prevState) => ({
      ...prevState,
      latitude: location.lat,
      longitude: location.lng,
    }));
  };

  const getTagsForList = () => {
    getAllTags().then(setTags);
  };

  const getCollectionsForList = () => {
    getCollectionsByUserId(user.id).then(setCollections);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setFormInput((prevState) => ({
        ...prevState,
        image: reader.result,
      }));
    };
  };

  useEffect(() => {
    if (postObj.id) {
      setFormInput(postObj);
    }
    getTagsForList();
    getCollectionsForList();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postObj.id]);

  const handleSubmit = (e) => {
    if (postObj.id) {
      e.preventDefault();
      updatePost(postObj.id, formInput)
        .then(() => {
          setFormInput(initialState);
          router.push(`/post/${postObj.id}`);
        });
    } else {
      e.preventDefault();
      createPost(formInput)
        .then((response) => {
          const tagPromises = formInput.tags.map((tagId) => addTagToPost(response.id, tagId));
          return Promise.all(tagPromises).then(() => response);
        })
        .then((response) => {
          setFormInput(initialState);
          router.push(`/collection/${response.collectionId}`);
        });
    }
  };

  return (
    <Form className="postForm" onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="ControlInput1">
        <Form.Label>Which collection are you adding to?</Form.Label>
        <Form.Select
          aria-label="Select Collection"
          name="collectionId"
          onChange={handleInputChange}
          value={formInput.collectionId}
          required
        >
          <option value="" label="Select a Collection" />
          {collections.map((collection) => (
            <option
              key={collection.id}
              value={collection.id}
              label={collection.name}
              required
            />
          ))}
        </Form.Select>
      </Form.Group>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Upload an image</Form.Label>
        <Form.Control type="file" onChange={handleFileUpload} required />
      </Form.Group>
      {tags.map((tag) => (
        <Form.Check
          key={tag.id}
          type="checkbox"
          label={tag.tagType}
          checked={formInput.tags.includes(tag.id)}
          onChange={(e) => handleInputChange(e, tag.id)}
        />
      ))}
      <Form.Group className="mb-3" controlId="ControlInput1">
        <Form.Label>Post Description</Form.Label>
        <Form.Control
          type="text"
          placeholder="Description"
          name="description"
          onChange={handleInputChange}
          value={formInput.description}
          required
        />
      </Form.Group>
      <Form.Label>Favorite?</Form.Label>
      <Form.Check
        className="text-white mb-3"
        type="switch"
        id="favorite"
        name="favorite"
        label="Favorite?"
        checked={formInput.favorite}
        onChange={(e) => {
          setFormInput((prevState) => ({
            ...prevState,
            favorite: e.target.checked,
          }));
        }}
      />
      <Container className="postFormMapContainer">
        <Map onLocationSelect={handleLocationSelect} />
      </Container>
      <p>Selected Location: Latitude {formInput.latitude}, Longitude {formInput.longitude}</p>
      <Button variant="outline-secondary" type="submit">
        {postObj.id ? 'Update Post' : 'Create Post'}
      </Button>
    </Form>
  );
}

PostForm.propTypes = {
  postObj: PropTypes.shape({
    id: PropTypes.number,
    userId: PropTypes.number,
    collectionId: PropTypes.number,
    image: PropTypes.string,
    latitude: PropTypes.number,
    longitude: PropTypes.number,
    description: PropTypes.string,
    favorite: PropTypes.bool,
    tags: PropTypes.arrayOf(PropTypes.number),
  }),
};

PostForm.defaultProps = {
  postObj: initialState,
};

export default PostForm;
