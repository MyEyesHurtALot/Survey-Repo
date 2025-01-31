const mongoose = require('mongoose')
const Schema = mongoose.Schema

const surveySchema = new Schema(
    {
        q1:{type:String,  required: true},
        q2:{type:String,  required: true},
        q3:{type:String,  required: true},
        q4:{type:String,  required: true},
        q5:{type:String,  required: true},
        q6:{type:String,  required: true},
        q7:{type:String,  required: true},
        q8:{type:String,  required: true},
        q9:{type:String,  required: true},
        q10:{type:String, required: true},
        q11:{type:String, required: true},
        q12:{type:String, required: true},
        entryDate: {type:Date, default:Date.now}
    }
)

const Survey = mongoose.model('Survey', surveySchema, 'survey')
const mySchemas = {'Survey':Survey}

module.exports = mySchemas