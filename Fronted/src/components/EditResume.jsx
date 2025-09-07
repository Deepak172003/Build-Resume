import React, { useCallback, useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  AlertCircle,
  Download,
  Palette,
  Trash,
  ArrowLeft,
  Loader2,
} from "lucide-react";

import DashboardLayout from "./DashboardLayout";
import {
  containerStyles,
  buttonStyles,
  statusStyles,
} from "../assets/dummystyle";

import { Input } from "./Inputs" // FIXED HERE

import { API_PATHS } from "../utils/apiPaths";
import axiosInstance from "../utils/axiosInstance";
import { autoInstance } from "../utils/axiosAutoInstance";
import { toast } from "react-hot-toast";
import { fixTailwindColors } from "../utils/color";
import html2pdf from "html2pdf.js";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

import Modal from "./Modal";
import RenderResume from "./RenderResume";
import ThemeSelector from "./ThemeSelector";
import StepProgress from "./StepProgress";

// Resize Observer Hook
const useResizeObserver = () => {
  const [size, setSize] = useState({ width: 0, height: 0 });
  const observerRef = useRef(null);

  const ref = useCallback((node) => {
    if (observerRef.current) observerRef.current.disconnect();
    if (node) {
      observerRef.current = new ResizeObserver((entries) => {
        const { width, height } = entries[0].contentRect;
        setSize({ width, height });
      });
      observerRef.current.observe(node);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, []);

  return { ...size, ref };
};

const EditResume = () => {
  const { resumeId } = useParams();
  const navigate = useNavigate();
  const resumeDownloadRef = useRef(null);
  const thumbnailRef = useRef(null);

  const [openThemeSelector, setOpenThemeSelector] = useState(false);
  const [openPreviewModal, setOpenPreviewModal] = useState(false);
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const { width: previewWidth, ref: previewContainerRef } = useResizeObserver();

  const [resumeData, setResumeData] = useState({
    title: "Professional Resume",
    thumbnailLink: "",
    profileInfo: { fullName: "", designation: "", summary: "" },
    template: { theme: "modern", colorPalette: [] },
    contactInfo: {
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      github: "",
      website: "",
    },
    workExperience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: [],
    languages: [],
    interests: [],
  });

  useEffect(() => {
    const calculateCompletion = () => {
      let completedFields = 0;
      let totalFields = 5;

      if (resumeData.profileInfo.fullName) completedFields++;
      if (resumeData.profileInfo.designation) completedFields++;
      if (resumeData.profileInfo.summary) completedFields++;
      if (resumeData.contactInfo.email) completedFields++;
      if (resumeData.contactInfo.phone) completedFields++;

      const percentage = totalFields
        ? Math.round((completedFields / totalFields) * 100)
        : 0;
      setCompletionPercentage(percentage);
    };

    calculateCompletion();
  }, [resumeData]);

  const updateSection = (section, key, value) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  const fetchResumeDetailsById = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.RESUME.GET_BY_ID(resumeId)
      );
      if (response.data && response.data.profileInfo) {
        setResumeData((prev) => ({
          ...prev,
          ...response.data,
        }));
      }
    } catch (error) {
      console.error("Error fetching resume:", error);
      toast.error("Failed to load resume data");
    }
  };

  const uploadResumeImages = async () => {
    try {
      setIsLoading(true);
      const thumbnailElement = thumbnailRef.current;
      if (!thumbnailElement) throw new Error("Thumbnail element not found");
      const fixedThumbnail = fixTailwindColors(thumbnailElement);
      const thumbnailCanvas = await html2canvas(fixedThumbnail, {
        scale: 0.5,
        backgroundColor: "#FFFFFF",
        logging: false,
      });
      document.body.removeChild(fixedThumbnail);
      const thumbnailDataUrl = thumbnailCanvas.toDataURL("image/png");
      const thumbnailFile = dataURLtoFile(
        thumbnailDataUrl,
        `thumbnail-${resumeId}.png`
      );

      const formData = new FormData();
      formData.append("thumbnail", thumbnailFile);

      const uploadResponse = await axiosInstance.put(
        API_PATHS.RESUME.UPLOAD_IMAGES(resumeId),
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      const { thumbnailLink } = uploadResponse.data;
      await updateResumeDetails(thumbnailLink);
      toast.success("Resume Updated Successfully");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error Uploading Images:", error);
      toast.error("Failed to upload images");
    } finally {
      setIsLoading(false);
    }
  };

  const updateResumeDetails = async (thumbnailLink) => {
    try {
      setIsLoading(true);
      await axiosInstance.put(API_PATHS.RESUME.UPDATE(resumeId), {
        ...resumeData,
        thumbnailLink: thumbnailLink || "",
        completion: completionPercentage,
      });
    } catch (err) {
      console.error("Error updating resume:", err);
      toast.error("Failed to update resume details");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteResume = async () => {
    try {
      setIsLoading(true);
      await axiosInstance.delete(API_PATHS.RESUME.DELETE(resumeId));
      toast.success("Resume deleted successfully");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error deleting resume:", error);
      toast.error("Failed to delete resume");
    } finally {
      setIsLoading(false);
    }
  };

  const downloadPDF = async () => {
    const element = resumeDownloadRef.current;
    if (!element) {
      toast.error("Failed to generate PDF. Please try again.");
      return;
    }
    setIsDownloading(true);
    setDownloadSuccess(false);
    const toastId = toast.loading("Generating PDF...");

    try {
      await html2pdf()
        .set({
          margin: 0,
          filename: `${resumeData.title.replace(/[^a-z0-9]/gi, "_")}.pdf`,
          image: { type: "png", quality: 1.0 },
          html2canvas: {
            scale: 2,
            useCORS: true,
            backgroundColor: "#FFFFFF",
          },
          jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        })
        .from(element)
        .save();

      toast.success("PDF downloaded successfully!", { id: toastId });
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (err) {
      console.error("PDF error:", err);
      toast.error(`Failed to generate PDF: ${err.message}`, { id: toastId });
    } finally {
      setIsDownloading(false);
    }
  };

  useEffect(() => {
    if (resumeId) fetchResumeDetailsById();
  }, [resumeId]);

  return (
    <DashboardLayout>
      <div className={containerStyles.main}>
        <div className={containerStyles.header}>
          <Input
            value={resumeData.title}
            onChange={(e) =>
              setResumeData((prev) => ({ ...prev, title: e.target.value }))
            }
            label="Resume Title"
            placeholder="Enter resume title"
          />
          <div className="flex justify-center gap-3">
            <button
              onClick={() => setOpenThemeSelector(true)}
              className={buttonStyles.theme}
            >
              <Palette size={16} />
              <span className="text-sm">Theme</span>
            </button>
            <button
              onClick={handleDeleteResume}
              className={buttonStyles.delete}
            >
              <Trash size={16} />
              <span className="text-sm">Delete</span>
            </button>
            <button
              onClick={() => setOpenPreviewModal(true)}
              className={buttonStyles.download}
            >
              <Download size={16} />
              <span className="text-sm">Preview</span>
            </button>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-gray-600">
            Completion: {completionPercentage}%
          </p>
          {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}
        </div>

        <StepProgress progress={progress} />

        <div className="relative mt-6" ref={previewContainerRef}>
          <div className={containerStyles.previewInner}>
            <RenderResume
              key={`resume-${resumeData?.template?.theme}`}
              templateId={resumeData?.template?.theme || ""}
              resumeData={resumeData}
              containerWidth={previewWidth}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            className={buttonStyles.save}
            onClick={uploadResumeImages}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              "Save & Exit"
            )}
          </button>
        </div>
      </div>

      <Modal
        isOpen={openThemeSelector}
        onClose={() => setOpenThemeSelector(false)}
        title="Change Theme"
      >
        <div className={containerStyles.modalContent}>
          <ThemeSelector
            selectedTheme={resumeData?.template.theme}
            setSelectedTheme={(theme) =>
              setResumeData((prev) => ({
                ...prev,
                template: { theme, colorPalette: [] },
              }))
            }
            onClose={() => setOpenThemeSelector(false)}
          />
        </div>
      </Modal>

      <Modal
        isOpen={openPreviewModal}
        onClose={() => setOpenPreviewModal(false)}
        title={resumeData.title}
        showActionBtn
        actionBtnText={
          isDownloading
            ? "Generating..."
            : downloadSuccess
            ? "Downloaded"
            : "Download PDF"
        }
        onAction={downloadPDF}
        disabled={isDownloading}
      />
    </DashboardLayout>
  );
};

export default EditResume;
