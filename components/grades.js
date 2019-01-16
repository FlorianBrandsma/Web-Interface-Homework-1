const express = require('express');
let router = express.Router();

let grades = [
    {
        grade: 0,
        studentId: 0,
        courseId: 0,
        id: 0
    }
];

router.get('/', (req, res) => res.json(grades));
router.post('/:courseId/:studentId', (req, res) => {

    let students = require('./students');
    let courses = require('./courses');

    const courseIndex = courses.array.findIndex(x => x.id == req.params.courseId);

    if(courseIndex != -1)
    {
        const studentIndex = students.array.findIndex(x => x.id == req.params.studentId);
        
        if(studentIndex != -1)
        {
            req.body.courseId = courses.array[courseIndex].id;
            req.body.studentId = students.array[studentIndex].id;

            req.body.id = IncrementId(grades);

            grades.push(req.body);

            res.send('OK');

        } else {
            res.send('Student does not exist');
        }

    } else {
        res.send('Course does not exist');
    }  
});

router.route('/:id')
    .get((req, res) => {

        const index = grades.findIndex(x => x.id == req.params.id);

        if(index != -1)
            res.send('Grade value: ' + grades[index].grade);
        else
            res.send('Grade does not exist');
    })
    .put((req, res) => {

        const index = grades.findIndex(x => x.id == req.params.id);

        if(index != -1)
        {
            res.send('Updated grade: ' + grades[index].grade);

            req.body.id = grades[index].id;
            grades[index] = req.body;    
        } else
            res.send('Grade does not exist');
    })
    .delete((req, res) => {

        const index = grades.findIndex(x => x.id == req.params.id);

        if(index != -1)
        {
            res.send('Deleted grade:' + grades[index].grade);
            grades.splice(index, 1);
        } else
            res.send('Grade does not exist');
    });

function IncrementId(array)
{
    if(array.length > 0)
        return array[array.length-1].id + 1;
    else 
        return 0;
}

module.exports = router;
module.exports.array = grades;