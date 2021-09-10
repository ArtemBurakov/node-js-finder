const query = require('../db/db-connection');

const getCurrentTimestamp = () => {
    return Math.floor(Date.now() / 1000);
}

class FcmTokenModel {
    tableName = 'user_fcm_token';

    create = async ({ registration_token, user_id }) => {
        const sql = `INSERT INTO ${this.tableName}
        (registration_token, user_id, created_at, updated_at) VALUES (?,?,?,?)`;

        const result = await query(sql, [registration_token, user_id, getCurrentTimestamp(), getCurrentTimestamp()]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }
}

module.exports = new FcmTokenModel;
