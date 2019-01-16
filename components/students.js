const express = require('express');
let router = express.Router();

let students = [
    {
        name: "",
        address: "",
        class: "",
        id: 0
    }
];

router.get('/', (req, res) => res.json(students));
router.post('/', (req, res) => {

    req.body.id = IncrementId(students);

    students.push(req.body);
    res.send('OK');
});

router.route('/:id')
    .get((req, res) => {

        const index = students.findIndex(x => x.id == req.params.id);

        if(index != -1)
            res.send('You must be ' + students[index].name);
        else
            res.send('Student does not exist');
    })
    .put((req, res) => {

        const index = students.findIndex(x => x.id == req.params.id);

        if(index != -1)
        {
            res.send('Updated ' + students[index].name);

            req.body.id = students[index].id;
            students[index] = req.body;    
        } else
            res.send('Student does not exist');
    })
    .delete((req, res) => {

        const studentIndex = students.findIndex(x => x.id == req.params.id);
        
        let output = "";

        if(studentIndex != -1)
        {
            let grades = require('./grades');
            const gradeIndex = grades.array.findIndex(x => x.studentId == students[studentIndex].id);

            if(gradeIndex != -1)
            {
                output += " and its grade: " + grades.array[gradeIndex].grade;
                grades.array.splice(gradeIndex, 1);
            }

            res.send('Deleted ' + students[studentIndex].name + output);
            students.splice(studentIndex, 1);
        } else
            res.send('Student does not exist');
    });

function IncrementId(array)
{
    if(array.length > 0)
        return array[array.length-1].id + 1;
    else 
        return 0;
}

module.exports = router;
module.exports.array = students;
