import {connect, connection} from "mongoose";

// mongoose.set("strictQuery", false)

// const connectDB = async () => {
//   return await mongoose.connect(process.env.MONGO_URI)
// }

// export default connectDB

const conn = {
    isConnected: false
}

export async function connectDB(){

    if (conn.isConnected) return;

    const db = await connect('mongodb+srv://admin:admin@clusterprueba.dmuwrr5.mongodb.net/?retryWrites=true&w=majority')
    console.log(db.connection.db.databaseName)
    conn.isConnected = db.connections[0].readyState
}

connection.on('connected', () => {
    console.log('Mongoose is connected')
})

connection.on('error', (err) => {
    console.log('Mongoose connection error ', err)
})