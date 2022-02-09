
import mongoose from 'mongoose';

const DB_CNN_STRING = "mongodb+srv://matisuez:Matiasuez6621@cluster0.h5pvy.mongodb.net/mern-chat";

export const dbConnection = async () => {
    try {
        
        await mongoose.connect( DB_CNN_STRING );
        console.log(`Database online!`);

    } catch (error) {
        throw new Error(`Error in the database. Check logs!`);
    }
}
