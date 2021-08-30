const express = require("express");
const bodyParser = require("body-parser");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env.local"});

const Event = require("../models/event");

const app = express();

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

app.use(bodyParser.json());

app.use("/graphql", graphqlHTTP({
    schema: buildSchema(`
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

        type RootQuery {
            events: [Event!]!
        }

        type RootMutation {
            createEvent(eventInput: EventInput): Event
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
        }
    },
    graphiql: true
}));

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.zlv4u.mongodb.net/${process.env.MONGO_DATABASE_NAME}?retryWrites=true&w=majority`)
    .then(() => app.listen(process.env.PORT || 3000))
    .catch(err => console.log(`ERROR: ${err}`));