const express = require("express");
const router = express.Router();
const projectModel = require('../models/projectModel');
const userModel = require("../models/userModel");


router.post('/create',async function(req,res){
     try {
        let assignTo = {_id:'6762f85f3ea8bc566d3b15c2'}
        const project = await projectModel.create({
             title:'make website',
               description: 'code the website',
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
               },
               {
                   title: 'make a team ',
                   status:'Pending',  
               },
               {
                   title: 'deploy it',
                   status:'Pending',  
               },
               {
                   title: 'recheck it',
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