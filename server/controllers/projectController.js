import projectModel from "../models/projectModel.js";

// ** Add New Project
const addProject = async (req, res) => {
   try {
      // Validate required fields
      const requiredFields = [
         "title", "category", "pitch", "location",
         "overview", "problemSolution", "goal",
         "duration", "minInvestment", "impact"
      ];

      for (const field of requiredFields) {
         if (!req.body[field]) {
            return res.status(400).json({ success: false, message: `Missing required field: ${field}` });
         }
      }

      // Check if thumbnail is uploaded
      if (!req.file || !req.file.path) {
         return res.status(400).json({ success: false, message: "Project thumbnail is required." });
      }

      // Extract fields safely
      const {
         title, category, pitch,
         location, overview, problemSolution,
         goal, duration, minInvestment, impact
      } = req.body;

      // Cloudinary uploaded URL
      const thumbnail = req.file.path;

      // Create new Project instance
      const newProject = new projectModel({
         title: title.trim(),
         category: category.trim(),
         thumbnail,
         pitch: pitch.trim(),
         location: location.trim(),
         overview: overview.trim(),
         problemSolution: problemSolution.trim(),
         goal: Number(goal),
         duration: Number(duration),
         minInvestment: Number(minInvestment),
         impact: impact.trim(),
         creator: req.user._id
      });

      // Save to DB
      await newProject.save();

      return res.status(201).json({
         success: true,
         message: "Project created successfully",
         project: newProject
      });

   } catch (error) {
      console.error("Create Project Error:", error);
      return res.status(500).json({ success: false, message: "Internal server error." });
   }
};

// ** Get My Projects For Dashboard**
const myProjects = async (req, res) => {
   try {
      // Get user ID from request
      const userId = req.user._id;

      // Fetch projects created by the user in sorted order
      const projects = await projectModel
         .find({ creator: userId })
         .sort({ createdAt: -1 })
         .populate("creator", "fullName");

      if (!projects || projects.length === 0) {
         return res.status(404).json({ success: false, message: "No projects found." });
      }

      return res.status(200).json({
         success: true,
         message: "Projects fetched successfully",
         projects
      });
   } catch (error) {
      console.error("Get My Projects Error:", error);
      return res.status(500).json({ success: false, message: "Internal server error." });
   }
};



export {
   addProject, myProjects
};