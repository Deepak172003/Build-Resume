import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { 
  createResume, 
  getResumes, 
  getResumeById, 
  updateResume, 
  deleteResume, 
  uploadResumeImage, 
  upload 
} from '../controllers/resumecontroller.js';

const router = express.Router();

// Create a resume
router.post('/', protect, createResume);

// Get all resumes for logged-in user
router.get('/', protect, getResumes);

// Get a resume by ID
router.get('/:id', protect, getResumeById);

// Update a resume by ID
router.put('/:id', protect, updateResume);

// Upload **thumbnail + profileImage** in a single request
router.put(
  '/:id/upload-images',
  protect,
  upload.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'profileImage', maxCount: 1 },
  ]),
  uploadResumeImage
);

// Delete a resume
router.delete('/:id', protect, deleteResume);

export default router;
