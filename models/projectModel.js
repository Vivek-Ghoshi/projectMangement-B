const mongoose = require('mongoose');


const projectSchema = mongoose.Schema({
    title:{
        type:String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    completionRate: { type: Number, default: 0 } ,
    assignTo:{
         type: mongoose.Schema.Types.ObjectId,
         ref:'user',
         required: true
    },
    status:{
        type: String,
        enum:['Pending','Accepted','Completed'],
        default: 'Pending',
    },
    tasks:[{
        title: String,
        status:{
            type:String,
            enum:['Pending','In progress','Completed'],
            default:'Pending'
        },
    }],
    progress:{
        type:Number,
        default: 0
    },
    priority:{
        type: String,
        enum:['high','medium','low'],
        default: 'medium',
    },
    deadline: Date,
    time: String,
    completionRate: { type: Number, default: 0 }

},{timestamps: true});

module.exports = mongoose.model('projects',projectSchema);