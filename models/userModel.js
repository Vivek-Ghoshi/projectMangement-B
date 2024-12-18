const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: String,
    email : {
        type:String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        enum:['candidate','admin'],
        default: 'candidate'
    },
    
    projects: [ {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'projects',
        }
    ],
    performanceScore: { type: Number, default: 0 }
},{timestamps: true});

module.exports = mongoose.model('user',userSchema);