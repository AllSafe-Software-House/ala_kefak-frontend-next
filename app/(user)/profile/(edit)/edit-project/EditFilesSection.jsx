"use client";

import { FaFileAlt, FaFileAudio, FaFilePdf, FaFileVideo } from "react-icons/fa";
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

  if (!files || files.length === 0) return null;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
      {files.map((file) => {
        const fileType = getFileType(file);
        const fileName = file.url?.split("/").pop() || "file";

        return (
          <div
            key={file.id}
            className="relative group  dark:bg-darkinput rounded-lg border  dark:border-darkinput overflow-hidden hover:shadow-md transition-shadow h-48" 
            onMouseEnter={() => setHoveredFile(file.id)}
            onMouseLeave={() => setHoveredFile(null)}
          >
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
                <MdDelete className="text-lg" />
              </button>
            )}

            <a
              href={file.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col h-full"
            >
              <div className="flex-1 flex items-center justify-center  dark:bg-darkinput  h-36">
                {fileType === "image" ? (
                  <img
                    src={file.url}
                    alt={fileName}
                    className="w-full h-full object-cover object-top"
                  />
                ) : fileType === "pdf" ? (
                  <FaFilePdf className="text-red-500 text-5xl" />
                ) : fileType === "video" ? (
                  <FaFileVideo className="text-blue-500 text-5xl" />
                ) : fileType === "audio" ? (
                  <FaFileAudio className="text-purple-500 text-5xl" />
                ) : (
                  <FaFileAlt className="text-gray-500 text-5xl" />
                )}
              </div>

              <div className=" h-fit py-1 flex items-center justify-center  ">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate w-full text-center">
                  {fileName}
                </p>
              </div>
            </a>
          </div>
        );
      })}
    </div>
  );
};

export default FilesSection;
