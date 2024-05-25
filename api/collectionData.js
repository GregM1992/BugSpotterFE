const endpoint = 'https://localhost:7125';

const getCollectionsByUserId = (userId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/collections/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const createCollection = (collection) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/collections`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(collection),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateCollection = (id, collection) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/collections/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(collection),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteCollection = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/collections/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((data) => resolve(data))
    .catch(reject);
});

const getSingleCollection = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/collections/details/${id}`, {
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
  getCollectionsByUserId, createCollection, updateCollection, deleteCollection,
  getSingleCollection,
};
