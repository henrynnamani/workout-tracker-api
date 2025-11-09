import * as Joi from 'joi';

export const environmentValidator = Joi.object({
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRES_IN: Joi.string().default('1h'),
  DB_URL: Joi.string().required(),
  DB_SYNC: Joi.boolean().default(false),
});
