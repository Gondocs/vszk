import { toast } from "react-hot-toast";

export const showToastLong = (message, type = "success") => {
    const toastOptions = {
      duration: 6000,
      position: "bottom-right",
    };
  
    switch (type) {
      case "success":
        toast.success(message, toastOptions);
        break;
      case "error":
        toast.error(message, toastOptions);
        break;
      case "warning":
        toast.warning(message, toastOptions);
        break;
      default:
        toast(message, toastOptions);
        break;
    }
  };
  