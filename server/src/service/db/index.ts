// @ts-nocheck
class Database {
    constructor() {
    }

    init(connection) {
        this.connection = connection;
    }

    async storeUser(clientKey, user) {
        const users = this.connection.collection("users");
        const existingUser = await this.getUser(clientKey, user.accountId);
        if (existingUser) {
            return users.updateOne({ id: existingUser.id }, {
                $set: {
                    info: user
                }
            });
        } else {
            return users.insertOne({
                clientKey,
                info: user
            });
        }
    }

    async getUser(clientKey, userAccountId) {
        const users = this.connection.collection("users");
        return users.findOne({
            clientKey,
            "info.accountId": userAccountId
        })
    }

    //HRM stuff

    async getAllRegisteredUsers(clientKey){
        const registeredUsers = this.connection.collection("registered_users");
        return registeredUsers.find({
            clientKey,
        }).toArray();
    }

    async getRegisteredUser(clientKey, userAccountId){
        const registeredUsers = this.connection.collection("registered_users");
        return registeredUsers.find({
            clientKey,
            userAccountId
        }).toArray();
    }

    async registerUser(clientKey, userData){
        const registeredUsers = this.connection.collection("registered_users");
        const existingUser = await this.getRegisteredUser(clientKey, userData.accountId);
        if (existingUser) {
            return registeredUsers.updateOne({ "info.accountId": userData.accountId }, {
                $set: {
                    info: userData
                }
            });
        } else {
            return registeredUsers.insertOne({
                clientKey,
                info: userData
            });
        }
    }
}

const db = new Database();

export default db;
