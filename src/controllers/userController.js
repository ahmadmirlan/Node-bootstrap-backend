import {buildQuery} from '../middleware/QueryBuilder';
import {pick} from 'lodash';
import {User} from '../models/userModel';

/*
* POST
* Find All users
* */
const findAllUsers = async (req, res) => {
    let query = buildQuery(pick(req.body, [
        'filter',
        'pageNumber',
        'pageSize',
        'sortField',
        'sortOrder',
    ]));

    try {
        let totalElements = await User.countDocuments(query.filter);
        let users = await User.find(query.filter)
            .limit(query.pageSize)
            .skip(query.pageSize * query.pageNumber)
            .sort([[query.sortField, query.sortOrder]]).select('-password -accessToken');
        return res.sendData(users, query.pageSize, totalElements, query.pageNumber);
    } catch (e) {
        return res.status(400).sendError(e);
    }
};

/*
* DELETE
* Remove user (set status to DELETED)*/
const removeUser = async (req, res) => {
    const {userId} = req.params;

    if (!userId) {
        return res.status(400).sendError('Please provide user id');
    }

    try {
        await User.findByIdAndUpdate(userId, {status: 'DELETED'}, {new: true});
        return res.sendMessage(`User with id ${userId} deleted!`);
    } catch (e) {
        return res.status(400).sendError(e);
    }
};

module.exports = {
    findAllUsers,
    removeUser
};
