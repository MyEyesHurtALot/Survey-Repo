const express = require('express')
const router = express.Router()
const schemas = require('../models/schemas')


router.use(express.json())

router.post('/', async(req, res) => {
    const {q1,q2,q3,q4,q5,q6,q7,q8,q9,q10,q11,q12} = req.body;
    const surveyData = {q1:q1, q2:q2, q3:q3, q4:q4, q5:q5, q6:q6, q7:q7, q8:q8, q9:q9, q10:q10, q11:q11, q12:q12};
    const newSurvey = new schemas.Survey(surveyData);
    try {
        const saveSurvey = await newSurvey.save();
        if(saveSurvey){
            res.send('Message Sent. Thank you');
        }
        res.end()
    } catch(err) {
        console.error(err);
        res.status(500).send('An error occurred while saving the survey');
    }
});

module.exports = router