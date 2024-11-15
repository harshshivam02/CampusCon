// advice.routes.js

import express from 'express';
import { getCareerAdvice } from '../controllers/adviceController.js';

const router = express.Router();

router.post('/', getCareerAdvice);

export default router;
