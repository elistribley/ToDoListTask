const express = require('express');
const morgan = require('morgan');
const toDoListRouter = require('./route/todolist-router')
const PORT = process.env.PORT || 3000; 


const app = express();

app.use(morgan('dev'));
app.use('/toDoList', toDoListRouter);


app.use(function( error, request, response, next){
    response.status(error.statusCode || 500)
            .send(error.message || "Something went wrong...");
});

app.listen(PORT, () => console.log('Up and running'));