const endpoint = 'https://localhost:7125';

const getAllTags = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/tags`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const addTagToPost = (postId, tagId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/tags/${postId}/${tagId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getPostsTags = (postId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/postTags/${postId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

export { getAllTags, addTagToPost, getPostsTags };
