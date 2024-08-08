import Joi from 'joi';

export const contactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Username should be a string',
    'string.min': 'Username should have at least {#limit} characters',
    'string.max': 'Username should have at most {#limit} characters',
    'any.required': 'Username is required',
  }),
  phoneNumber: Joi.string()
    .min(12)
    .max(13)
    .pattern(/^\+\d{12}$/)
    .required()
    .messages({
      'string.min': 'Phone number should have at least {#limit} characters',
      'string.max': 'Phone number should have at most {#limit} characters',
      'string.pattern.base': 'Phone number must be in the format +XXXXXXXXXXXX',
      'any.required': 'Phone number is required',
    }),
  email: Joi.string().email().required().messages({
    'any.required': 'Email is required',
  }),
  isFavourite: Joi.boolean(),
  contactType: Joi.string()
    .valid('work', 'home', 'personal')
    .required()
    .messages({
      'any.required': 'contactType is required',
    }),
});

export const updateConactSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  phoneNumber: Joi.string()
    .min(12)
    .max(13)
    .pattern(/^\+\d{12}$/),
  email: Joi.string().email(),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid('work', 'home', 'personal'),
});
