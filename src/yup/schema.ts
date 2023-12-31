import * as Yup from 'yup';
import { STRING, VALIDATION_MESSAGE } from '../constants/Constants';

export const validationSchema = Yup.object().shape({
    username: Yup.string().trim()
        .required(VALIDATION_MESSAGE.REQUIRED.USERNAME)
        .min(4, VALIDATION_MESSAGE.MIN.USERNAME)
        .matches(STRING.SPACE_REGULAR_EXPRESSION, VALIDATION_MESSAGE.MATCHES.USERNAME),
    email: Yup.string().trim()
        .required(VALIDATION_MESSAGE.REQUIRED.EMAIL)
        .email(VALIDATION_MESSAGE.INVALID.EMAIL),
    phoneNumber: Yup.string().trim()
        .required(VALIDATION_MESSAGE.REQUIRED.PHONE_NUMBER)
        .length(10, VALIDATION_MESSAGE.INVALID.PHONE_NUMBER),
    address: Yup.string().trim()
})