import {
    SUCCESS_COLOR,
    WARNING_COLOR,
    ERROR_COLOR,
    INFORMATIVE_COLOR,
    SUCCESS,
    WARNING,
    ERROR,
    INFORMATIVE
} from '../const';

const colors = ['red', 'blue', 'green', 'yellow', 'purple'];
export const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

export const getColorForAlertType = (type) => {
    switch(type) {
        case SUCCESS:
            return SUCCESS_COLOR;
        case WARNING:
            return WARNING_COLOR;
        case ERROR:
            return ERROR_COLOR;
        case INFORMATIVE:
            return INFORMATIVE_COLOR;
        default:
            return SUCCESS_COLOR;
    }
}