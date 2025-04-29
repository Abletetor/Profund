import express from 'express';
import { registerUser, loginUser, updateProfile, getUserProfile } from '../controllers/userController.js';
import upload from '../middlewares/multer.js';
import authUser from '../middlewares/authUser.js';
import { addProject, creatorDashboard, getAllProjects, myProjects, viewProject } from '../controllers/projectController.js';
import uploadProfileImage from '../middlewares/profileUpload.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);

userRouter.get('/creator/dashboard', authUser, creatorDashboard);
userRouter.get('/my-projects', authUser, myProjects);
userRouter.post('/add-project', authUser, upload.single('thumbnail'), addProject);
userRouter.get('/profile', authUser, getUserProfile);
userRouter.post('/update-profile', uploadProfileImage.single('profileImage'), authUser, updateProfile);

userRouter.get('/projects', getAllProjects);
userRouter.get('/projects/:id', authUser, viewProject);

export default userRouter;