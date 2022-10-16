const Joi = require('joi');

const id = Joi.number();

const getProductSchema = Joi.object({
  id: id.required(),
});

module.exports = { getProductSchema }
