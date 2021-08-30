const express = require("express");
const bodyParser = require("body-parser");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
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
        }

        type Event {
            _id: ID!
            title: String!
            description: String!
            price: Float!
            date: String!
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
            user: user
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
                date: new Date().toISOString()
            });

            return event
                .save()
                .then((res) => {
                    console.log("event created", res);
                    return { ...res._doc };
                })
                .catch(err => {
                    console.log(`ERROR: ${err}`);
                    throw err;
                });

            return event;
        },
        createUser: ({ userInput: { email, password }}) => {
            const user = new User({
                email,
                password
            })
        }
    },
    graphiql: true
}));

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.zlv4u.mongodb.net/${process.env.MONGO_DATABASE_NAME}?retryWrites=true&w=majority`)
    .then(() => app.listen(process.env.PORT || 3000))
    .catch(err => console.log(`ERROR: ${err}`));