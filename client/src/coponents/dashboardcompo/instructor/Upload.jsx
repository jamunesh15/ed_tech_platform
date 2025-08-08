


import { useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud, FiFile, FiVideo } from "react-icons/fi";
import { MdClose, MdFileUpload } from "react-icons/md";
import { useSelector } from "react-redux";

export default function Upload({
  name,
  label,
  register,
  setValue,
  errors,
  video = false,
  viewData = null,
  editData = null,
  disabled = false,
  required = true,
}) {
  const { course } = useSelector((state) => state.course);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(
    viewData ? viewData : editData ? editData : ""
  );
  const [isUploading, setIsUploading] = useState(false);
  const inputRef = useRef(null);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    console.log("=== DRAG DROP DEBUG ===");
    console.log("Dropped file:", file);
    console.log("Field name:", name);
    console.log("======================");
    
    if (file) {
      setIsUploading(true);
      previewFile(file);
      setSelectedFile(file);
      setValue(name, file); // Fix: Use file directly instead of FileList
      console.log("File set via setValue (drag):", file);
      console.log("Form validation status:", file ? "Valid" : "Invalid");
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: !video
      ? { "image/*": [".jpeg", ".jpg", ".png", ".webp"] }
      : { "video/*": [".mp4", ".mov", ".avi"] },
    onDrop,
    noClick: true,
    disabled: disabled,
    maxSize: video ? 100 * 1024 * 1024 : 10 * 1024 * 1024, // 100MB for video, 10MB for images
  });

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    console.log("=== FILE CHANGE DEBUG ===");
    console.log("Selected file:", file);
    console.log("File list:", e.target.files);
    console.log("Field name:", name);
    console.log("========================");
    
    if (file) {
      setIsUploading(true);
      previewFile(file);
      setSelectedFile(file);
      setValue(name, file); // Fix: Use file instead of e.target.files
      console.log("File set via setValue:", file);
      console.log("Form validation status:", file ? "Valid" : "Invalid");
    }
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
      setIsUploading(false);
    };
    reader.onerror = () => {
      setIsUploading(false);
    };
  };

  useEffect(() => {
    if (required) {
      register(name, { required: "This field is required" });
    } else {
      register(name);
    }
  }, [register, name, required]);

  useEffect(() => {
    if (viewData || editData) {
      setPreviewSource(viewData || editData);
    }
  }, [viewData, editData]);

  const handleRemoveFile = () => {
    setPreviewSource("");
    setSelectedFile(null);
    setValue(name, null);
    setIsUploading(false);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (disabled && !previewSource) {
    return null;
  }

  return (
    <div className="flex   flex-col space-y-2">
      {/* Label */}
      <label className="text-sm sm:text-base font-medium text-richblack-5" htmlFor={name}>
        {label} {required && !disabled && <sup className="text-pink-200">*</sup>}
      </label>

      {/* Upload Area */}
      <div
        className={`relative ${
          isDragActive ? "bg-richblack-600 border-yellow-50" : "bg-richblack-700"
        } flex min-h-[150px] cursor-pointer items-center justify-center rounded-lg border-2 border-dotted border-richblack-500 transition-all duration-300 hover:border-richblack-400 ${
          disabled ? "opacity-60 cursor-not-allowed" : ""
        } ${isDragActive ? "scale-[1.02]" : ""}`}
        {...getRootProps()}
      >
        {previewSource ? (
          <div className="flex w-full flex-col p-3">
            {/* Preview Content */}
            <div className="relative group">
              {!video ? (
                <div className="relative">
                  <img
                    src={previewSource}
                    alt="Preview"
                    className="h-32 w-full rounded-lg object-cover shadow-lg"
                  />
                  {!disabled && (
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveFile();
                        }}
                        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors"
                      >
                        <MdClose size={16} />
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="relative">
                  <video 
                    controls 
                    className="h-32 w-full rounded-lg object-cover shadow-lg"
                  >
                    <source src={previewSource} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  {!disabled && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveFile();
                      }}
                      className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full transition-colors"
                    >
                      <MdClose size={12} />
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* File Info */}
            {selectedFile && (
              <div className="mt-2 p-2 bg-richblack-600 rounded-lg">
                <div className="flex items-center gap-2">
                  {video ? (
                    <FiVideo className="text-blue-400 text-sm flex-shrink-0" />
                  ) : (
                    <FiFile className="text-green-400 text-sm flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-richblack-50 text-xs font-medium truncate">
                      {selectedFile.name}
                    </p>
                    <p className="text-richblack-300 text-xs">
                      {formatFileSize(selectedFile.size)}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Remove Button */}
            {!disabled && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveFile();
                }}
                className="mt-2 text-red-400 hover:text-red-300 text-xs font-medium transition-colors self-start"
              >
                Remove File
              </button>
            )}
          </div>
        ) : (
          <div className="flex w-full flex-col items-center p-3 text-center">
            <input
              {...getInputProps()}
              type="file"
              ref={inputRef}
              onChange={handleFileChange}
              className="hidden"
              accept={video ? "video/*" : "image/*"}
              disabled={disabled}
            />
            
            {!disabled && (
              <>
                {/* Upload Icon */}
                <div 
                  className="grid aspect-square w-12 place-items-center rounded-full bg-richblack-600 hover:bg-richblack-500 transition-colors mb-3 cursor-pointer"
                  onClick={() => !disabled && inputRef.current?.click()}
                >
                  {isUploading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-yellow-50"></div>
                  ) : (
                    <FiUploadCloud className="text-lg text-yellow-50" />
                  )}
                </div>

                {/* Upload Text */}
                <div className="space-y-2">
                  <p 
                    className="max-w-[200px] text-xs text-richblack-200 cursor-pointer"
                    onClick={() => !disabled && inputRef.current?.click()}
                  >
                    Drag and drop {!video ? "an image" : "a video"}, or{" "}
                    <span className="font-semibold text-yellow-50 hover:text-yellow-100 transition-colors">
                      click to browse
                    </span>
                  </p>

                  {/* File Requirements */}
                  <ul className="flex flex-wrap justify-center gap-2 text-xs text-richblack-400">
                    <li>• Max 100MB</li>
                    {video ? (
                      <li>• MP4 format</li>
                    ) : (
                      <li>• JPG, PNG</li>
                    )}
                  </ul>
                </div>
              </>
            )}
          </div>
        )}

        {/* Drag Overlay */}
        {isDragActive && (
          <div className="absolute inset-0 bg-yellow-400/20 border-2 border-yellow-400 border-dashed rounded-lg flex items-center justify-center">
            <div className="text-yellow-50 text-center">
              <FiUploadCloud className="text-3xl sm:text-4xl mx-auto mb-2" />
              <p className="text-sm sm:text-base font-medium">Drop your {video ? "video" : "image"} here!</p>
            </div>
          </div>
        )}
      </div>

      {/* Error Message */}
      {errors[name] && (
        <div className="flex items-center gap-2 text-pink-200">
          <span className="text-xs sm:text-sm">⚠️</span>
          <span className="text-xs sm:text-sm">
            {errors[name].message || `${label} is required`}
          </span>
        </div>
      )}
    </div>
  );
}
