# :sparkles: Event Booker

| [What You Can Do](#what-you-can-do) | [Setup(5 min)](#setup5-minutes) | [Todo](#todo) |

A fullstack event booker app created with React, Node, GraphQL, and MongoDB—complete with authentication, a responsive design and several other features listed below.

[![Watch The Game Preview](https://i.imgur.com/urfrInr.png)](https://youtu.be/2OiPTvzl1q4)

## What You Can Do

*Please note: All of the features listed are are tested and shown in the video above.*

* #### Event Features
    * All users(authenticated or not) can view events.
    * Only authenticated users can create an event.
    * User can remove an event they’ve created, but not another user’s events.
    * If it’s an event that is happening the same date there will be a little red notification pulse animation next to the date
    * Expired events and events of the same date will have a little widget showing they are expired/day-of
    * Expired events will show at the bottom when loading events page
    * When an event is created a notification will popup for a few seconds.
    * When an event is created, it will automatically show at end of the list.
* #### Bookings Features
    * Create a booking if there are events
    * Bookings are displayed on page
    * You can only see the bookings you’ve created, you cannot see another user’s bookings.
    * When an event is deleted, the associated booking will not display.
    * Colors of bookings are random.
* #### Homepage Features
    * Elegant homepage design with inviting message.
    * Start Button takes users to events page.
* #### Auth Features
    * You must create an account to see events or bookings
    * Each event and booking with be associated with a user.
    * A created account can do all the actions of #1 and #2.
* #### Responsive Design
    * Works on your phone/tablet.

## Setup(5 minutes)
* MongoDB:
    * [Sign up to MongoDB Cloud](https://cloud.mongodb.com/) if you haven't already. 
        * Go through setup, verify email, and choose JavaScript as your preferred language. 
        * Choose the shared FREE account type. Choose your preferred cloud server(I picked Google Cloud). 
        * It may take some time for the cluster to be fully live, you will updates at the top.
    * Make sure your network is added to the cluster so MongoDB knows that your IP address is ok to send and receive requests to this database cluster.
        * Click Security -> Network Access
        * Click Add IP Address -> Add Current IP Address
        * Confirm -> It will take a moment for MongoDB to be ready for your IP Address.
    * Make sure you have at least one Admin with read and write full access permissions.
        * Click Security -> Database Access
        * Click Add New Database User -> Password -> Auto-generate a password
        * Use this password in `MONGO_PASSWORD` of your `.env.local` file.
        * Make sure you have the same user entered here for `MONGO_USERNAME`.
        * Also the correct database name in `MONGO_DATABASE_NAME`.
    * To view databases that will be created go to Databases -> Choose your cluster -> Collections.
* JWT Token:
    * Generate a [unique secure password](https://1password.com/password-generator/).
    * Add it to `JWT_SECRET_KEY`.
* Start Development environment:
    * First terminal:  `yarn install` then `yarn start`. Make sure MongoDB is successfully connected and your server is running successfully.
    * Second terminal: go into the `client` folder then `yarn install` and `yarn start`. Make sure frontend server is running successfully.

## Todo
* Use Dataloader to batch requests to database for better performance(next WIP)
* Users should be able to share events and bookings they’ve made.
* Instead of not rendering booking that exists with a deleted event, delete that booking on the backend
* Add tests
