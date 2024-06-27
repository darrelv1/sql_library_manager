const express = require('express');
const router = express.Router();
const Book = require('../models/index').Book
const bookData =require('./helperData')


//higher order function for error handling
const asyncHandler = (innerFunction, view='error') =>{
    return async (req, res )=>{

        try {
            await innerFunction(req, res)
        }  catch (error) {
            console.log(`error: ${error}`)
            console.log("Async has been used and produce an error")
            res.render(view)
        }
    }
}

let activeFields = [];

//Identifies all user-defined fields from the Model - instead of hardcoding them in
(async () => {
    for (let each in await Book.tableAttributes){
        activeFields.push(each)

    }
})()


//Responds a list of Book objects
//HOME
router.get('/', asyncHandler(async(req, res)=>{
    let displayArray = [];
    const bookArray = await Book.findAll();

    //Object creation of the database entries
    bookArray.forEach((each)=> {
        let displayObject = {}
        activeFields.forEach((field) => {displayObject[field] = each.dataValues[field]
        })
        displayArray.push(displayObject);
    })

    res.render('index', {books: displayArray, header: 'All Books', title: "Library App"})

}))


//Renders the create form
router.get('/new', asyncHandler(async(req, res)=>{
    res.render('new.pug')

}, view="error_Form") )


//Responds the matched book to the id,
router.get('/:id', asyncHandler( async (req, res) => {

    const instance  = await Book.findOne({
        'where': {
            'id': req.params['id']
        }
    })
    let instObj = {}
    activeFields.forEach((field)=>{
        instObj[field] = instance[field]

    })
    res.render('update', {data:  instObj})

}, view="error_Form") )


//Posts a new book to the database
router.post('/new', asyncHandler(async(req, res) =>{

        await Book.create(req.body)
        res.redirect('/')
}, view="error_Form") )

//Updates book in the database
router.post('/:id',  asyncHandler(async (req, res)=>{
    const idParam = req.params.id;
    const instance = await Book.findOne({
        'where': {
            'id': idParam
        }
    })

    await instance.update(req.body)
    res.redirect("/")


}, view="error_Form") )


//Deletes a book
router.post('/:id/delete', asyncHandler(async (req, res) => {

    const instance = await Book.destroy({
        'where': {
            'id': req.params.id
        },
    })
    res.redirect("/")
}))


module.exports = router