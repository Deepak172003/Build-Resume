import mongoose from 'mongoose';

const ResumeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  thumbnailLink: { type: String },
  template: { type: String },
  colorPalette: [String],
  ProfileInfo: {
    profilePreview: String,
    designation: String,
    summary: String,
  },
  contactInfo: {
    email: String,
    phone: String,
    location: String,
    linkedin: String,
    github: String,
    website: String,
  },
  // work experience
  workExperience: [
    {
      jobTitle: String,
      company: String,
      location: String,
      startDate: Date,
      endDate: Date,
      description: String,
    },
  ],
  // education
  education: [
    {
      degree: String,
      institution: String,
      location: String,
      startDate: Date,
      endDate: Date,
      description: String,
    },
  ],
  // skills
  skills: [
    {
      name: String,
      progress: String,
    },
  ],
  // projects
  projects: [
    {
      title: String,
      description: String,
      github: String,
      liveDemo: [String],
    },
  ],
  // certifications
  certifications: [
    {
      title: String,
      issuingOrganization: String,
      year: String,
    },
  ],
  // languages
  languages: [
    {
      name: String,
      progress: Number,
    },
  ],
  // interests
  interests: [String],
}, {
  timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
});

export default mongoose.model('Resume', ResumeSchema);