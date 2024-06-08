# BugSpotter
BugSpotter is an innovative web application designed to help users identify insects using AI technology and community expertise. Users can upload photos of insects they encounter, and BugSpotter will provide accurate identifications and additional information about the insects.

## Table of Contents:
- Features
- Live Demo
- Technologies Used
- Installation
- Usage
- API Integration
- Contact

### Features
- Insect Identification: Upload photos to get AI-based insect identification.
- Community Support: Engage with a community of bug enthusiasts for additional identification help.
- Detailed Information: Access detailed information about identified insects.
- User-Friendly Interface: A responsive and intuitive interface for easy navigation and use.
### Live Demo:
Check out the live demo of BugSpotter [here](https://www.loom.com/share/1a6679f958dc4f7f9d142bef583ea15b?sid=d436ed3e-94eb-4461-a914-86e34a9530b0).

### Technologies Used
#### Front-End:
- React
- Bootstrap
- Node.js
- GoogleMaps API
- Tippy.js
- CSS
- Next.js
- Axios
- Firebase
#### Back-End:
- https://github.com/GregM1992/BugSpotterBE
- AspNetCore
- EntityFramework
- .NET
- PostgreSQL
- PgAdmin

#### External APIs:
- [Kindwise.Insect-Id](https://www.kindwise.com/insect-id)
- [Google Maps API](https://developers.google.com/maps)

#### Additional Libraries:
- React-Router
- PropTypes
- React-Bootstrap
- Firebase Auth



## Installation
To run BugSpotter locally, follow these steps:

#### Clone the Repository:

```
git clone https://github.com/GregM1992/BugSpotterFE
cd BugSpotter
```
Install Dependencies:
Make sure you have Node.js installed. Then, run:
```
npm run
npm install
npm i -S @react-google-maps/api
npm i tippy.js
```


#### Set Up Environment Variables:
Create a .env file in the root directory and add the necessary environment variables. For example:

```
REACT_APP_API_KEY=your-api-key
REACT_APP_API_URL=https://api.example.com
NEXT_PUBLIC_FIREBASE_API_KEY="example"
NEXT_PUBLIC_DATABASE_URL="localHost"
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="example"
NEXT_PUBLIC_INSECT_API_KEY="example"
```
You can get a googleMaps api key here : https://developers.google.com/maps/documentation/javascript/get-api-key
You can sign up for the kindwise.id api key here: https://www.kindwise.com/insect-id

#### Start the Development Server:

```
npm run dev
```

This will start the app on http://localhost:3000.

### Usage
Open BugSpotter:
Navigate to http://localhost:3000 in your web browser.

#### Upload a Photo:
Click on the upload button and select a photo of an insect.

#### View Identification:
Once the photo is uploaded, BugSpotter will provide an identification along with additional information about the insect.

#### Explore Insect Details:
Click on identified insects to view detailed descriptions and additional resources.

#### API Integration
BugSpotter integrates with external APIs for AI-based insect identification and fetching insect details. Ensure you have valid API keys and URLs configured in your .env file.

#### Identification API: Provides AI-based insect identification from uploaded photos.
Insect Information API: Fetches detailed information about the identified insects.




### Contact
For any questions or suggestions, feel free to reach out:

- Name: Greg Markus
- Email: Gregorymarkus92@gmail.com
- GitHub: https://github.com/GregM1992
- LinkedIn: https://www.linkedin.com/in/gregory-markus/

        

