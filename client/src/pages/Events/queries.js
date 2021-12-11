import { gql } from '@apollo/client'

export const CREATE_EVENT_MUTATION = gql`
    mutation CreateEvent($userId: ID!, $title: String!, $description: String!, $price: Float!, $date: String!){
        createEvent(eventInput: { userId: $userId, title: $title, description: $description, price: $price, date: $date}) {
            _id
            title
            description
            price
            date
            user {
                _id
            }
        }
    }
`;

export const REMOVE_EVENT_MUTATION = gql`
    mutation RemoveEvent($eventId: ID!) {
        removeEvent(eventId: $eventId) {
            title
        }
    }
`;

export const EVENTS_QUERY = gql`
    query Events {
        events {
            _id
            title
            description
            price
            date
            user {
                _id
            }
        }
    }
`;