const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// Get all teachers
const getAllTeacher = async (req, res) => {
    // #swagger.tags = ['Teachers']
    try {
        const result = await mongodb.getDatabase().db().collection('teachers').find();
        const teachers = await result.toArray();
        res.status(200).json(teachers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get single teacher
const getSingleTeacher = async (req, res) => {
    // #swagger.tags = ['Teachers']
    try {
        const id = req.params.id;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid teacher ID' });
        }

        const teacherId = new ObjectId(id);
        const result = await mongodb.getDatabase().db().collection('teachers').find({ _id: teacherId });
        const teacher = (await result.toArray())[0];

        res.status(200).json(teacher);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create teacher
const createTeacher = async (req, res) => {
    // #swagger.tags = ['Teachers']
    try {
        const teacher = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            department: req.body.department,
            hireYear: req.body.hireYear,
            isTenured: req.body.isTenured,
            courses: req.body.courses
        };

        const response = await mongodb.getDatabase().db().collection('teachers').insertOne(teacher);

        if (response.acknowledged) {
            res.status(201).json({ message: 'Teacher created successfully' });
        } else {
            res.status(500).json({ message: 'Error creating teacher' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update teacher
const updateTeacher = async (req, res) => {
    // #swagger.tags = ['Teachers']
    try {
        const teacherId = new ObjectId(req.params.id);
        const teacher = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            department: req.body.department,
            hireYear: req.body.hireYear,
            isTenured: req.body.isTenured,
            courses: req.body.courses
        };

        const response = await mongodb.getDatabase().db().collection('teachers').replaceOne({ _id: teacherId }, teacher);

        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json({ message: 'Error updating teacher' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete teacher
const deleteTeacher = async (req, res) => {
    // #swagger.tags = ['Teachers']
    try {
        const teacherId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('teachers').deleteOne({ _id: teacherId });

        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json({ message: 'Error deleting teacher' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllTeacher,
    getSingleTeacher,
    createTeacher,
    updateTeacher,
    deleteTeacher
};