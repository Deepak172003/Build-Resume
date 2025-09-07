import fs from 'fs';
import path from 'path';
import multer from 'multer';
import Resume from '../models/resumeModel.js';

// ==========================
// Multer setup for uploads
// ==========================
const uploadsFolder = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsFolder)) {
  fs.mkdirSync(uploadsFolder);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsFolder);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

export const upload = multer({ storage });

// ==========================
// Create a new resume
// ==========================
export const createResume = async (req, res) => {
  try {
    const { title } = req.body;

    const defaultResumeData = {
      profileInfo: {
        profileImg: null,
        previewUrl: '',
        fullName: '',
        designation: '',
        summary: '',
      },
      contactInfo: {
        email: '',
        phone: '',
        location: '',
        linkedin: '',
        github: '',
        website: '',
      },
      workExperience: [
        { company: '', role: '', startDate: '', endDate: '', description: '' },
      ],
      education: [
        { degree: '', institution: '', startDate: '', endDate: '' },
      ],
      skills: [{ name: '', progress: 0 }],
      projects: [
        { title: '', description: '', github: '', liveDemo: '' },
      ],
      certifications: [{ title: '', issuer: '', year: '' }],
      languages: [{ name: '', progress: '' }],
      interests: [''],
    };

    const newResume = await Resume.create({
      userId: req.user._id,
      title,
      ...defaultResumeData,
      ...req.body,
    });

    res.status(201).json(newResume);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// ==========================
// Get all resumes for a user
// ==========================
export const getResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.user._id }).sort({
      updatedAt: -1,
    });
    res.json(resumes);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get resumes', error: error.message });
  }
};

// ==========================
// Get a resume by ID
// ==========================
export const getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    res.json(resume);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get resume', error: error.message });
  }
};

// ==========================
// Update a resume by ID
// ==========================
export const updateResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    Object.assign(resume, req.body);

    const updatedResume = await resume.save();
    res.json(updatedResume);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update resume', error: error.message });
  }
};

// ==========================
// Delete a resume by ID
// ==========================
export const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    // Delete thumbnail
    if (resume.thumbnailLink) {
      const oldThumbnail = path.join(uploadsFolder, path.basename(resume.thumbnailLink));
      if (fs.existsSync(oldThumbnail)) fs.unlinkSync(oldThumbnail);
    }

    // Delete profile image
    if (resume.profileInfo?.previewUrl) {
      const oldProfile = path.join(uploadsFolder, path.basename(resume.profileInfo.previewUrl));
      if (fs.existsSync(oldProfile)) fs.unlinkSync(oldProfile);
    }

    await Resume.findOneAndDelete({ _id: req.params.id, userId: req.user._id });

    res.json({ message: 'Resume deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete resume', error: error.message });
  }
};

// ==========================
// Upload resume image
// ==========================
export const uploadResumeImage = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const baseUrl = `${req.protocol}://${req.get('host')}/uploads/`;

    resume.profileInfo.profileImg = req.file.filename;
    resume.profileInfo.previewUrl = `${baseUrl}${req.file.filename}`;

    const updatedResume = await resume.save();

    res.json({
      message: 'Image uploaded successfully',
      resume: updatedResume,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to upload image', error: error.message });
  }
};
