// server endpoint
export const GRAPHQL_ENDPOINT = '/graphql';

// paths
export const ROOT_PATH = '/';
export const EVENTS_PATH = '/events';
export const BOOKINGS_PATH = '/bookings';
export const AUTH_PATH = '/auth';

export const EVENTS = 'Events';
export const BOOKINGS = 'Bookings';
export const SIGN_IN = 'Sign In';
export const SIGN_OUT = 'Sign Out';
export const SIGN_UP = 'Sign Up';
export const HOME = 'Home';

// policy
export const QUERY_POLICY_NETWORK_ONLY = 'network-only';

// text
export const SWITCH_SIGN_UP_TEXT = 'Don\'t have an account yet?';
export const SWITCH_SIGN_IN_TEXT = 'Already have an account?';
export const BOOKINGS_NEED_EVENTS = 'Events must be created to book them!';
export const CREATE_AN_EVENT = 'Create an Event';
export const BOOK_AN_EVENT = 'Book an Event';
export const YES_IM_SURE = 'Yes I\'m sure';
export const CANCEL_BOOKING = 'Cancel Booking';
export const SUBMIT = 'Submit';
export const NEVERMIND = 'Nevermind';
export const ACCOUNT_CREATED_MESSAGE = 'Account successfully created!';
export const SIGN_IN_MESSAGE = 'Please sign in to continue.';
export const SIGN_IN_OR_CREATE_ACCOUNT_MESSAGE = 'Please sign in or create an account.';
export const REMOVE_BUTTON_TEXT = '✏️ Remove';
export const EXPIRED = 'Expired';
export const TODAY = 'Today';

export const ERROR_DATA_NO_RESPONSE = (isMutation) => `Data ${isMutation? 'mutation' : 'retrieval'} failed with no response!`;
export const ERROR_SERVER_ERROR = (isMutation, status) => `Data ${isMutation? 'mutation' : 'retrieval'} failed with server status code: ${status}.`

// icons
export const CONFETTI_ICON = '🎉';

// form type
export const SIGN_IN_FORM = 'Sign In Form';
export const SIGN_UP_FORM = 'Sign Up Form';
export const CREATE_EVENT_FORM = 'Create Event Form';
export const REMOVE_EVENT_FORM = 'Remove Event Form';
export const CREATE_BOOKING_FORM = 'Create Booking Form';
export const DELETE_BOOKING_FORM = 'Delete Booking Form';

// other
export const TEST = 'test';
export const ACTIVE = 'active';
export const DEVELOPMENT = 'development';
export const PRODUCTION = 'production';
export const BOOKINGS_LOWERCASE = 'bookings';
export const EVENTS_LOWERCASE = 'events';

// alert types
export const WHITE_COLOR = 'white';
export const SUCCESS_COLOR = 'green';
export const WARNING_COLOR = 'yellow';
export const ERROR_COLOR = 'red';
export const INFORMATIVE_COLOR = 'blue';

export const SUCCESS = 'success';
export const WARNING = 'warning';
export const ERROR = 'error';
export const INFORMATIVE = 'informative';

// elements
export const DIV = 'DIV';

// mock data for testing 
export const MOCK = {
    NAME: 'SomeName',
    WORKS_TEXT: 'Works!',
    PATH: '/somePath',
    CLASS: 'some-class',
    BUTTON_TEXT: 'ClickMe',
}

// default param types
export const DEFAULT = {
    STRING: '',
    NUMBER: null,
    ARRAY: [],
    OBJECT: {},
    BOOL_FALSE: false,
    BOOL_TRUE: true,
    FUNCTION: () => null,
    NULL: null,
    UNDEFINED: undefined,
};