import {model, ObjectId, Schema} from 'mongoose';
import Joi from 'joi';

const permissionsSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            minLength: 2,
        },
        level: {
            type: Number,
            required: true,
        },
        title: {
            type: String,
        },
        parentId: {
            type: ObjectId,
            ref: 'Permissions',
        },
    },
    {
        timestamps: true,
        toJSON: {getters: true},
        toObject: {getters: true},
    },
);

const Permissions = model('Permissions', permissionsSchema);

// Validate permissions
function validatePermissions(Permissions) {
    const schema = {
        name: Joi.string().min(2).required(),
        level: Joi.number().required(),
        title: Joi.string().required(),
        parentId: Joi.string()
    };
    return Joi.validate(Permissions, schema);
}

module.exports = {
    Permissions,
    Validate: validatePermissions
};
