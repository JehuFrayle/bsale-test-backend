const Joi = require('joi');

const id = Joi.number().integer();

const getCategorySchema = Joi.object({
  id: id.required(),
});

module.exports = { getCategorySchema }
