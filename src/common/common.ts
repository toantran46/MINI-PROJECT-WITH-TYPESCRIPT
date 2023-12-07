import { ROUTER_NAME, ROUTER_PATH } from "../constants/Constants";

export const GenerateUUid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = (Math.random() * 16) | 0,
            v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

export const navLinks = [
    { title: ROUTER_NAME.HOME, path: ROUTER_PATH.HOME },
    { title: ROUTER_NAME.MOVIE, path: ROUTER_PATH.MOVIE },
];

export const checkOwnProperty = (object: object, field: string) => {
    return Object.prototype.hasOwnProperty.call(object, field)
}

