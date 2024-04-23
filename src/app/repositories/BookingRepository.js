import connection, { ObjectId } from "../database/connection.js";

class BookingRepository{

    async do_connection() {
        try {
            this.db = await connection();
            this.collection = this.db.collection("booking");
        } catch (error) {
            throw error;
        }
    }

    async findAll(){
        try {
            await this.do_connection();
            const documents = await this.collection.find({}).toArray();
            return JSON.parse(JSON.stringify(documents));
        } catch (error) {
            throw error;
        }
    }

    async findById(index){
        try {
            await this.do_connection();
            const filter = { _id: new ObjectId(index) };
            const document = await this.collection.findOne(filter);
            return JSON.parse(JSON.stringify(document));
        } catch (error) {
            throw error;
        }
    }

    async create(document){
        try {
            await this.do_connection();
		    return await this.collection.insertOne(document);
		} catch (error) {
            throw error;
		}
    }

    async update(index, document){
        try {
            await this.do_connection();
		    const filter = { _id: new ObjectId(index) };
		    return await this.collection.updateOne(filter, document);
		} catch (error) {
		    throw error;
		}
    }

    async delete(index){
        try {
            await this.do_connection();
		    const filter = { _id: new ObjectId(index) };
		    return await this.collection.deleteOne(filter);
		} catch (error) {
		    throw error;
		}
    }
}

export default new BookingRepository();
