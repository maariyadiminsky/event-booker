const  { buildSchema } = require("graphql");

module.exports = buildSchema(`
    type User {
        _id: ID!
        email: String!
        password: String
        createdEvents: [Event!]
    }

    type Auth {
        userId: ID!
        token: String!
        tokenExpiration: String!
    }

    type Booking {
        _id: ID!
        user: User!
        event: Event
        createdAt: String!
        updatedAt: String!
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
        userId: ID!
        title: String!
        description: String!
        price: Float!
        date: String!
    }

    input UserInput {
        email: String!
        password: String!
    }

    type RootQuery {
        users: [User!]!
        signIn(email: String!, password: String!): Auth!
        events: [Event!]!
        bookings: [Booking!]!
    }

    type RootMutation {
        createUser(userInput: UserInput): User
        createEvent(eventInput: EventInput): Event
        createBooking(eventId: ID!): Booking!
        cancelBooking(bookingId: ID!): Event!
        removeEvent(eventId: ID!): Event!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);