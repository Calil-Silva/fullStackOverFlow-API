import Joi from 'joi';

const questionSchema = Joi.object({
  question: Joi.string().trim().min(1).required(),
  student: Joi.string().trim().min(1).required(),
  _class: Joi.string().trim().min(1).required(),
  tags: Joi.string().trim().min(1).required(),
});

export { questionSchema };
