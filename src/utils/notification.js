import toast from 'react-hot-toast';

export const errNotify = msg => {
  toast.error(msg, {
    duration: 1500,
  });
};

export const successNotify = msg => {
  toast.success(msg, {
    duration: 1000,
  });
};
