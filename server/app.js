const express = require("express");
const bodyParser = require("body-parser");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const graphqlSchema = require("../graphql/schema/index");
const graphqlResolvers = require("../graphql/resolvers/index");

const authentication = require("../middleware/authentication");

dotenv.config({ path: "./.env.local"});

const app = express();

app.use(bodyParser.json());

app.use(authentication);

app.use("/graphql", graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
    graphiql: true
}));

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.zlv4u.mongodb.net/${process.env.MONGO_DATABASE_NAME}?retryWrites=true&w=majority`)
    .then(() => app.listen(process.env.PORT || 3001))
    .catch(err => console.log(`ERROR: ${err}`));