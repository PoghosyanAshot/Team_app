"use strict";

const Joi = require("joi");
const { ValidationError } = require("../errors");

const validate = (schema) => (req, res, next) => {
    const validSchema = Joi.object(schema);
    const objectToValidate = {};

    ["body", "query", "params"].forEach((key) => {
        if (schema[key]) {
            objectToValidate[key] = req[key];
        }
    });

    const { value, error } = validSchema.validate(objectToValidate, {
        abortEarly: false,
        stripUnknown: true,
        errors: { wrap: { label: "" } },
    });

    if (error) {
        const errorMessages = error.details.map((details) => details.message);
        return next(new ValidationError(errorMessages));
    }

    Object.assign(req, value);

    return next();
};

module.exports = validate;
