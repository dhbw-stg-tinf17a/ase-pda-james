const Joi = require("@hapi/joi");
// const pc = require("joi-password-complexity"); TODO: fix dependencies

module.exports = {
  schemaLogin: Joi.object().keys({
    email: Joi.string().email({minDomainSegments: 2}).required(),
    password: Joi.string().min(10).max(64).required(),
  }),

  schemaAuth: Joi.object().keys({
    email: Joi.string().email({minDomainSegments: 2}).required(),
    authToken: Joi.string().required(),
  }),

  schemaUserRegister: Joi.object().keys({
    email: Joi.string().email({minDomainSegments: 2}).required(),
    password: Joi.string().min(10).max(64).required(),
    fullname: Joi.string().max(99).required(),
  }),

  schemaWidget: Joi.object().keys({
    title: Joi.string().max(256).required(),
    name: Joi.string().max(128).required(),
    survey: Joi.object().required(),
    colors: Joi.object().required(),
  }),
};
