
import { DEFAULT } from '@modules/common/const';

export const generateRandomString = () => Math.random().toString(36).substr(2, 5);

const originalConsoleLog = console.log;
export const hideConsoleLog = () => {
    // note: silence console.log temporarily in some functions while errors pass
    // without having to turn of --verbose in package.json
    console.log = jest.fn();
}

export const showConsoleLog = () => {
    console.log = originalConsoleLog;
}

// so elements with multiple event handlers aren't unnecessarily 
// called more than once(ie. SyntheticEvent Bubbling)
export const shouldStopEventPropagationTry = (event = DEFAULT.NULL) => {
    if (event.target === event.currentTarget) {
        event.stopPropagation();

        return true;
    }

    return false;
}