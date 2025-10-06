import mongoose from "mongoose"

export const ConnectDB = async () => {

try {
    
const db = await mongoose.connect(process.env.MONGO_URI)
console.log("Db is connected ",db.connection.host);




} catch (error) {
    
await mongoose.disconnect()
console.log("Error while conneting db",error);
process.exit(1)


}

}