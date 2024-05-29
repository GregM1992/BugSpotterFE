import PropTypes from 'prop-types';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { checkUser, registerUser } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';

function RegisterForm() {
  const user = useAuth();
  const [formData, setFormData] = useState({
    bio: '',
    uid: user.user.uid,
    userName: '',
    city: '',
    state: '',
    emailAddress: user.userEmail,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(formData).then(checkUser(user.user.uid)).then(() => {
      window.location.reload();
    });
  };

  const handleChange = ({ target }) => {
    setFormData((prev) => ({ ...prev, [target.name]: target.value }));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>UserName</Form.Label>
        <Form.Control
          as="textarea"
          name="userName"
          required
          placeholder="Enter your Username"
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Bio</Form.Label>
        <Form.Control
          as="textarea"
          name="bio"
          required
          placeholder="Enter your Bio"
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>City</Form.Label>
        <Form.Control
          as="textarea"
          name="city"
          required
          placeholder="What city are you in?"
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>State</Form.Label>
        <Form.Control
          as="textarea"
          name="state"
          required
          placeholder="What state are you in?"
          onChange={handleChange}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

RegisterForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    emailAddress: PropTypes.string.isRequired,
  }).isRequired,
};

export default RegisterForm;
