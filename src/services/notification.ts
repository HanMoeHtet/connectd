import { toast, Slide } from 'react-toastify';

export const showToast = (
  type: 'success' | 'error' | 'info',
  message: string
) => {
  toast(message, {
    type,
    position: 'bottom-right',
    autoClose: false,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    transition: Slide,
  });
};
