import React, { useRef } from "react";
import css from "./UploadFileButton.module.css";

const UploadFileButton = ({
  children,
  icon = null,
  onFileSelect,
  className,
}) => {
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      if (onFileSelect) onFileSelect(fileUrl, file);
    }
  };

  return (
    <React.Fragment>
      <button type="button" onClick={handleButtonClick} className={className}>
        {icon && icon}
        {children}
      </button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className={css.inputFile}
      />
    </React.Fragment>
  );
};

export default UploadFileButton;
