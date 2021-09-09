const userResolver = require("./user");
const bookingResolver = require("./booking");
const eventResolver = require("./event");

const rootResolver = {
    ...userResolver,
    ...bookingResolver,
    ...eventResolver
};

module.exports = rootResolver;