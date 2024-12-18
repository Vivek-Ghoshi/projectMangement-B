const express = require('express');
const projectModel = require('../models/projectModel');
const router = express.Router();




router.get('/:taskId/complete', async (req, res) => {
    try {
        const taskId = req.params.taskId;

        // Update the specific task's status
        const project = await projectModel.findOneAndUpdate(
            { 'tasks._id': taskId },
            { $set: { 'tasks.$.status': 'Completed' } },
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