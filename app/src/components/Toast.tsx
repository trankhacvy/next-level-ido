import {
  Alert,
  AlertTitle,
  AlertIcon,
  AlertProps,
  AlertBody,
  AlertContent,
  AlertStatus,
} from "components/Alert";
import cx from "classnames";
import hotToast, {
  Toaster as HotToaster,
  ToastPosition,
} from "react-hot-toast";

const DEFAULT_DURATION = 2000; // 2 seconds

interface ToastProps {
  className?: string;
  onClose?: () => void;
  status?: AlertProps["status"];
  title: string;
  message?: React.ReactNode;
  duration?: number;
  position?: ToastPosition;
}

function getBackground(status: AlertStatus) {
  if (status === "error") {
    return "!bg-red-500";
  }

  if (status === "success") {
    return "!bg-green-500";
  }

  if (status === "warning") {
    return "!bg-amber-400";
  }

  return "!bg-blue-400";
}

export function toast(props: ToastProps) {
  const {
    onClose,
    title,
    message,
    duration = DEFAULT_DURATION,
    position = "top-center",
    status = "info",
    ...rest
  } = props;

  hotToast(
    (t) => (
      <Alert
        className={cx(
          "sm:w-screen sm:max-w-sm xl:max-w-lg max-w-full",
          getBackground(status)
        )}
        onClose={() => {
          hotToast.dismiss(t.id);
          if (onClose) {
            onClose();
          }
        }}
        status={status}
        id={t.id}
        {...rest}
      >
        <AlertIcon />
        <AlertBody>
          <AlertTitle className="text-white">{title}</AlertTitle>
          {message && (
            <AlertContent className="break-all text-white">
              {message}
            </AlertContent>
          )}
        </AlertBody>
      </Alert>
    ),
    { duration, position }
  );
}

toast.success = (props: Omit<ToastProps, "status">) => {
  toast({ status: "success", ...props });
};

toast.info = (props: Omit<ToastProps, "status">) => {
  toast({ status: "info", ...props });
};

toast.warning = (props: Omit<ToastProps, "status">) => {
  toast({ status: "warning", ...props });
};

toast.error = (props: Omit<ToastProps, "status">) => {
  toast({ status: "error", ...props });
};

export const Toaster = () => (
  <HotToaster
    toastOptions={{
      className: "",
      style: {
        border: "none",
        padding: "0",
        color: "transparent",
        background: "transparent",
        width: "auto",
        height: "auto",
        boxShadow: "none",
        borderRadius: "0",
        lineHeight: "auto",
        maxWidth: "auto",
      },
    }}
  />
);
