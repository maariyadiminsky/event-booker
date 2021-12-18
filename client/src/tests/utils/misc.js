
export const generateRandomString = () => Math.random().toString(36).substr(2, 5);

const originalConsoleLog = console.log;
export const hideConsoleLog = () => {
    // note: silence console.log temporarily in apiBaseCall while errors pass
    // without having to turn of --verbose in package.json
    console.log = jest.fn();
}

export const showConsoleLog = () => {
    console.log = originalConsoleLog;
}