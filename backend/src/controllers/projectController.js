const Project = require('../models/projectModel');
const User = require('../models/userModel');

// Add Project function
const addProject = async (req, res) => {
    try {
        const { name, description, technologies = [], teamMembers = [], endDate } = req.body;

        // Ensure required fields are provided
        if (!name || !description) {
            return res.status(400).json({ message: 'Name and description are required fields.' });
        }

        // Ensure the technologies array doesn't exceed the allowed limit
        if (technologies.length > 10) {
            return res.status(400).json({ message: 'A project can have at most 10 technologies.' });
        }

        // Validate team members only if they are provided
        if (teamMembers.length > 0) {
            const membersExist = await User.find({ _id: { $in: teamMembers } });
            if (membersExist.length !== teamMembers.length) {
                return res.status(404).json({ message: 'Some team members do not exist.' });
            }
        }

        // Create the project object
        const newProject = new Project({
            name,
            description,
            technologies,
            teamMembers: teamMembers, // Will be an empty array if not provided
            createdBy: req.user.id, // Authenticated user's ID is stored in req.user
            endDate,
        });

        // Save the project to the database
        const savedProject = await newProject.save();

        res.status(201).json({
            message: 'Project created successfully.',
            project: savedProject,
        });
    } catch (err) {
        console.error('Error creating project:', err.message);
        res.status(500).json({ message: 'Error creating project.', error: err.message });
    }
};



// Get all projects function
const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find()
            .populate('mentor', 'name email') // Populates mentor details
            .populate('createdBy', 'name email') // Populates creator details
            .populate('teamMembers', 'name email'); // Populates team member details

        res.status(200).json({ projects });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching projects.' });
    }
};

// Get a specific project by ID
const getProjectById = async (req, res) => {
    try {
        const { id } = req.params;
        const project = await Project.findById(id)
            .populate('mentor', 'name email')
            .populate('createdBy', 'name email')
            .populate('teamMembers', 'name email');

        if (!project) {
            return res.status(404).json({ message: 'Project not found.' });
        }

        res.status(200).json({ project });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching project.' });
    }
};

module.exports = {
    addProject,
    getAllProjects,
    getProjectById,
};
