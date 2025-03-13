# Story Time Image Generator

A web application that allows users to generate images based on text prompts using AI. The application has both frontend and backend components.

## Technologies Used

### Frontend:
- **React 19**: Modern JavaScript library for building user interfaces
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework for styling
- **React Context API**: For state management (specifically for authentication)
- **React useActionState**: For form handling and state management

### Backend:
- **Node.js**: JavaScript runtime for the server
- **Express**: Web framework for Node.js
- **SQLite (better-sqlite3)**: Lightweight database for storing user information
- **bcryptjs**: For password hashing
- **jsonwebtoken (JWT)**: For authentication
- **Replicate API**: For AI image generation using the Flux model (black-forest-labs/flux-schnell)
- **dotenv**: For environment variable management

## How to Run the Project

1. **Start the Backend**:
   ```
   cd story-time-image-gen/backend
   npm run dev
   ```
   This will start the backend server on port 3000 with hot reloading enabled.

2. **Start the Frontend**:
   ```
   cd story-time-image-gen
   npm run dev
   ```
   This will start the Vite development server for the frontend.

## User Storage and Authentication

- Users are stored in an SQLite database (`app.db`) with the following schema:
  ```sql
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
  )
  ```

- **Authentication Flow**:
  1. Users can sign up with email and password
  2. Passwords are hashed using bcryptjs before storage
  3. Upon successful login/signup, a JWT token is generated and sent to the client
  4. The token is stored in localStorage with a 1-hour expiration
  5. The token is included in the Authorization header for protected API requests
  6. The backend validates the token for protected routes

## Application Functionality

1. **User Authentication**:
   - Sign up with email and password
   - Login with existing credentials
   - Automatic token refresh and validation

2. **Image Generation**:
   - Users can enter a text prompt to generate an image
   - Options for customization:
     - Quality (1-100)
     - Aspect ratio (1:1, 16:9, 4:3)
     - Format (PNG, WebP, etc.)
   - The backend uses the Replicate API with the Flux model to generate images
   - Generated images are displayed to the user

3. **User Interface**:
   - Clean, modern UI with Tailwind CSS
   - Responsive design
   - Form validation for user inputs
   - Loading states during image generation

## Project Structure

- **Frontend**:
  - `/src/components`: UI components (AuthForm, ImageGeneration, Header, etc.)
  - `/src/store`: State management (auth-context.jsx)
  - `/src/App.jsx`: Main application component
  - `/src/main.jsx`: Entry point

- **Backend**:
  - `/backend/server.js`: Express server setup
  - `/backend/auth.js`: Authentication routes and middleware
  - `/backend/db.js`: Database configuration
  - `/backend/imageGen.js`: Image generation routes
  - `/backend/image.js`: Image generation logic using Replicate API

## Security Features

- Password hashing with bcryptjs
- JWT for secure authentication
- Environment variables for sensitive information
- Input validation on both frontend and backend
- Protected routes requiring authentication
