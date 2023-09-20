# Redux Feedback Loop App

## Description
Duration: 2 Weeks

This app collects user feedback and allows an admin to view the feedback. <br/>

### Features: <br/>

![Home](/Images/homescreen.png)
![Login](/Images/login.png)


#### Admin Mode <br/>
    edit mode with ability to flag or delete feedback <br/>
    notification badge for flagged feedback <br/>

![Admin Screen](/Images/admin.png)

#### User Mode <br/>
    enter feedback, go back in the feedback to edit <br/>
    list of feedback a given user has entered<br/>


## Prerequisites

## Installation

1. Create a database named `prime_feedback`. <br/>
2. The queries in the database.sql file are set up to create all the necessary tables and populate the needed data to allow the application to run correctly. The project is built on pgadmin4. <br/>
3. Open up your editor of choice and run an npm install. <br/>
4. Run `npm run server` in your terminal. <br/>
5. Run `npm run client` in your terminal, which will open up a new browser tab with the app. <br/>

## Usage

1. Log in or sign up. <br/>
2. User <br/>
    a. Click submit feedback button on home screen.
    b. Submit your feedback for the 4 categories (feeling, understanding, support & comments).
        i. Click the back button to alter your prior feedback category.
        ii. After you hit submit, review your feedback. You can edit or submit from there.
    c. View your submitted feedback in the admin tab.
3. Admin <br/>
    a. View feedback on the admin tab. <br/>
    b. Click on the edit button to flag/unflag or delete an item of feedback. <br/>
    c. Watch the flagged feedback notification badge change as feedback items are altered. <br/>

## Built With

## Acknowledgment
Thanks to Prime Digital Academy who equipped and helped me to make this application a reality.

