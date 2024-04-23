import connection, { ObjectId } from "../database/connection.js";

class LogonRepository{

    async do_connection() {
        try {
            this.db = await connection();
            this.collection = this.db.collection("user");
        } catch (error) {
            throw error;
        }
    }

    async login(email, password){
        try {
            await this.do_connection();
            const filter = { $and: [{ email: email }, { password: password }] };
            const document = await this.collection.findOne(filter);
            return JSON.parse(JSON.stringify(document));
        } catch (error) {
            throw error;
        }
    }

    async logoff(index){
        try {
            await this.do_connection();
		    const filter = { _id: new ObjectId(index) };
            const document = { $set: { session: "" } };
		    return await this.collection.updateOne(filter, document);
		} catch (error) {
		    throw error;
		}
    }

    async saveToken(index, ss){
        try {
            await this.do_connection();
		    const filter = { _id: new ObjectId(index) };
            const document = { $set: { session: ss } };
		    return await this.collection.updateOne(filter, document);
		} catch (error) {
		    throw error;
		}
    }

    async verifyToken(ss){
        try {
            await this.do_connection();
            const filter = { session: ss };
            const document = await this.collection.findOne(filter);
            return JSON.parse(JSON.stringify(document));
        } catch (error) {
            throw error;
        }
    }
}

export default new LogonRepository();
