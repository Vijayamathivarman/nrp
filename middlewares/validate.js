

const Joi = require('joi');
const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');

const validate = (schema) => (req, res, next) => {
  const validSchema = pick(schema, ['params', 'query', 'body']);
  const object = pick(req, Object.keys(validSchema));

  // Conditionally include "role" and "projectCode" in the validation schema
  if (req.body && req.body.role) {
    // Preserve existing body schema if it exists
    const existingBodySchema = validSchema.body ? validSchema.body : Joi.object();
    
    // Modify the existing body schema to include "role" and "projectCode"
    validSchema.body = existingBodySchema.keys({
      role: Joi.string().valid('user', 'admin','manager','engineer'), // Adjust the allowed roles

      projectCode: Joi.string().when('role', { is: 'admin', then: Joi.optional()}), // Conditionally required
      designation: Joi.string().when('role', { is: 'admin', then: Joi.optional() }), // Optional for admin
      employeeCode: Joi.string().when('role', { is: 'admin', then: Joi.optional() }), // Optional for admin
      contactnumber: Joi.string().when('role', { is: 'admin', then: Joi.optional() }), // Optional for admin

      projectMaster:Joi.string().when('role',{is:'manager',then: Joi.optional() }),
      projectCode: Joi.string().when('role', { is: 'manager', then: Joi.optional() }), // Conditionally required
      designation: Joi.string().when('role', { is: 'manager', then: Joi.optional() }), // Optional for admin
      employeeCode: Joi.string().when('role', { is: 'manager', then: Joi.optional() }), // Optional for admin
      contactnumber: Joi.string().when('role', { is: 'manager', then: Joi.optional() }), // Optional for admin

      projectactivity: Joi.string().when('role',{is:'engineer',then:Joi.optional()}),
      projectMaster:Joi.string().when('role',{is:'engineer',then: Joi.optional() }),
      projectCode: Joi.string().when('role', { is: 'engineer', then: Joi.optional() }), // Conditionally required
      designation: Joi.string().when('role', { is: 'engineer', then: Joi.optional() }), // Optional for admin
      employeeCode: Joi.string().when('role', { is: 'engineer', then: Joi.optional() }), // Optional for admin
      contactnumber: Joi.string().when('role', { is: 'engineer', then: Joi.optional() }), // Optional for admin
    });
  }

  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: 'key' }, abortEarly: false })
    .validate(object);

  if (error) {
    const errorMessage = error.details.map((details) => details.message).join(', ');
    return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
  }

  Object.assign(req, value);
  return next();
};

module.exports = validate;
