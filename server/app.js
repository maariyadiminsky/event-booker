const express = require("express");
const bodyParser = require("body-parser");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env.local"});

const app = express();

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

app.use(bodyParser.json());

const Event = require("../models/event");
const User = require("../models/user");

app.use("/graphql", graphqlHTTP({
    schema: buildSchema(`
        type User {
            _id: ID!
            email: String!
            password: String
            createdEvents: [Event]
        }

        type Event {
            _id: ID!
            title: String!
            description: String!
            price: Float!
            date: String!
            user: User!
        }

        input EventInput {
            title: String!
            description: String!
            price: Float!
        }

        input UserInput {
            email: String!
            password: String!
        }

        type RootQuery {
            events: [Event!]!
            users: [User!]!
        }

        type RootMutation {
            createEvent(eventInput: EventInput): Event
            createUser(userInput: UserInput): User
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
        users: () => {
            return User.find()
            .then((users) => users.map(user => ({ ...user._doc })))
            .catch(err => {
                console.log(`ERROR: ${err}`);
                throw err;
            });
        },
        events: () => {
            return Event.find()
            .then((events) => events.map(event => ({ ...event._doc })))
            .catch(err => {
                console.log(`ERROR: ${err}`);
                throw err;
            });
        },
        createEvent: ({ eventInput: { title, description, price } }) => {
            const event = new Event({
                title,
                description,
                price: +price,
                date: new Date().toISOString(),
                user: "612d43fa7858eae664785e47" // note: temporary created for testing
            });

            let createdEvent;

            return event.save()
                .then((res) => {
                    createdEvent = { ...res._doc };

                    return User.findById("612d43fa7858eae664785e47");
                })
                .then(user => {
                    if (!user) {
                        throw new Error("A user with that id doesn't exist!");
                    }

                    user.createdEvents = [ ...user.createdEvents, event ];
                    
                    return user.save();
                })
                .then(() => createdEvent)
                .catch(err => {
                    console.log(`ERROR: ${err}`);
                    throw err;
                });

            return event;
        },
        createUser: ({ userInput: { email, password }}) => {
            // make sure user doesn't already exist in database
            return User.findOne({ email })
                .then((user) => {
                    if (user) {
                        throw new Error("A user with that email already exists!");
                    }

                    return bcrypt.hash(password, 12);
                })
                .then((safePass) => {
                    const user = new User({
                        email,
                        password: safePass
                    });

                    return user.save()
                    .then((res) => {
                        console.log("user created", res);
                        return { ...res._doc, password: null };
                    })
                    .catch(err => {
                        console.log(`ERROR: ${err}`);
                        throw err;
                    });
                })
                .catch(err => {
                    console.log(`ERROR: ${err}`);
                    throw err;
                });
        }
    },
    graphiql: true
}));

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.zlv4u.mongodb.net/${process.env.MONGO_DATABASE_NAME}?retryWrites=true&w=majority`)
    .then(() => app.listen(process.env.PORT || 3000))
    .catch(err => console.log(`ERROR: ${err}`));