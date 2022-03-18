// Common validations that are reused
import Joi from "joi";
import joiObjectid from "joi-objectid";

Joi.Objectid = joiObjectid(Joi);

export const email = Joi.string().trim().email({ minDomainSegments: 2 });

export const password = Joi.string().trim().min(8);

export const token = Joi.string();

export const objectId = Joi.Objectid();
