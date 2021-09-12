// so elements with multiple event handlers aren't unnecessarily 
// called more than once(ie. SyntheticEvent Bubbling)
export const shouldStopEventPropagationTry = (event) => {
    if (event.target === event.currentTarget) {
        event.stopPropagation();

        return true;
    }

    return false;
}