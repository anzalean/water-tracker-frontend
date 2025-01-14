import toast from "react-hot-toast";

export const errNotify = (msg) => {
  toast.error(msg, {
    duration: 5000,
  });
};

export const successNotify = (msg) => {
  toast.success(msg, {
    duration: 1000,
  });
};
