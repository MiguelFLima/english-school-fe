import { toast } from 'react-toastify';

export const notifyDeleted = () =>
  toast('Deletado ✅!', {
    position: 'top-right',
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: 'light',
  });
