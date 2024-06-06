const endpoint = 'https://localhost:7125';

const getSuggestionsByPostId = (postId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/suggestions/${postId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const createSuggestion = (suggestion) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/suggestions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(suggestion),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteSuggestion = (suggestionId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/suggestions/${suggestionId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((data) => resolve(data))
    .catch(reject);
});

export { getSuggestionsByPostId, createSuggestion, deleteSuggestion };
