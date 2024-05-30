const endpoint = 'https://localhost:7125';

const getCommentsByPostId = (postId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/comments/${postId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const createComment = (comment) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(comment),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateComment = (id, comment) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/comments/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(comment),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteComment = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/comments/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((data) => resolve(data))
    .catch(reject);
});

const getCommentsByUserId = (userId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/comments/user/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getCommentsByPostId, createComment, updateComment, deleteComment,
  getCommentsByUserId,
};
