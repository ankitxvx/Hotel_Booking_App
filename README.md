# Hotel Booking App 🏨

A full-stack hotel booking application built using **React**, **Node.js**, **Express**, and **MongoDB** that mimics the core functionality of Airbnb. Users can view hotel listings, make bookings, and manage profiles. 

## Features
- **Hotel Listings**: Users can view a list of available hotels.
- **Booking System**: Allows users to book hotels based on availability.
- **Authentication**: Secure login and registration functionality for users.
- **Profile Management**: Users can view and update their profiles.
- **Image Upload**: Hotel owners can upload images for their listings.
- **Responsive UI**: Tailored with Tailwind CSS for a sleek and modern user interface.

## Tech Stack
- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Others**: RESTful APIs, JWT for authentication

## Prerequisites
Before you begin, ensure you have the following installed:
- Node.js (v14+)
- MongoDB (local or Atlas)

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/ankitxvx/Hotel_Booking_App.git
cd Hotel_Booking_App
```

### 2. Install Dependencies
Navigate to both the client and server directories and install the dependencies using npm:

```bash
# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

### 3. Set Up Environment Variables
In the server directory, create a `.env` file with the following content:

```
MONGO_URI=your_mongo_database_uri
JWT_SECRET=your_jwt_secret
```

### 4. Run the Application

```bash
# Run the server
cd server
npm start

# Run the client
cd client
npm run dev
```

The client will be available at `http://localhost:3000` and the server will run on `http://localhost:5000`.

## Screenshots
Include some screenshots here to showcase the app's design and functionality.

## Project Structure
```
Hotel_Booking_App/
├── client/
│   ├── src/
│   ├── public/
├── server/
│   ├── models/
│   ├── routes/
│   ├── controllers/
└── README.md
```

## API Endpoints
- **GET /hotels**: Fetch all available hotels
- **POST /hotels**: Add a new hotel (Admin)
- **POST /auth/login**: Login user
- **POST /auth/register**: Register new user
- **POST /bookings**: Make a hotel booking

## Future Enhancements
- Payment integration with Stripe or PayPal
- Add user reviews and ratings for hotels
- Implement sorting and filtering of hotels

## Contributing
Feel free to fork the project and submit a pull request if you'd like to improve it!

 

---

Feel free to modify the details and add more information specific to your project!


<img width="960" alt="image" src="https://github.com/ankitxvx/Airbnb-clone/assets/90975195/098df3d0-0e77-43ce-8a5b-f49fee5a1ad9">
<img width="960" alt="image" src="https://github.com/ankitxvx/Airbnb-clone/assets/90975195/cbf72d28-6b7b-402a-87e5-1a1c36a5ce55">
<img width="960" alt="image" src="https://github.com/ankitxvx/Airbnb-clone/assets/90975195/c3a036b3-6816-4cd9-bf1b-1b9f981535af">
<img width="960" alt="image" src="https://github.com/ankitxvx/Airbnb-clone/assets/90975195/604be68c-1d23-408d-acc0-e5f0126cfca6">
<img width="960" alt="image" src="https://github.com/ankitxvx/Airbnb-clone/assets/90975195/31bd2197-8d22-4ed5-9b07-e18fc8aba273">

