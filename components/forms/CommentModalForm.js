import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { createComment, updateComment } from '../../api/commentData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  content: ' ',
};

function CommentModalForm({ commentObj, onUpdate }) {
  const [show, setShow] = useState(false);
  const [formInput, setFormInput] = useState({});
  const { user } = useAuth();
  const router = useRouter();
  const { id } = router.query;

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);

  useEffect(() => {
    if (commentObj.id) {
      setFormInput(commentObj);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commentObj.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
      userId: user.id,
      postId: id,
      datePosted: new Date(),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.warn(commentObj);
    if (commentObj.id) {
      updateComment(commentObj.id, formInput).then(() => router.push(`/post/${id}`)).then(handleClose).then(() => {
        onUpdate();
      });
    } else {
      createComment(formInput).then(() => router.push(`/post/${id}`)).then(handleClose).then(setFormInput(initialState))
        .then(() => {
          onUpdate();
        });
    }
  };

  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <Button variant="outline-dark" onClick={handleShow}>
          Add Comment
        </Button>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Enter your comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group md="4" controlId="validationCustom02">
              <Form.Label className="text">Comment</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter your comment"
                name="content"
                onChange={handleChange}
                value={formInput.content}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Comment
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

CommentModalForm.propTypes = {
  commentObj: PropTypes.shape({
    id: PropTypes.number,
    postId: PropTypes.number,
    userId: PropTypes.number,
    content: PropTypes.string,
  }),
  onUpdate: PropTypes.func.isRequired,
};

CommentModalForm.defaultProps = {
  commentObj: initialState,
};

export default CommentModalForm;
