import fs from 'fs';
import path from 'path';
import Resume from '../models/resumeModel.js';
import upload from '../middleware/uploadMiddleware.js';

export const uploadProfileImage = async (req, res) => {
  try {
    upload.fields([{ name: 'thumbnail' }, { name: 'profileImage' }])(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: 'File upload failed', error: err.message });
      }

      const resumeId = req.params.id;
      const resume = await Resume.findOne({ _id: resumeId, userId: req.user._id });

      if (!resume) {
        return res.status(404).json({ message: 'Resume not found' });
      }

      const uploadFolder = path.join(process.cwd(), 'uploads');
      const baseUrl = `${req.protocol}://${req.get('host')}/uploads/`;

      const newThumbnail = req.files.thumbnail?.[0];
      const newProfileImage = req.files.profileImage?.[0];

      // Handle thumbnail upload
      if (newThumbnail) {
        if (resume.thumbnailLink) {
          const oldThumbnail = path.join(uploadFolder, path.basename(resume.thumbnailLink));
          if (fs.existsSync(oldThumbnail)) {
            fs.unlinkSync(oldThumbnail);
          }
        }
        resume.thumbnailLink = `${baseUrl}${newThumbnail.filename}`;
      }

      // Handle profile image upload
      if (newProfileImage) {
        if (resume.profileInfo?.profilePreviewUrl) {
          const oldProfile = path.join(uploadFolder, path.basename(resume.profileInfo.profilePreviewUrl));
          if (fs.existsSync(oldProfile)) {
            fs.unlinkSync(oldProfile);
          }
        }
        resume.profileInfo.profilePreviewUrl = `${baseUrl}${newProfileImage.filename}`;
      }

      await resume.save();

      res.status(200).json({
        message: 'Images uploaded successfully',
        thumbnailLink: resume.thumbnailLink,
        profilePreviewUrl: resume.profileInfo.profilePreviewUrl,
      });
    });
  } catch (error) {
    res.status(500).json({ message: 'Image upload failed', error: error.message });
  }
};
