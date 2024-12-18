const express = require("express");
const router = express.Router();
const projectModel = require('../models/projectModel');
const userModel = require("../models/userModel");


router.post('/create',async function(req,res){
     try {
        let assignTo = {_id:'6762853ef4d07504e357091e'}
        const project = await projectModel.create({
             title:'design website',
               description: 'do the coding of website',
               assignTo,
               status:'Pending',
               tasks:[
                {
                   title: 'gather information ',
                   status:'Pending',  
               },
                {
                   title: 'understand the design',
                   status:'Pending',  
               },
               {
                   title: 're-check it',
                   status:'Pending',  
               }],
               deadline: '24 dec',
               time: '1 pm', 
        });
        const savedProject = await project.save();

    
    await userModel.findOneAndUpdate(
      assignTo, 
      { $push: { projects: savedProject._id } }, 
      { new: true } 
    );
        res.json(savedProject);

     } catch (error) {
        console.log(error.message)
     }
});

router.get('/all',async function(req,res){
    try {
        const projects = await projectModel.find();
        res.json(projects)
    } catch (error) {
        console.log(error.message)
    }
});
router.get('/:id',async function(req,res){
    try {
        const {id} = req.params;
        const project = await projectModel.findOne({_id : id});
        res.json(project)
    } catch (error) {
        console.log(error.message)
    }
});
router.get('/accept/:id',async function(req,res){
    try {
        const {id} = req.params;
        const project = await projectModel.findOne({_id:id});
        if(!project) return res.send('project not found');
        project.status = 'Accepted';
        await project.save();

        res.json(project,{message: 'project Accepted'});

    } catch (error) {
        console.log(error.message)
    }
});

module.exports = router;