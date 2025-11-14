const validator = require('../helpers/validate');

// Middleware to validate student data
const saveStudent = (req, res, next) => {
    const validationRules = {
        firstName: 'required|string',
        lastName: 'required|string',
        age: 'required|integer|min:0',
        email: 'required|email',
        major: 'required|string',
        gpa: 'required|numeric|min:0|max:4',
        enrollmentYear: 'required|integer|min:1900|max:2100',
        isFullTime: 'required|boolean',
        courses: 'array'
    };
    validator(req.body, validationRules, {}, (err, status) => {
        if (!status) {
            res.status(400).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};


// Middleware to validate teacher data
const saveTeacher = (req, res, next) => {
    const validationRules = {
        firstName: 'required|string',
        lastName: 'required|string',
        email: 'required|email',
        department: 'required|string',
        hireYear: 'required|integer|min:1900|max:2100',
        isTenured: 'required|boolean',
        courses: 'array'
    };

    validator(req.body, validationRules, {}, (err, status) => {
        if (!status) {
            return res.status(400).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        }
        next();
    });
};

module.exports = {
    saveStudent,
    saveTeacher
};