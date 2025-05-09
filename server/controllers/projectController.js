import projectModel from "../models/projectModel.js";

// ** Add New Project
const addProject = async (req, res) => {
   try {
      // Validate required fields
      const requiredFields = [
         "title", "category", "pitch", "location",
         "overview", "problemSolution", "goal",
         "duration", "minInvestment", "impact",
         "returnRate", "repaymentPeriod"
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
         goal, duration, minInvestment, impact,
         returnRate, repaymentPeriod
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
         creator: req.user._id,
         returnRate: Number(returnRate),
         repaymentPeriod: Number(repaymentPeriod)
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
const myProject = async (req, res) => {
   try {
      // Get user ID from request
      const userId = req.user._id;

      // Fetch projects created by the user in sorted order
      const projects = await projectModel
         .find({ creator: userId })
         .sort({ createdAt: -1 })
         .populate("creator", "fullName");

      // Enhance each project with computed values
      const enhancedProjects = projects.map(project => {
         const createdAt = new Date(project.createdAt);
         const duration = project.duration;
         const endDate = new Date(createdAt);
         endDate.setDate(createdAt.getDate() + duration);

         const now = new Date();
         const daysLeft = Math.max(0, Math.ceil((endDate - now) / (1000 * 60 * 60 * 24)));

         const amountRaised = project.currentFunding || 0;
         const percentageFunded = project.goal
            ? Math.min((amountRaised / project.goal) * 100, 100).toFixed(0)
            : "0";

         return {
            ...project.toObject(),
            daysLeft,
            amountRaised,
            percentageFunded
         };
      });

      return res.status(200).json({
         success: true,
         message: "Projects fetched successfully",
         projects: enhancedProjects
      });
   } catch (error) {
      console.error("Get My Projects Error:", error);
      return res.status(500).json({ success: false, message: "Internal server error." });
   }
};

// Creator Dashboard
const creatorDashboard = async (req, res) => {
   try {
      const userId = req.user._id;

      const projects = await projectModel.find({ creator: userId });

      const now = new Date();
      let totalRaised = 0;
      let totalInvestorsSet = new Set();
      let completedCampaigns = 0;
      let activeCampaigns = 0;

      for (const project of projects) {
         totalRaised += project.currentFunding || 0;

         project.investors.forEach(inv => {
            totalInvestorsSet.add(inv.investor.toString());
         });

         const createdAt = new Date(project.createdAt);
         const daysPassed = Math.floor((now - createdAt) / (1000 * 60 * 60 * 24));
         const isFullyFunded = project.currentFunding >= project.goal;
         const isTimeOver = daysPassed >= project.duration;

         if (isFullyFunded || isTimeOver) {
            completedCampaigns++;
         } else {
            activeCampaigns++;
         }
      }

      const totalProjects = projects.length;
      const totalInvestors = totalInvestorsSet.size;
      const averageFunding = totalProjects > 0 ? totalRaised / totalProjects : 0;

      const dashStats = {
         totalProjects,
         totalRaised,
         activeCampaigns,
         completedCampaigns,
         totalInvestors,
         averageFunding,
      };

      return res.status(200).json({ success: true, dashStats });
   } catch (error) {
      console.error("Creator Dashboard Error:", error);
      return res.status(500).json({ success: false, message: "Internal server error." });
   }
};



// **Get All Project for Frontend**
const getAllProjects = async (req, res) => {
   try {
      const projects = await projectModel
         .find()
         .populate("creator", "fullName")
         .sort({ createdAt: -1 });

      if (!projects || projects.length === 0) {
         return res.status(404).json({ success: false, message: "No projects found." });
      }

      // Enhance each project with computed values
      const enhancedProjects = projects.map(project => {
         const createdAt = new Date(project.createdAt);
         const duration = project.duration;
         const endDate = new Date(createdAt);
         endDate.setDate(createdAt.getDate() + duration);

         const now = new Date();
         const daysLeft = Math.max(0, Math.ceil((endDate - now) / (1000 * 60 * 60 * 24)));

         const amountRaised = project.currentFunding || 0;
         const percentageFunded = project.goal
            ? Math.min((amountRaised / project.goal) * 100, 100).toFixed(0)
            : "0";

         return {
            ...project.toObject(),
            daysLeft,
            amountRaised,
            percentageFunded,
            investorCount: project.investors?.length || 0
         };
      });

      return res.status(200).json({
         success: true,
         message: "Projects fetched successfully",
         projects: enhancedProjects
      });

   } catch (error) {
      console.error("Get All Projects Error:", error);
      return res.status(500).json({ success: false, message: "Internal server error." });
   }
};

const viewProject = async (req, res) => {
   try {
      const projectId = req.params.id;

      // Validate MongoDB ObjectId format
      if (!projectId.match(/^[0-9a-fA-F]{24}$/)) {
         return res.status(400).json({ success: false, message: 'Invalid project ID' });
      }

      // Find project and populate creator's name and bio
      const project = await projectModel.findById(projectId).populate('creator', 'fullName bio imageUrl twitter linkedin');

      if (!project) {
         return res.status(404).json({ success: false, message: 'Project not found' });
      }

      // Compute enhancements
      const createdAt = new Date(project.createdAt);
      const endDate = new Date(createdAt);
      endDate.setDate(createdAt.getDate() + project.duration);

      const now = new Date();
      const daysLeft = Math.max(0, Math.ceil((endDate - now) / (1000 * 60 * 60 * 24)));

      const amountRaised = project.currentFunding || 0;
      const percentageFunded = project.goal
         ? Math.min((amountRaised / project.goal) * 100, 100).toFixed(0)
         : "0";

      const enhancedProject = {
         ...project.toObject(),
         daysLeft,
         amountRaised,
         percentageFunded,
         investorCount: project.investors?.length || 0
      };

      return res.status(200).json({
         success: true,
         message: "Project fetched successfully",
         project: enhancedProject
      });

   } catch (error) {
      console.error('Error fetching project:', error);
      res.status(500).json({ success: false, message: 'Server error while fetching project' });
   }
};

// ** Get Project By Id
const getProjectById = async (req, res) => {
   try {
      const project = await projectModel.findById(req.params.id);
      if (!project) {
         return res.status(404).json({ success: false, message: "Project not found" });
      }
      res.json({ success: true, project });
   } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: "Server error" });
   }
};

