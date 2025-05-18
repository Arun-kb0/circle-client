# Circle social media app

Circle is a real-time social platform client built with React, Redux, and Tailwind CSS - enabling chat, posts, audio/video calls, and live streaming in one seamless experience.

## Repositories

This project’s client and server are maintained in separate repositories: 
- **Server**: circle-server  

## Tech Stack

### Frontend
- **Framework**: React  
- **Language**: TypeScript  
- **State Management**: Redux  
- **Styling**: Tailwind CSS  
- **Routing & Data Fetching**: React Router, Axios 

### Backend
- **Runtime & Framework**: Node.js, Express.js  
- **Language**: TypeScript  
- **ORM**: Mongoose  
- **Database**: MongoDB  
- **Architecture**: Microservices | each service in repository pattern


## Installation

### Prerequisites

- **npm** or **yarn**

### Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Arun-kb0/circle-client.git
   cd circle-client
   ```

2. **Install Dependencies**
   Install all the required dependencies using `npm` or `yarn`:
   run inside client and server folder
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set Up Environment Variables**
   Create a `.env` file in the server dir of the project and configure your database connection:
   ```env
   VITE_GOOGLE_CLIENT_ID= for google oauth 
   VITE_GOOGLE_CLIENT_SECRET= for google oauth 
   VITE_SERVER_URL= http://localhost:5001
   VITE_NOTIFICATION_SERVICE= http://localhost:8086
   VITE_CLD_UPLOAD_PRESET= cloudinary upload preset
   VITE_CLD_COULD_NAME= cloudinary could name
   VITE_GIPHY_API_KEY= giphy api key - visit https://giphy.com
   VITE_BASE_PATH= /circle-client
   ```

4. **Start the Development Server**
   Launch the application in development mode:
   run inside client and server folder
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Access the Application**
   Access the API server at `http://localhost:5001` to interact with the backend services.
   Access the notification service at `http://localhost:8086` 
   Open the client application at `http://localhost:5173` to explore the user interface and interact with the application.

6. **User Credentials**
   
**User 1**
- Username: `hamel55284@nongnue.com`
- Password: `qwerty123`

 **User 2**
- Username: `xamibo4593@btcours.com`
- Password: `qwerty123`

**Admin**
- Username: `admin@gmail.com`
- Password: `qwerty123`