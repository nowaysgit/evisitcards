import express from 'express';
import UserRoute from "./UserRoute";
import ServiceRoute from "./ServiceRoute";
import UserServiceRoute from "./UserServiceRoute";


const router = express.Router();

router.use('/user', UserRoute)
router.use('/service', ServiceRoute)
router.use('/user-service', UserServiceRoute)

export default router