// **Update Project
const editProject = async (req, res) => {
   try {
      const projectId = req.params.id;
      const userId = req.user._id;

      let project = await projectModel.findOne({ _id: projectId, creator: userId });
      if (!project) {
         return res.status(404).json({ success: false, message: 'Project not found or unauthorized' });
      }

      const {
         title, category, pitch, location,
         overview, problemSolution, goal,
         duration, minInvestment, impact,
         returnRate, repaymentPeriod
      } = req.body;

      // Update fields if provided
      if (title) project.title = title;
      if (category) project.category = category;
      if (pitch) project.pitch = pitch;
      if (location) project.location = location;
      if (overview) project.overview = overview;
      if (problemSolution) project.problemSolution = problemSolution;
      if (goal) project.goal = goal;
      if (duration) project.duration = duration;
      if (minInvestment) project.minInvestment = minInvestment;
      if (impact) project.impact = impact;
      if (returnRate) project.returnRate = returnRate;
      if (repaymentPeriod) project.repaymentPeriod = repaymentPeriod;

      // Thumbnail update
      if (req.file) {
         project.thumbnail = req.file.path;
      }

      await project.save();

      return res.status(200).json({ success: true, message: 'Project updated successfully', project });

   } catch (error) {
      console.error("Edit Project Error:", error);
      return res.status(500).json({ success: false, message: 'Server error while updating project' });
   }
};


// ** Export all controllers **
export {
   addProject, myProject, getAllProjects,
   creatorDashboard, viewProject, editProject,
   getProjectById,
};