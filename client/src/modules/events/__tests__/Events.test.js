import { render, fireEvent } from '@modules/app/setupTests';
import { MockedProvider } from '@apollo/client/testing';
import userEvent from '@testing-library/user-event';

import { AuthContext } from '@modules/common/context/AuthContext';

import { 
    mocks,
    eventsMockData,
    newEvent,
    eventToCancel
} from '@modules/events/mocks';
import { VALIDATION_ERRORS } from '@modules/common/utils/auth';
import { 
    MOCK,
    CREATE_AN_EVENT,
    SUBMIT,
    NEVERMIND,
    REMOVE_BUTTON_TEXT,
    ARE_YOU_SURE,
    YES_IM_SURE
} from '@modules/common/const';

import Events from '@modules/events/Events';

describe('<Events />', () => {
    let portalRoot;
    let loaderFirstChildClass;
    let authWrapper;

    beforeAll(() => {
        loaderFirstChildClass = 'h-3 w-3 m-3 mr-1 rounded-full bg-green-200 animate-bounce';

        portalRoot = document.getElementById('modal');
        if (!portalRoot) {
            portalRoot = document.createElement('div');
            portalRoot.setAttribute('id', 'modal');
            document.body.appendChild(portalRoot);
        }

        authWrapper = (children) => (
            <AuthContext.Provider value={{ token: MOCK.TOKEN, userId: '0' }}>
                {children}
            </AuthContext.Provider>
        );
    });

    it('renders component with button and existing events', async () => {
        const { container, findByText } = render(
            <MockedProvider mocks={mocks(MOCK.QUERY_TYPE.EVENTS_QUERY)} addTypename={false}>
                <Events />
            </MockedProvider>
        );

        const loaderElement = container.firstChild.children[0];
        expect(loaderElement.className).toBe(loaderFirstChildClass);

        const createEventButton = await findByText(CREATE_AN_EVENT);
        const firstEvent = await findByText(eventsMockData[0].title);
        const secondEvent = await findByText(eventsMockData[1].title);
        const thirdEvent = await findByText(eventsMockData[2].title);

        expect(createEventButton).toBeInTheDocument();
        expect(firstEvent).toBeInTheDocument();
        expect(secondEvent).toBeInTheDocument();
        expect(thirdEvent).toBeInTheDocument();
    });

    it('displays client errors in form if they exist', async () => {
        const { findByText, findByLabelText } = render(authWrapper(
            <MockedProvider mocks={mocks(MOCK.QUERY_TYPE.EVENTS_QUERY)} addTypename={false}>
                <Events />
            </MockedProvider>
        ));

        const createEventButton = await findByText(CREATE_AN_EVENT);

        expect(createEventButton).toBeInTheDocument();

        userEvent.click(createEventButton);

        const submitModalButton = await findByText(SUBMIT);
        const nevermindModalButton = await findByText(NEVERMIND);
        const titleInput = await findByLabelText('Title');
        const descriptionInput = await findByLabelText('Description');
        const priceInput = await findByLabelText('Price');
        const dateInput = await findByLabelText('Date');

        expect(submitModalButton).toBeInTheDocument();
        expect(nevermindModalButton).toBeInTheDocument();
        expect(titleInput).toBeInTheDocument();
        expect(descriptionInput).toBeInTheDocument();
        expect(priceInput).toBeInTheDocument();
        expect(dateInput).toBeInTheDocument();

        userEvent.click(submitModalButton);

        const { TITLE, DESCRIPTION, PRICE } = VALIDATION_ERRORS;

        const titleClientError = await findByText(TITLE);
        const descriptionClientError = await findByText(DESCRIPTION);
        const priceClientError = await findByText(PRICE);

        expect(titleClientError).toBeInTheDocument();
        expect(descriptionClientError).toBeInTheDocument();
        expect(priceClientError).toBeInTheDocument();
    });

    it('creates an event then displays notification and render it within the list', async () => {
        const mocksData = [...mocks(MOCK.QUERY_TYPE.EVENTS_QUERY), ...mocks(MOCK.QUERY_TYPE.CREATE_EVENT_MUTATION, newEvent)];
        const { findByText, findByLabelText } = render(authWrapper(
            <MockedProvider mocks={mocksData} addTypename={false}>
                <Events />
            </MockedProvider>
        ));

        const createEventButton = await findByText(CREATE_AN_EVENT);

        expect(createEventButton).toBeInTheDocument();

        userEvent.click(createEventButton);

        const submitModalButton = await findByText(SUBMIT);
        const nevermindModalButton = await findByText(NEVERMIND);
        const titleInput = await findByLabelText('Title');
        const descriptionInput = await findByLabelText('Description');
        const priceInput = await findByLabelText('Price');
        const dateInput = await findByLabelText('Date');

        expect(submitModalButton).toBeInTheDocument();
        expect(nevermindModalButton).toBeInTheDocument();
        expect(titleInput).toBeInTheDocument();
        expect(descriptionInput).toBeInTheDocument();
        expect(priceInput).toBeInTheDocument();
        expect(dateInput).toBeInTheDocument();

        userEvent.type(titleInput, newEvent.title);
        expect(titleInput.value).toBe(newEvent.title);

        userEvent.type(descriptionInput, newEvent.description);
        expect(descriptionInput.value).toBe(newEvent.description);

        userEvent.type(dateInput, newEvent.date);
        expect(dateInput.value).toBe(newEvent.date);

        fireEvent.change(priceInput, { target: { value: newEvent.price }});
        expect(priceInput.value).toBe(`${newEvent.price}`);

        userEvent.click(submitModalButton);

        const firstEvent = await findByText(eventsMockData[0].title);
        const secondEvent = await findByText(eventsMockData[1].title);
        const thirdEvent = await findByText(eventsMockData[2].title);
        const newEventEl = await findByText(newEvent.title);
        const successNotification = await findByText('Success');

        expect(successNotification).toBeInTheDocument();
        expect(firstEvent).toBeInTheDocument();
        expect(secondEvent).toBeInTheDocument();
        expect(thirdEvent).toBeInTheDocument();
        expect(newEventEl).toBeInTheDocument();
    });

    it('allows creator of event to remove event', async() => {
        const mocksData = [...mocks(MOCK.QUERY_TYPE.EVENTS_QUERY), ...mocks(MOCK.QUERY_TYPE.REMOVE_EVENT_MUTATION, { eventId: eventToCancel._id })];
        const { findByText, findByRole } = render(authWrapper(
            <MockedProvider mocks={mocksData} addTypename={false}>
                <Events />
            </MockedProvider>
        ));

        const eventCreatedByUser = await findByText(eventToCancel.title);
        const removeEventButton = await findByRole('button', { name: REMOVE_BUTTON_TEXT });

        expect(eventCreatedByUser).toBeInTheDocument();
        expect(removeEventButton).toBeInTheDocument();

        userEvent.click(removeEventButton);

        const areYouSureYouWantToCancelModalMessage = await findByText(ARE_YOU_SURE);
        const submitCancelEventButton = await findByRole('button', { name: YES_IM_SURE });

        expect(areYouSureYouWantToCancelModalMessage).toBeInTheDocument();
        expect(submitCancelEventButton).toBeInTheDocument();
        
        userEvent.click(submitCancelEventButton);

        expect(eventCreatedByUser).not.toBeInTheDocument();
    });
});
