// so elements with multiple event handlers aren't unnecessarily 
// called more than once(ie. SyntheticEvent Bubbling)
export const shouldStopEventPropagationTry = (event) => {
    console.log(event.target, event.currentTarget);
    if (event.target === event.currentTarget) {
        event.stopPropagation();

        return true;
    }

    return false;
}