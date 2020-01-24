import {User, Validate} from '../models/userModel';
import bcrypt from 'bcrypt';
import {pick} from 'lodash';

/*
 * POST
 * Register new user
 * */
const register = async (req, res) => {
    let body = req.body;

    // Error validation
    const {error} = Validate(body);
    if (error) {
        return res.status(400).send({'message': error.details[0].message});
    }


    //Validate user
    let isEmailExist = await User.findOne({email: body.email});
    let isUsernameExist = await User.findOne({username: body.username});
    if (isEmailExist) return res.status(400).send({messages: 'Email already used!'});
    if (isUsernameExist) {
        return res.status(400).send({'messages': 'Username already taken!'});

    }

    let user = new User(
        pick(body, ['firstName', 'lastName', 'email', 'password', 'username']),
    );

    /*Set Default Avatar For User Profile*/
    user.pic = 'https://via.placeholder.com/300';
    //Encrypt The Password Using bcrypt
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    // Define default roles
    user.role = '5e2a5ae6f04a7649e80166c6';

    //Save User To Database
    let newUser = await user.save();

    newUser = pick(newUser, ['firstName', 'lastName', 'email', 'username', 'role']);

    return res.send(newUser);
};

/*
* POST
* Login user
* */
const login = async (req, res) => {
    const {username, password} = req.body;

    if (!username || !password) {
        return res.status(400).sendError('Invalid username/email or password');
    }

    try {
        const user = await User.findOne({
            $or: [{username: username}, {email: username}],
            status: ['PENDING', 'ACTIVE']
        });

        if (!user) {
            return res.status(400).sendError('Invalid username/email or password');
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword)
            return res.status(400).sendError('Invalid username/email or password!');

        user.accessToken = user.generateAuthToken(user);
        user.save()
            .then(resp => {
                res.send({user: user});
            })
            .catch(err => {
                return res.status(500).sendError(err);
            });

    } catch (e) {
        return res.status(500).sendError(e);
    }
};

/*
* GET
* Find user by token
* */
const findUserByToken = async (req, res) => {
    /*
    * Why id ? token already extracted on middle ware Auth.js (if token valid it will have value user_id)*/
    let userId = req.user._id;

    if (!userId) {
        return res.status(404).sendError('Cannot find user by token (no id provided)');
    }

    try {
        const user = await User.findOne({_id: userId, status: ['ACTIVE', 'PENDING']}).select('-password -accessToken');
        if (!user) {
            return res.status(404).sendError('Cannot find user by token (invalid user id)');
        }
        return res.send(user);
    } catch (e) {
        return res.status(400).sendError(e);
    }
};

module.exports = {
    register,
    login,
    findUserByToken
};
