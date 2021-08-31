const  { buildSchema } = require("graphql");

module.exports = buildSchema(`
    type Booking {
        _id: ID!
        user: User!
        event: Event!
        createdAt: String!
        updatedAt: String!
    }

    type User {
        _id: ID!
        email: String!
        password: String
        createdEvents: [Event!]
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
        bookings: [Booking!]!
    }

    type RootMutation {
        createEvent(eventInput: EventInput): Event
        createUser(userInput: UserInput): User
        createBooking(eventId: ID!): Booking!
        cancelBooking(bookingId: ID!): Event!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);