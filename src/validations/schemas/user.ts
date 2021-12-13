import Joi from 'joi';

const userSchema = Joi.object({
  name: Joi.string().min(1).trim().required(),
  _class: Joi.string().min(1).trim().required(),
});

export { userSchema };
