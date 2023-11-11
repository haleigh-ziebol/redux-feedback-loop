# Redux Feedback Loop App

## Description
Duration: 2 Weeks

This app collects user feedback and allows an admin to view the feedback. <br/>

### Features: <br/>

#### User Mode <br/>
    enter feedback, go back in the feedback to edit
    list of feedback a given user has entered

#### Admin Mode <br/>
    edit mode with ability to flag or delete feedback
    notification badge for flagged feedback

![Home](/Images/homescreen.png)
![Login](/Images/login.png)
![Admin Screen](/Images/admin.png)


## Prerequisites
1. Install the latest version of npm
* npm
  ```sh
  npm install npm@latest -g
  ```
2. Install Node.js

## Installation

1. Create a database named `prime_feedback`. <br/>
2. The queries in the database.sql file are set up to create all the necessary tables and populate the needed data to allow the application to run correctly. The project is built on pgadmin4. <br/>
3. Open up your editor of choice and run an npm install. <br/>
4. Run `npm run server` in your terminal. <br/>
5. Run `npm run client` in your terminal, which will open up a new browser tab with the app. <br/>

## Usage

1. Log in or sign up. <br/>
2. User <br/>
    a. Click submit feedback button on home screen.<br/>
    b. Submit your feedback for the 4 categories (feeling, understanding, support & comments).<br/>
        i. Click the back button to alter your prior feedback category.<br/>
        ii. After you hit submit, review your feedback. You can edit or submit from there. <br/>
    c. View your submitted feedback in the admin tab. <br/>
3. Admin <br/>
    a. View feedback on the admin tab. <br/>
    b. Click on the edit button to flag/unflag or delete an item of feedback. <br/>
    c. Watch the flagged feedback notification badge change as feedback items are altered. <br/>

## Built With
Visual Studio Code, SQL, Express, Node.js, SQL, React

## Acknowledgment
Thanks to Prime Digital Academy who equipped and helped me to make this application a reality.

