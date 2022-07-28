const query = require('../db/db-connection');
const { multipleColumnSet } = require('../utils/common.utils');
const Role = require('../utils/userRoles.utils');

const getCurrentTimestamp = () => {
    return Math.floor(Date.now() / 1000);
}

class UserModel {
    tableName = 'user';
    friendsTableName = 'user_friends'

    find = async (params = {}) => {
        let sql = `SELECT * FROM ${this.tableName}`;

        if (!Object.keys(params).length) {
            return await query(sql);
        }

        const { columnSet, values } = multipleColumnSet(params)
        sql += ` WHERE ${columnSet}`;

        return await query(sql, [...values]);
    }

    findFriends = async (params) => {
        const { columnSet, values } = multipleColumnSet(params)
        const sql = `SELECT * FROM ${this.friendsTableName} WHERE ${columnSet}`;
        const friends = await query(sql, [...values]);
        return friends;
    }

    findOne = async (params) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `SELECT * FROM ${this.tableName}
        WHERE ${columnSet}`;

        const result = await query(sql, [...values]);

        // return back the first row (user)
        return result[0];
    }

    create = async ({ username, password, email, role = Role.SuperUser, }) => {
        const sql = `INSERT INTO ${this.tableName}
        (username, password, email, role, created_at, updated_at) VALUES (?,?,?,?,?,?)`;

        const result = await query(sql, [username, password, email, role, getCurrentTimestamp(), getCurrentTimestamp()]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }

    update = async (params, id) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `UPDATE user SET ${columnSet} WHERE id = ?`;

        const result = await query(sql, [...values, id]);

        return result;
    }

    delete = async (id) => {
        const sql = `DELETE FROM ${this.tableName}
        WHERE id = ?`;
        const result = await query(sql, [id]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }

    deleteFriend = async (user_id, friend_id) => {
        const sql = `DELETE FROM ${this.friendsTableName}
        WHERE user_id = ? and friend_id = ?`;
        const result = await query(sql, [user_id, friend_id]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }

    addFriend = async ({ user_id, friend_id }) => {
        const sql = `INSERT INTO ${this.friendsTableName} (user_id, friend_id) VALUES (?,?)`;

        const result = await query(sql, [user_id, friend_id]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }
}

module.exports = new UserModel;
