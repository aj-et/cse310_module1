# Overview

For this module, I planned to created a simple todo application where the user can login and create a list of todos.

This web application uses the cloud database to save the user information as well as their todo list. This app also features the use of bcrypt to secure the password in the database and jsonwebtoken so that only the user can access their own todo list. The todo application itself also feature the create, put/update, and delete capabilities.

The purpose of writing this software is to help people list out the things they need to do hence the name To Do app.

{Provide a link to your YouTube demonstration. It should be a 4-5 minute demo of the software running, a walkthrough of the code, and a view of the cloud database.}

[Software Demo Video](https://youtu.be/NVxhXf9aA3w)

# Cloud Database

I am using MongoDB with Mongoose to store the user information and the todo list.

I have two services that stores information. I have the Users and the Todos services. For Users Service, I am storing the id, name, email, their encrypted password, and the timestamp of when the user was created and when the user is updated. For the Todo Service, I am storing the id of each todo, the title and the owner that references to the id of who created that todo.

For the relationship in the database, I am using a one-to-many relationship because each user can have multiple todos. This is possible because of the owner field I added that references to the id of the user.

# Development Environment

Tools/Dependencies I used for this software:
* bcrypt - A library I used to secure passwords by hashing the password before storing to the databse.
* cors - Cross-origin resource sharing allows me to configure the backend to handle cross-origin requests.
* dotenv - I used this to store confidential backend info such as my mondodb URI and other keys that might risk security.
* express - A Node.js web application framework. This is the basic stuff needed for the backend.
* jsonwebtoken - Used for user authentication. Users can mess with the search bar, but each user have a unique token that allows them to only see and modify the things that they own/created.
* mongoose - I used this to access the mongodb database and make CRUD operations.
* nodemon - This is a utility that makes life easier beacuse I don't have to rerun/refresh the app manually because this does it automatically.

# Useful Websites

{Make a list of websites that you found helpful in this project}

- [MongoDB Docs](https://www.mongodb.com/docs/)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)

# Future Work

- Improve user UI for the todo stuff
- Add a name of the user with their logo that will show the logout button when clicked.
- Use a frontend framework (NextJS - a react framework)