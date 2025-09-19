# To-Do Application API
This is a RESTful API for a personal to-list application. It allows users to manage their tasks securely with features like user authentication, profile management, and CRUD operations on personal to-do items. The API is built with Node.js and Express.js and uses MongoDB for data persistence.

## 🚀 Features
- User Authentication: Secure user signup, login, and logout.
- Profile Management: Logged-in users can fetch, udpdate, and delete their own profiles.
- Session-based Security: Protects routes to ensure only authenticated users can perform actions on their own data.
- Personalized To-Dos: A user can only access, create, update and delete their own to-do items.
- Flexible To-Do Creation: Create a single to-do or bulk-create muliple to-dos in a single request.
- Date-based Queries: Filter to-dos for a specific due-date.

## 🛠️ Technologies Used
- Node.js: The runtime environment.
- Express.js: The web framework for building the API.
- MongoDB: The NoSQL dataabase for storing data.
- Mongoose: An ODM(Object Data Modeling) library for MongoDB and Node.js
- bcryptjs: For hashing and securing user passwords.
- express-session: Fro managing user sessions

## 📁 Project Structure
The project follows a layered architecture to seperate concerns:
- `app.js`: The main entry point of the application.
- `config/`: Contains database connection and sessiion configuration.
- `controllers/`: Handles incoming HTTP requests and responses. It acts as the interface between the client and the service layer.
- `models/`: Defines the Mongoose shcemas for the `User` adn `Todo` data models.
- `routes/`: Defines all the API endpoints.
- `services`: Contains the core business logic and database operations, making the code reusable and easy to test.

## 📚 API Endpoints
`POST` - `/auth/signup` - Registers a new user.

`POST` - `/auth/login` - Logs in a user and creates a session.

`POST` - `/auth/logout` - Destroys a user's session.

`GET` - `/profile/:userId` - (Protected) Fetches a single user's profile.

`PUT` - `/profile/:userId` - (Protected) Updates the logged-in user's profile.

`DELETE` - `/profile/:userId` - (Protected) Deletes the logged-in user's account.

## 📋 To-Do Endpoints
`POST` - `/todo` - (Protected) Creates one or more to-do items.

`GET` - `/todo` - (Protected) Retrieves all to-do items for the logged-in user.

`GET` - `/todo/:todoId` - (Protected) Retrieves a single to-do items by its ID.

`GET` - `/todo/date/:date` - (Protected) Retrieves all to-do items for a specific date.

`PUT` - `/todo/:todoId` - (Protected) Updates a to-do item by its ID.

`DELETE` - `todo/:todoId` - (Protected) Deletes a to-do item by its ID.
