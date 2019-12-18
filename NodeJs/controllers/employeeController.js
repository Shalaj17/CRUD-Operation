//package import
const express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectID;

var { Employee } = require('../models/employee'); 

 // => localhost:3000/employees/

//get or read all employees
router.get('/', (req, res) => {
    Employee.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving Employees :' + JSON.stringify(err, undefined, 2)); }
    });
});

//get or read or Search employees by id 
router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);
    
    Employee.findById(req.params.id, (err, doc) => {
        if(!err){ res.send(doc); }
        else {console.log('Error in Retriving Employee :' + JSON.stringify(err, undefined, 2)); }
    });
});

// Create a new employee
router.post('/',(req, res) =>{
    var emp = new Employee({
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary,
    });
    emp.save((err, doc) => {
        if(!err){res.send(doc); }
        else { console.log('Error in Employee Save :' + JSON.stringify(err, undefined, 2));}
    });
});

// Update employee
router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var emp = {
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary,
    };
    Employee.findByIdAndUpdate(req.params.id, { $set: emp }, {new: true }, (err, doc) => {
        if(!err){ res.send(doc); }
        else { console.log('Error in Employee Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

// Delete employee
router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);
    
    Employee.findByIdAndRemove(req.params.id, (err, doc)=>{
        if(!err) {res.send(doc); }
        else {console.log('Error in Employee Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});

//Export router from this file so that it can be used in any another file 
module.exports = router;