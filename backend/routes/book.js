import express from 'express';
import {Book} from '../models/book.js';

const router = express.Router();

//Route for saving a new book
router.post('/', async (req,res) => {
    try{
        if(!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).send({message: "Send all the required fields"});
        }       

        const newBook = {
            title: req.body.title,
            author : req.body.author,
            publishYear : req.body.publishYear
        };

        const book = await Book.create(newBook);
        return res.status(201).send(book);
    }
    catch(error){
        console.log(error);
        res.status(500).send({message: error.message});
    }

});

//Route to get all books from the database
router.get('/', async(req,res) => {
    try{
        const books = await Book.find({});
        //console.log(books);
        return res.status(200).json({
            count: books.length,
            data: books
        });
    }
    catch(err){
        console.log(err.message);
        res.status(500).send({message: err.message});
    }
})

//route for displaying data related to only one book
router.get('/:id', async(req,res) => {
    try{
        const {id} = req.params;

        const book = await Book.findById(id);                                      
        return res.status(200).json(book);
    }
    catch(err){
        console.log(err.message);
        res.status(500).send({message: err.message});
    }
});

//Route to update a book
router.put('/:id', async(req,res) => {
    try{
        if(!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).send({message: "Send all the required fields"});
        }

        const {id} = req.params;
        
        const result = await Book.findByIdAndUpdate(id, req.body);
        if(!result) return res.status(404).json({"message":"book not found!"});
        return res.status(200).send({"message": "book updated successfully!"});
    }
    catch(err){
        console.log(err.message);
        res.status(500).send({message: err.message});
    }
})

router.delete('/:id', async(req,res) => {
    try{
        const {id} = req.params;

        const result = await Book.findByIdAndDelete(id);
        if(!result) return res.status(404).json({message:'Book Not found!'});
        else return res.status(200).send({message: 'Book deleted successfully!'});
    }
    catch(error){
        console.log(error.message);
        res.status(500).send({message:error.message});
    }
});

export default router;