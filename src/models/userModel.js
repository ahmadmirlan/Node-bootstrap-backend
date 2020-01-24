import {model, ObjectId, Schema} from 'mongoose';
import Joi from 'joi';
import jwt from 'jsonwebtoken';

const userSchema = new Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String
    },
    username: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 20,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024,
    },
    accessToken: {type: String},
    refreshToken: {type: String},
    pic: {
        type: String,
    },
    phone: {
        type: String,
        required: false,
    },
    status: {
        type: String,
        enum: ['ACTIVE', 'BLOCKED', 'DELETED', 'PENDING'],
        default: 'PENDING'
    },
    role: {
        type: ObjectId,
        ref: 'Role'
    }
}, {
    timestamps: true,
    toJSON: {getters: true},
    toObject: {getters: true},
});

/*Generated Token*/
userSchema.methods.generateAuthToken = user => {
    return jwt.sign(
        {_id: user._id, username: user.username, role: user.role},
        process.env.JWT_PRIVATE_KEY,
        {
            expiresIn: 86400,
        },
    );
};

const User = model('User', userSchema);

// Validate users
function validateUser(user) {
    const schema = {
        firstName: Joi.string(),
        lastName: Joi.string(),
        username: Joi.string()
            .min(6)
            .max(20)
            .required(),
        email: Joi.string()
            .min(5)
            .max(255)
            .required()
            .email(),
        password: Joi.string()
            .min(5)
            .max(255)
            .required(),
    };
    return Joi.validate(user, schema);
}

module.exports = {
    User,
    Validate: validateUser
};
