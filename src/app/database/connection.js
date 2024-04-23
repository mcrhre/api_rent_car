import mongodb from "mongodb";

const { ObjectId } = mongodb;
const uri = "mongodb://localhost:27017";
const databaseName = "rent_car";

async function connection() {
  try {
    const client = await mongodb.MongoClient.connect(uri);
    console.log("Connection established - All well");
    const db = client.db(databaseName);
  
    return db;
  } catch (error) {
    console.error("Error fetching data from database:", error);
  }
}

export default connection;
export {ObjectId};
