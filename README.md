# Tale of Task

## Summary
Tale of Task is a gamified task list app that encourages users to complete the tasks on their to-do list in order to level up their hero. The app is inspired by Final Fantasy, making use of various sprites and images from the series.

While using Tale of Task, users can do the following:
- Create an account, sign in, log out, and use a demo login
- Create lists for organizing their tasks
- Edit and remove existing lists that they have made
- Create new tasks in one of their existing lists
- Edit or delete existing tasks
- View all the tasks they have created in a given list
- Search their lists for a given task
- Mark tasks as complete
- Set priority levels, dates, and descriptions for tasks

## How to Use
Users can access Tale of Task by navigating to https://tale-of-task.herokuapp.com/. Once there, a user can create a new account and sign in, or try the site out with the demo login.

## Overall Structure
Tale of Task is built with JavaScript, making use of a Express, an unopinionated web framework for Node.js for the backend, PostgreSQL for its database, and pug.js templating for frontend rendering. The site uses a significant amount of DOM manipulation to make the addition, removal, and editing of tasks feel as seamless as possible. RESTful API routes are also in place to ensure a fluid transfer of data from the backend to the frontend, and vice versa.

## Technologies Used
- JavaScript
- Express
- PostgreSQL
- pug.js
- JSON API
- Heroku
