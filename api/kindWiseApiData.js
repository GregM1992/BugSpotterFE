const endpoint = 'https://insect.kindwise.com';
const apiKey = process.env.NEXT_PUBLIC_INSECT_API_KEY;

const searchInsects = (searchInput) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/v1/kb/insect/name_search?q=${searchInput}`, {
    method: 'GET',
    headers: {
      'api-key': apiKey,
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getInsectDetails = (insectId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/v1/kb/insect/:${insectId}?details=common_names,url,description,image`, {
    method: 'GET',
    headers: {
      'api-key': apiKey,
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const createIdentification = (base64Image) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/v1/identification`, {
    method: 'POST',
    headers: {
      'api-key': apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ images: [base64Image] }),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export { searchInsects, getInsectDetails, createIdentification };
