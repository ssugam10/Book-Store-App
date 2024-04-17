import express from 'express';
import {PORT, mongoDBURL} from './config.js';
import mongoose from 'mongoose';
import {Book} from './models/book.js';
import booksRoute from './routes/book.js';
import cors from 'cors';

const app = express();

//Middleware for parsing the req body
app.use(express.json());

//Middleware for handling CORS POLICY
//Option 1 : Allow all origins with default of cors(*)
app.use(cors());
//Option 2: Allow custom origins
// app.use(cors({
//     origin:'http://localhost:3000',
//     methods:['GET','POST','PUT','DELETE'],
//     allowedHeaders:['Content-Type']
// }));

app.get('/',(req,res) => {
    return res.status(234).send('Welcome to mern stack tutorial');
});

app.use('/books',booksRoute);

mongoose.connect(mongoDBURL)
.then(() => {
    console.log('app connected to the database!');
    app.listen(PORT, () => {
        console.log(`App is listening to port ${PORT}`);
    });    
})
.catch((err) => {
    console.error(err);
})