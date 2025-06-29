import Joi, { ValidationError, ValidationResult } from "joi";


const channelSchema = {
    id: {
        type: 'string',
        format: 'uuid',
        description: 'Unique identifier for the channel'
    },
    title: {
        type: 'string',
        description: 'Title of the channel'
    },
    description: {
        type: 'string',
        description: 'Description of the channel'
    },
}

interface ChannelProps{
    id: string;
    title: string;
    description?: string;
}


class Channel {
    id: string;
    title: string;
    description?: string;

    constructor({id, title,description}: ChannelProps) {
        this.id = id;
        this.title = title;
        this.description = description;
    }

    validateChannel(): ValidationResult {
        const schema = Joi.object({
            id: Joi.string().required(),
            title: Joi.string().required(),
            description: Joi.string().optional()
        });

        return schema.validate(this, { abortEarly: false });
    }
}


// function validateChannel(channel: any): ValidationResult | ValidationError {
//     const schema = Joi.object({
//         id: Joi.string().uuid().required(),
//         title: Joi.string().required(),
//         description: Joi.string().optional()
//     });

//     return schema.validate(channel, { abortEarly: false });
// }

export { Channel }