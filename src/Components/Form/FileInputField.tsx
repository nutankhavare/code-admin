import React, { useState } from "react";
import type { FieldErrors, UseFormRegister } from "react-hook-form";

interface FileInputFieldProps {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  errors: FieldErrors;
  existingFile?: string;
  accept?: string;
  required?: boolean;
}

const FileInputField: React.FC<FileInputFieldProps> = ({
  label,
  name,
  register,
  errors,
  existingFile,
  accept = ".pdf,.jpg,.jpeg,.png,.doc,.docx",
  required = false,
}) => {
  const [fileName, setFileName] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
    } else {
      setFileName("");
    }
  };

  return (
    <div className="form-group">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {existingFile && (
        <div className="mb-2">
          <p className="text-sm text-gray-600">Current file: {existingFile}</p>
        </div>
      )}

      <div className="flex items-center space-x-2">
        <input
          id={name}
          type="file"
          {...register(name)}
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
        />
        <label
          htmlFor={name}
          className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Choose File
        </label>
        <span className="text-sm text-gray-500">
          {fileName || "No file chosen"}
        </span>
      </div>

      {errors[name] && (
        <p className="mt-1 text-sm text-red-600">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
};

export default FileInputField;
