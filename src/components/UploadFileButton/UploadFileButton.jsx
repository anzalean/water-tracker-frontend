import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../redux/user/userOps";
import { errNotify, successNotify } from "../../helpers/notification";
import { selectUserEmail } from "../../redux/user/selectors";
import css from "./UploadFileButton.module.css";

const UploadFileButton = ({
  children,
  icon = null,
  onFileSelect,
  className,
}) => {
  const userEmail = useSelector(selectUserEmail);
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const userData = { avatar: file, email: userEmail };

      dispatch(updateUser(userData))
        .unwrap()
        .then((result) => {
          if (onFileSelect) onFileSelect(result, file);
          successNotify("Ok");
        })
        .catch(() => {
          errNotify("Error uploading avatar");
        });
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
