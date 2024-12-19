const express = require('express');
const projectModel = require('../models/projectModel');
const router = express.Router();




router.get('/:taskId/complete', async (req, res) => {
    try {
        const { ObjectId } = require('mongoose').Types;
        const taskId = req.params.taskId;
        const projects = await projectModel.findOne({ 'tasks._id': new ObjectId(taskId)});
        if(!projects) return res.send('project not found');

        const task = projects.tasks.id(taskId);
        if(!task) return res.send('task not found');

        const newStatus = task.status === 'Completed' ? 'Pending' :  'Completed' ;

        
        const project = await projectModel.findOneAndUpdate(
            { 'tasks._id': taskId },
            { $set: { 'tasks.$.status': newStatus} },
            { new: true }
        );

        if (!project) {
            return res.json({ message: 'Task not found' });
        }

        res.json(project);
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


module.exports = router;