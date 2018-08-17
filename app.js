const express = require('express');
const { ObjectId } = require('mongodb');
const _ = require('lodash');

const bodyParser = require('body-parser');
const morgan = require('morgan');

const mongoose = require('./config/db');
const { Ticket } = require('./models/ticket');
const { Employee } = require('./models/employee');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// app.use(morgan('dev'));
app.use(morgan('short'));
// app.use(morgan('tiny'));

// app.use(morgan(function (tokens, req, res) {
//     return [
//       tokens.method(req, res),
//       tokens.url(req, res),
//       tokens.status(req, res),
//       tokens['response-time'](req, res), 'ms',
//       new Date()
//     ].join(' ')
// }));

// app.use('tickets/:id',(req,res,next) => {
//     let id = req.params.id;
//     if(!ObjectId.isValid(id)) {
//         res.send({
//             notice: 'invalid object id'
//         })
//     }
//     next();
// })

// FIXME: trowing promise rejection handling warning
// app.param('id',(req,res,next) => {
//     let id = req.params.id;
//     if(!ObjectId.isValid(id)) {
//         res.send({
//             notice: 'invalid object id'
//         })
//     }
//     next();
// })

app.get('/',(req,res) => {
    res.send({
        msg: 'Welcome to ticket master'
    })
})

// app.get('/tickets',(req,res) => {
//     Ticket.find()
//     .then((tickets) => {
//         res.send(tickets);
//     })
//     .catch((err) => {
//         res.send(err);
//     })
// })

// app.get('/tickets/:id',(req,res) => {
//     let id = req.params.id;

//     // checking whether the id is valid or not
//     // if(!ObjectId.isValid(id)) {
//     //     res.send({
//     //         notice: 'invalid object id'
//     //     })
//     // }

//     Ticket.findById(id)
//     .then((ticket) => {
//         // checking whether the id is available or not
//         if(ticket) {
//             res.send({
//                 ticket,
//                 notice: 'Successfully obtained the ticket'
//             });
//         } else {
//             res.send({
//                 notice: 'Ticket not found'
//             })
//         }
//     })
//     .catch((err) => {
//         res.send(err);
//     })
// })

// app.post('/tickets',(req,res) => {
//     // let body = req.body;

//     // _.pick() provided by lodash library
//     // strong parameter check
//     let body = _.pick(req.body, ['name', 'department', 'priority', 'message']);
//     let ticket = new Ticket(body);

//     ticket.save()
//     .then((ticket) => {
//         res.send({
//             ticket,
//             notice: 'Successfully created the ticket'
//         });
//     })
//     .catch((err) => {
//         res.send(err);
//     })
// })

// app.put('/tickets/:id',(req,res) => {
//     let id = req.params.id;
//     // let body = req.body;

//     // if(!ObjectId.isValid(id)) {
//     //     res.send({
//     //         notice: 'invalid object id'
//     //     })
//     // }

//     // parameters allowed to be updated
//     let body = _.pick(req.body, ['name', 'department', 'priority', 'message', 'status']);

//     Ticket.findByIdAndUpdate(id, { $set: body}, { new: true})
//     .then((ticket) => {
//         if(ticket) {
//             res.send({
//                 ticket,
//                 notice: 'Successfully updated the ticket'
//             });
//         } else {
//             res.send({
//                 notice: 'Ticket not found'
//             })
//         }
//     })
//     .catch((err) => {
//         res.send(err);
//     })
// })

app.get('/employees',(req,res) => {
    Employee.find()
    .then((employees) => {
        res.send(employees);
    })
    .catch((err) => {
        res.send(err);
    })
})

app.get('/employees/:id',(req,res) => {
    let id = req.params.id;

    // checking whether the id is valid or not
    // if(!ObjectId.isValid(id)) {
    //     res.send({
    //         notice: 'invalid object id'
    //     })
    // }

    Employee.findById(id)
    .then((employee) => {
        // checking whether the id is available or not
        if(employee) {
            res.send({
                employee,
                notice: 'Successfully obtained the employee'
            });
        } else {
            res.send({
                notice: 'Employee not found'
            })
        }
    })
    .catch((err) => {
        res.send(err);
    })
})

app.post('/employees',(req,res) => {
    let body = req.body;

    // _.pick() provided by lodash library
    // strong parameter check
    // let body = _.pick(req.body, []);
    let employee = new Employee(body);

    employee.save()
    .then((employee) => {
        res.send({
            employee,
            notice: 'Successfully created the employee'
        });
    })
    .catch((err) => {
        res.send(err);
    })
})

app.put('/employees/:id',(req,res) => {
    let id = req.params.id;
    let body = req.body;

    // if(!ObjectId.isValid(id)) {
    //     res.send({
    //         notice: 'invalid object id'
    //     })
    // }

    // parameters allowed to be updated
    // let body = _.pick(req.body, []);

    Employee.findByIdAndUpdate(id, { $set: body}, { new: true})
    .then((employee) => {
        if(employee) {
            res.send({
                employee,
                notice: 'Successfully updated the employee'
            });
        } else {
            res.send({
                notice: 'Employee not found'
            });
        }
    })
    .catch((err) => {
        res.send(err);
    })
})

app.delete('/employees/:id',(req,res) => {
    let id = req.params.id;

    // if(!ObjectId.isValid(id)) {
    //     res.send({
    //         notice: 'invalid object id'
    //     })
    // }

    Employee.findByIdAndRemove(id)
    .then((employee) => {
        if(employee) {
            res.send({
                employee,
                notice: 'Successfully deleted the '
            });
        } else {
            res.send({
                notice: 'Employee not found'
            });
        }
    })
    .catch((err) => {
        res.send(err);
    })
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})