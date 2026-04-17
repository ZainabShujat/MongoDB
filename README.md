# AIML Project Backend

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file in this folder with the following content:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   PORT=5000
   ```
3. Start the server:
   ```bash
   node Server.js
   ```

## API Endpoints
- `POST /api/register` — Register a new user
- `POST /api/login` — Login

## Notes
- Requires MongoDB connection string in `.env` file.
- Uses Express, Mongoose, CORS, dotenv.
