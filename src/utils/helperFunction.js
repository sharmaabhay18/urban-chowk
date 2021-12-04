import { toast } from "react-toastify";
import config from "utils/configConstant";

const isUserAuthenticated = (history) => {
  const data = localStorage.getItem(config.AUTH_TOKEN);
  if (data) {
    return history.push("/");
  }
  return null;
};

const isAdminLoggedIn = (history) => {
  const data = localStorage.getItem(config.ROLE);
  if (data === "customer") {
    return history.push("/");
  }

  if (data) {
    return null;
  }

  return history.push("/");
};

const toastOption = {
  position: "bottom-center",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  closeButton: false,
  progress: undefined,
};

const notifySuccessToast = (message, timeout) => {
  toast.dismiss();
  setTimeout(
    () => {
      toast.success(message, toastOption);
    },
    timeout ? 500 : 0
  );
};

const notifyErrorToast = (message, timeout) => {
  toast.dismiss();
  setTimeout(
    () => {
      toast.error(message, toastOption);
    },
    timeout ? 500 : 0
  );
};

export {
  isAdminLoggedIn,
  isUserAuthenticated,
  notifySuccessToast,
  notifyErrorToast,
};
