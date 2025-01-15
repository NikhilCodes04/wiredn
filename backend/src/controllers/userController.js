const User = require('../models/userModel');

// Retrieve all students
const getAllStudents = async (req, res) => {
    try {
        const students = await User.find({ role: 'student' });
        res.status(200).json({ message: 'Students retrieved successfully', students });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving students', error: error.message });
    }
};



// Retrieve all mentors
const getAllMentors = async (req, res) => {
    try {
        const mentors = await User.find({ role: 'mentor' });
        res.status(200).json({ message: 'Mentors retrieved successfully', mentors });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving mentors', error: error.message });
    }
};

// Search for mentors based on tech stack
const searchMentorsByTechStack = async (req, res) => {
    try {
        const { techStack } = req.body; // techStack should be an array of skills to match

        const mentors = await User.find({
            role: 'mentor',
            technologicalStack: { $in: techStack }
        });

        if (mentors.length === 0) {
            return res.status(404).json({ message: 'No mentors found with the specified tech stack' });
        }

        res.status(200).json({ message: 'Mentors retrieved successfully', mentors });
    } catch (error) {
        res.status(500).json({ message: 'Error searching for mentors', error: error.message });
    }
};

// Search for students based on tech stack (for teammate matching)
const searchStudentsByTechStack = async (req, res) => {
    try {
        const { techStack } = req.body; // techStack should be an array of skills to match

        const students = await User.find({
            role: 'student',
            technologicalStack: { $in: techStack }
        });

        if (students.length === 0) {
            return res.status(404).json({ message: 'No students found with the specified tech stack' });
        }

        res.status(200).json({ message: 'Students retrieved successfully', students });
    } catch (error) {
        res.status(500).json({ message: 'Error searching for students', error: error.message });
    }
};

module.exports = {
    getAllStudents,
    getAllMentors,
    searchMentorsByTechStack,
    searchStudentsByTechStack
};
