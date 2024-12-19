const express = require("express");
const router = express.Router();
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

router.post('/register',async function(req,res){
    try {
      const user =   await userModel.create({
               username: 'lucky',
               email : 'a@a.com',
               password:'123',
               performanceScore: 45,
        })
       const token =  jwt.sign({email:user.email, id:user._id },process.env.JWT_SECRET);
        res.cookie('token',token);
        res.json(user)
    } catch (error) {
        console.log(error.message)
    }
})


router.post("/login", async function (req, res) {
  try {
    let { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) return res.send("you are not registered candidate");
    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRET
    );
    res.cookie('token',token);
    res.json(user)
  } catch (error) {
    console.log(error.message);
  }
});

router.get('/:id/progress', async (req, res) => {
  try {
    const candidate = await userModel.findOne({ _id: req.params.id }).populate({
      path: 'projects',          
      populate: { path: 'tasks' } 
    });
    
    if (!candidate) {
        return res.status(404).json({ message: 'Candidate not found' });
    }

    let totalTasks = 0;
    let tasksCompleted = 0;

    
    candidate.projects.forEach(project => {
        if (project.tasks && project.tasks.length > 0) {
            totalTasks += project.tasks.length;
            tasksCompleted += project.tasks.filter(task => task.status === 'Completed').length;
        }
    });

    // Calculate average completion rate across all projects
    const totalProjects = candidate.projects.length;
    const averageCompletionRate = totalProjects
        ? candidate.projects.reduce((acc, proj) => acc + (proj.completionRate || 0), 0) / totalProjects
        : 0;

    const performanceScore = totalTasks
        ? (tasksCompleted / totalTasks) * 100 + averageCompletionRate * 0.5
        : 0;

    res.json({
        name: candidate.username,
        email: candidate.email,
        totalTasks,
        tasksCompleted,
        projects: candidate.projects,
        overallProgress: Math.round(averageCompletionRate),
       performanceScore: Math.round(performanceScore),  
    });
  } catch (error) {
      console.log(error)
  }
});

router.get('/logout',function(req,res){
  try{
    res.cookie('')
    res.json("message : user logged out")
  }
  catch(err){
    console.log(err.message)
  }
});


module.exports = router;
