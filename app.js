const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config();

const db = require('./config/mongoose-connection');
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const taskRoutes = require('./routes/taskRoutes');

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({ origin: 'https://projectmanage-f.onrender.com/' }));
app.use('/api/auth',authRoutes);
app.use('/api/projects',projectRoutes);
app.use('/api/tasks',taskRoutes);

app.listen(3000);
