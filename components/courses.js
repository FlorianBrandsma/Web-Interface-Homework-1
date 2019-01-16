const express = require('express');
let router = express.Router();

let courses = [
    {
        name: "",
        description: "",
        id: 0
    }
];

router.get('/', (req, res) => res.json(courses));
router.post('/', (req, res) => {

    req.body.id = IncrementId(courses);

    courses.push(req.body);
    res.send('OK');
});

router.route('/:id')
    .get((req, res) => {

        const index = courses.findIndex(x => x.id == req.params.id);

        if(index != -1)
            res.send('Found ' + courses[index].name);
        else
            res.send('Course does not exist');
    })
    .put((req, res) => {

        const index = courses.findIndex(x => x.id == req.params.id);

        if(index != -1)
        {
            res.send('Updated ' + courses[index].name);

            req.body.id = courses[index].id;
            courses[index] = req.body;    
        } else
            res.send('Course does not exist');
    })
    .delete((req, res) => {

        const courseIndex = courses.findIndex(x => x.id == req.params.id);

        let output = "";

        if(courseIndex != -1)
        {
            let grades = require('./grades');
            const gradeIndex = grades.array.findIndex(x => x.courseId == courses[courseIndex].id);

            if(gradeIndex != -1)
            {
                output += " and its grade: " + grades.array[gradeIndex].grade;
                grades.array.splice(gradeIndex, 1);
            }

            res.send('Deleted ' + courses[courseIndex].name + output);

            courses.splice(courseIndex, 1);
        } else
            res.send('Course does not exist');
    });

function IncrementId(array)
{
    if(array.length > 0)
        return array[array.length-1].id + 1;
    else 
        return 0;
}

module.exports = router;
module.exports.array = courses;
