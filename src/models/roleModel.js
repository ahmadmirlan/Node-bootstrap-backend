import {model, ObjectId, Schema} from 'mongoose';

const roleSchema = new Schema(
    {
        title: {
            type: String,
        },
        isCoreRole: {
            type: Boolean,
            required: true,
        },
        permissions: [
            {
                type: ObjectId,
                ref: 'Permissions',
            },
        ],
    },
    {
        timestamps: true,
        toJSON: {getters: true},
        toObject: {getters: true},
    },
);

const Role = model('Role', roleSchema);

module.exports = {
    Role
};
