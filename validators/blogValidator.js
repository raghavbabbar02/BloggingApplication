import Joi from "joi";

const blogValidator = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required()
});

export default blogValidator;
