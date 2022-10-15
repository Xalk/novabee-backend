import mongoose from "mongoose";

const URI = process.env.MONGODB_URI;

mongoose
    .connect(`${URI}`, {}, (err) => {
        if(err) throw err;
        console.log('Mongodb connection')
    })
