import toast from "react-hot-toast";

export const errNotify = (msg) => {
  toast.error(msg, {
    duration: 5000,
    style: {
      textAlign: "center",
      boxShadow: "8px 11px 27px -8px rgba(66, 68, 90, 1)",
    },
  });
};

export const successNotify = (msg) => {
  toast.success(msg, {
    duration: 2000,
    style: {
      textAlign: "center",
      boxShadow: "8px 11px 27px -8px rgba(66, 68, 90, 1)",
    },
  });
};

// toast.success("Deleted water successfully!",
