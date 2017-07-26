'use strict';

let Todolist = require('./models/todolist');
let Todo = require('./models/todo');

function getLists(res) {
    Todolist.find(function (err, todolists) {
        if (err) {
            res.send(err);
        }
        // return all lists in JSON format
        res.json(todolists);
    });
}

function getTodos(res) {
    Todolist.find(function (err, todolists) {
        if (err) {
            res.send(err);
        }
        console.log(todolists);
        // return all todos in JSON format
        res.json(todolists.tasks);
    });
}

module.exports = function (app) {

    // api
    // get all lists - used mongoose
    app.get('/api/lists', function (req, res) {
        getLists(res);
    });

    // create list and send back all lists after creation
    app.post('/api/lists', function (req, res) {

        // create a list (AJAX request from Angular)
        Todolist.create({
            name: req.body.name,
            done: false
        }, function (err, list) {
            if (err)
                res.send(err);

            // get and return all the lists after create new todo list
            getLists(res);
        });

    });

    // update a list
    app.put('/api/lists/:list_id', function (req, res) {
        Todolist.findById(req.params.list_id, function (err, list) {
            console.log(list.name);
            console.log(req.body.name);
            if (err) {
                res.send(err);
            }
            list.name = req.body.name;
            list.save(function(err) {
                if (err)
                    res.send(err);
            });
        });
        res.send({type: 'PUT'});
    });


    // delete a list
    app.delete('/api/lists/:list_id', function (req, res) {
        Todolist.remove({
            _id: req.params.list_id
        }, function (err, list) {
            if (err)
                res.send(err);

            getLists(res);
        });
    });

    // create task in todo list
    app.post('/api/lists/:list_id/task', function (req, res) {
        Todolist.findById(req.params.list_id, function (err, list) {
            list.tasks.push(req.body.text);
            if (err) {
                res.send(err);
            }
            
            list.save(function(err) {
                if (err)
                    res.send(err);
            });
        });
        getTodos(res);
    });


    // load the single view file
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html');
    });
};