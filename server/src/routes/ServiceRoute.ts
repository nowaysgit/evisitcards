import express from 'express';
import controller from '../controllers/ServiceController'
import AuthMiddleware from "../middleware/AuthMiddleware";
import CheckRoleMiddleware from "../middleware/CheckRoleMiddleware";

const router = express.Router();

router.post('/create', CheckRoleMiddleware('ADMIN'), controller.Create)
router.get('/', controller.GetAll)
router.get('/:id', controller.GetById)

export default router