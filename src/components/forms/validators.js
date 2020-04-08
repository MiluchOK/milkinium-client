import log from "loglevel"


export const runValidate = values => {
    const errors = {};
    const requiredFields = [
        'title',
        'password'
    ];
    requiredFields.forEach(field => {
        log.debug("Checking field ", field);
        if (!values[field]) {
            errors[field] = 'Required'
        }
    });
    if (
        values.email &&
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
        errors.email = 'Invalid email address'
    }
    log.debug("Errors: ", errors);
    return errors
};
