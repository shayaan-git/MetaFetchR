import { Router } from 'express';
import { asyncHandler } from '../middlewares/errorHandler.js';
import {
    createWebsite,
    listWebsites,
    getWebsite,
    updateWebsite,
    deleteWebsite
} from '../controllers/websiteController.js'

const router = Router();

// POST /api/websites   -> create a row
router.post('/', asyncHandler(createWebsite));

// GET /api/websites    -> list rows
router.get('/', asyncHandler(listWebsites));

// GET /api/websites/:id    -> fetch single row
router.get('/:id', asyncHandler(getWebsite));

// PUT /api/websites/:id    -> update single row
router.put('/:id', asyncHandler(updateWebsite));

// DELETE /api/websites/:id    -> delete single row
router.delete('/:id', asyncHandler(deleteWebsite));

export default router;
