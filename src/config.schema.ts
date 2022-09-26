import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  SERVER_PORT: Joi.string().required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().default(5432).required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_DATABASE: Joi.string().required(),
  GOOGLE_CLIENT_ID: Joi.string().required(),
  GOOGLE_SECRET: Joi.string().required(),
  FE_URL_REDIRECT: Joi.string().required(),
  BE_URL_CALLBACK: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRATION: Joi.string().required(),
  JWT_ISSUER: Joi.string().required(),
  JWT_AUDIENCE: Joi.string().required(),
  JWT_SECRET_REFRESH: Joi.string().required(),
  BE_HOST_PATH: Joi.string().required(),
});