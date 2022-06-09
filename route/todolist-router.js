const { response } = require('express');
const express = require('express');
const { request } = require('http');


const router = express.Router();
// READ ALL
router.get('/getAll', (request, response, next ) => {
    response.contentType('application/json') 
            .status(200)
            // Converts object to json and puts in the response body
            .json(database); 
});

router.get('/getById/:id', (request, response, next) => {
    const id = Number(request.params.id);
    if (isNaN(id)) return next ({ statusCode:400, message: 'ID must be a number'});

    //FIND BY ID
    const index = database.findIndex((task) => task.id == id);
});

// CREATE
router.post('/create', (request, response, next) => {

    //VALID FORMAT FOR CREATION?
    if (Object.keys(request.body).length == 0) return next ({
        statusCode: 400,
        message: "Body cannot be empty"});

    const newTaskData = request.body;
    //INCREASE ID AND PUSH TO DATABASE
    newTaskData.id = idCounter++;
    database.push(newTaskData);
    //RETURN COMFIRMATION
    response.status(201).json(newTaskData);
});


// UPDATE
router.put('/update', (request, response, next) => {
    //ENSURE BODY IS NOT EMPTY
    if (Object.keys(request.body).length == 0) return next ({
        statusCode: 400,
        message: "Body cannot be empty"});

    //IS THERE AN ID?
    const id = Number(request.body.id);
    if (isNaN(id)) return next ({ statusCode:400, message: 'ID must be a number'});

    const task = database.find((task) => task.id == id);
    //IS THERE A TASK WITH THAT ID?
    if (!task) return next({
        statusCode: 404,
        message: `Task does not exist with id ${id}`
    });

    //UPDATE TASK
    // USUALLY VALIDATE, PUT, COMFIRM
    if (task.status) task.completed = request.body.status;
    if (task.lengthOfTask) task.lengthOfTask = request.body.lengthOfTask;
    response.status(200).json(task);
    
});

// DELETE
router.delete('/delete/:id', (request, response, next) => {

    //IS THERE AN ID?
    const id = Number(request.params.id);
    if (isNaN(id)) return next ({ statusCode:400, message: 'ID must be a number'});

    //FIND BY ID
    const index = database.findIndex(function(task){
            return task.id == id;
    });
    //TASK EXISTS WITH ID?
    if (index == -1) return next({
        statusCode: 404,
        message: `Task does not exist with id ${id}`
    });

    database.splice(index, 1);
    //COMFIRMATION
    response.status(200)
            .send('Task deleted successfully')
});

module.exports = router;
//IN MEM DATA
let idCounter = 6;
const database = [
    {
        id: 1,
        name: "Wash the dishes",
        description: "Gather all dishes, glasses and mugs around the house in order to clean them",
        timeLimit: "8pm Thursday",
        lengthOfTask: "10 minutes",
        inside: true,
        status: "Todo"
    },
    {
        id: 2,
        Name: "Take out the bins",
        description: "Empty the bins inside and put all bins ready for collection outside",
        timeLimit: "10pm Thursday",
        lengthOfTask: "5 minutes",
        inside: false,
        status: "Todo"
    },
    {
        id: 3,
        Name: "Hoover the house",
        description: "Get everything off the floor prior to hoovering so it can be done quicker",
        timeLimit: "12pm Saturday",
        lengthOfTask: "1 hour",
        inside: true,
        status: "Todo"
    },
    {
        id: 4,
        Name: "Mow the garden",
        description: "Open the dusty shed, get out the lawn mower and cut the grass for once",
        timeLimit: "3pm Sunday",
        lengthOfTask: "1 hour",
        inside: false,
        status: "Todo"
    },
    {
        id: 5,
        Name: "Tidy desk",
        description: "Get all food packets, drinks and other stuff in order for a clean work space",
        timeLimit: "4pm Friday",
        lengthOfTask: "5 minutes",
        inside: true,
        status: "Todo"
    },

];