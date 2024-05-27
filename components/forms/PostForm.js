import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { PropTypes } from 'prop-types';
import Button from 'react-bootstrap/Button';
import { useRouter } from 'next/router';
import { GoogleMap } from '@react-google-maps/api';
import { useAuth } from '../../utils/context/authContext';
import { createPost, updatePost } from '../../api/postData';
import { getAllTags } from '../../api/tagData';
import { getCollectionsByUserId } from '../../api/collectionData';

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
  const [collections, setCollections] = useState([{}]);
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
  const getTagsForList = () => {
    getAllTags().then((data) => {
      setTags(data);
      console.warn(data);
    });
  };
  const getCollectionsForList = () => {
    getCollectionsByUserId(user.id).then((data) => {
      setCollections(data);
    });
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
    e.preventDefault();
    if (postObj.id) {
      updatePost(postObj.id, formInput)
        .then(() => router.push(`/post/${id}`));
      setFormInput(initialState);
    } else {
      createPost(formInput).then(() => router.push('/posts'));
    }
  };

  return (
    <Form>
      <Form.Group className="mb-3" controlId="ControlInput1">
        <Form.Label>Which collection are you adding to?</Form.Label>
        <Form.Select
          aria-label="Select Collection"
          name="collectionId"
          onChange={handleInputChange}
          value={formInput.collectionId}
        >
          <option value="" label="Select a Collection" />
          {collections.map((collection) => (
            <option
              key={collection.id}
              value={collection.id}
              label={collection.name}
            />
          ))}
        </Form.Select>
      </Form.Group>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Upload an image</Form.Label>
        <Form.Control type="file" onChange={handleFileUpload} />
      </Form.Group>
      {tags.map((tag) => (
        <Form.Check
          key={tag.id}
          type="checkbox"
          label={tag.tagType}
          onChange={(e) => handleInputChange(e, tag)}
        />
      ))}
      <GoogleMap />
      <Form.Group className="mb-3" controlId="ControlInput1">
        <Form.Control
          type="text"
          placeholder="Description"
          name="description"
          onChange={handleInputChange}
          value={formInput.description}
        />
      </Form.Group>
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
      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Create Post
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
    tags: PropTypes.arrayOf(PropTypes.string),
  }),
};

PostForm.defaultProps = {
  postObj: initialState,
};

export default PostForm;
