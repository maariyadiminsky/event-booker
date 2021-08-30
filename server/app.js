const express = require("express");
const bodyParser = require("body-parser");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");

const app = express();

// temporary, pretend db
let events = [];

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
        events: () => events,
        createEvent: ({ eventInput: { title, description, price } }) => {
            const event = {
                _id: Math.random().toString(), // temp, db will generate later
                title,
                description,
                price: +price,
                date: new Date().toISOString()
            }

            events = [ ...events, event ];

            return event;
        }
    },
    graphiql: true
}));

app.listen(3000);