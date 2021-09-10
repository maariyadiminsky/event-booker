// so elements with multiple event handlers aren't unnecessarily 
// called more than once(ie. SyntheticEvent Bubbling)
export const stopEventPropagationTry = (event) => {
    if (event.target === event.currentTarget) {
        event.stopPropagation();
    }
}