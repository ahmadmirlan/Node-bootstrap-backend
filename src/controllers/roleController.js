import {Role} from '../models/roleModel';
import {pick} from 'lodash';

/*
 * POST
 * Create new role
 * */
const createNewRole = async (req, res) => {
    const body = req.body;

    // Define roles instance
    const role = new Role(pick(body, ['title', 'isCoreRole', 'permissions']));

    // Save roles
    try {
        await role.save();
        return res.send(role);
    } catch (e) {
        return res.status(400).sendError(e);
    }
};

/*
 * PUT
 * Update existing role by id
 * */
const updateRole = async (req, res) => {
    const body = req.body;

    if (!body.id) {
        return res.status(400).sendError('Please provide role id!');
    }

    try {
        // Find existing role and update with new value
        let role = await Role.findByIdAndUpdate(req.body.id, pick(body, ['title', 'isCoreRole', 'permissions']), {new: true});
        return res.send(role);
    } catch (e) {
        return res.status(400).sendError(e);
    }

};

/*
 * GET
 * Get all roles
 * */
const findAllRoles = async (req, res) => {
    try {
        const roles = await Role.find();
        return res.send(roles);
    } catch (e) {
        return res.status(400).sendError(e);
    }
};

/*
* DELETE
* Remove role
* */
const removeRole = async (req, res) => {
    const {roleId} = req.params;
    if (!roleId) {
        return res.send.status(400).sendError('Please provide role id');
    }

    try {
        await Role.findByIdAndDelete(roleId);
        return res.sendMessage(`Role with id ${roleId} removed!`);
    } catch (e) {
        return res.status(400).sendError(e);
    }
};

module.exports = {
    createNewRole,
    updateRole,
    findAllRoles,
    removeRole
};
