import { gql } from '@apollo/client';

export const CREATE_BOOKING_MUTATION = gql`
    mutation CreateBooking($eventId: ID!) {
        createBooking(eventId: $eventId) {
            _id
            event {
                title
                date
            }
        }
    }
`;

export const CANCEL_BOOKING_MUTATION = gql`
    mutation CancelBooking($bookingId: ID!) {
        cancelBooking(bookingId: $bookingId) {
            title
        }
    }
`;

export const BOOKINGS_QUERY = gql`
    query Bookings {
        bookings {
            _id
            event {
                title
                date
            }
        }
    }
`;