"use client";

import { FaFileAlt, FaFileAudio, FaFilePdf, FaFileVideo } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { MdDelete } from "react-icons/md";

const { useTranslation } = require("@/app/providers/Transslations");
const { useState } = require("react");

const FilesSection = ({ files, onRemove }) => {
  const { translate } = useTranslation();
  const [hoveredFile, setHoveredFile] = useState(null);

  const getFileType = (file) => {
    if (!file.type) {
      const extension = file.url?.split(".").pop()?.toLowerCase();
      if (["jpeg", "jpg", "gif", "png", "webp", "svg"].includes(extension)) {
        return "image";
      } else if (extension === "pdf") {
        return "pdf";
      } else if (["mp4", "webm", "ogg"].includes(extension)) {
        return "video";
      } else if (["mp3", "wav", "ogg"].includes(extension)) {
        return "audio";
      }
      return "other";
    }

    if (file.type.startsWith("image/")) return "image";
    if (file.type === "application/pdf") return "pdf";
    if (file.type.startsWith("video/")) return "video";
    if (file.type.startsWith("audio/")) return "audio";
    return "other";
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  if (!files || files.length === 0) return null;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
      {files.map((file) => {
        const fileType = getFileType(file);
        const fileName = file.url?.split("/").pop() || "file";
        const fileSize = file.size ? formatFileSize(file.size) : "";

        return (
          <div
            key={file.id}
            className="relative group bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow"
            onMouseEnter={() => setHoveredFile(file.id)}
            onMouseLeave={() => setHoveredFile(null)}
          >
            {/* Delete button - shown on hover */}
            {onRemove && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onRemove(file.id);
                }}
                className={`absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 z-10 transition-opacity animation ${
                  hoveredFile === file.id ? "opacity-100" : "opacity-0"
                }`}
                title={translate("btns.delete_file")}
              >
                <MdDelete className="text-3xl" />
              </button>
            )}

            <a
              href={file.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col h-full"
            >
              {/* File preview/icon */}
              <div className="flex-1 flex items-center justify-center  bg-gray-50 dark:bg-gray-700">
                {fileType === "image" ? (
                  <img
                    src={file.url}
                    alt={fileName}
                    className="w-full h-32 object-cover"
                  />
                ) : fileType === "pdf" ? (
                  <FaFilePdf className="text-red-500 text-4xl" />
                ) : fileType === "video" ? (
                  <FaFileVideo className="text-blue-500 text-4xl" />
                ) : fileType === "audio" ? (
                  <FaFileAudio className="text-purple-500 text-4xl" />
                ) : (
                  <FaFileAlt className="text-gray-500 text-4xl" />
                )}
              </div>

    
            </a>
          </div>
        );
      })}
    </div>
  );
};


export default FilesSection;