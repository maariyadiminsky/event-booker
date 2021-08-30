const express = require("express");
const bodyParser = require("body-parser");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");

const app = express();

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

app.use(bodyParser.json());

app.use("/graphql", graphqlHTTP({
    schema: buildSchema(`
        type RootQuery {
            events: [String!]!
        }

        type RootMutation {
            createEvent(name: String): String
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
        events: () => {
            return [
                "Romantic",
                "Cooking",
                "Sailing"
            ]
        },
        createEvent: ({ name }) => {
            return name;
        }
    },
    graphiql: true
}));

app.listen(3000);