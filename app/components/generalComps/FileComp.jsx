import React from 'react'
import { FaFile } from 'react-icons/fa'
import { FiDownload } from 'react-icons/fi'

const FileComp = () => {
  return (
        <div
          className="w-full border rounded-lg p-4 flex justify-between items-center dark:bg-darkinput dark:border-darkinput dark:text-gray-300"
        >
          <div className="flex justify-start items-center gap-6">
            <FaFile className="text-indigo-500 text-4xl md:text-5xl" />
            <div className="text-gray-700 dark:text-gray-200">
              <p className="text-lg font-medium">File Name . Format </p>
              <p>1,156 MB</p>
            </div>
          </div>
          <FiDownload className="text-2xl " />
        </div>
  )
}

export default FileComp
