import React, { HTMLAttributes } from "react";
import cx from "classnames";
import {
  FaTimesCircle,
  FaExclamationCircle,
  FaCheckCircle,
  FaExclamationTriangle,
  FaInfo,
} from "react-icons/fa";
import { AlertStatus, AlertProvider, useAlertContext } from "./context";

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  status?: AlertStatus;
  className?: string;
  onClose?: () => void;
}

function getBackground(status: AlertStatus) {
  if (status === "error") {
    return "bg-red-300";
  }

  if (status === "success") {
    return "bg-green-500";
  }

  if (status === "warning") {
    return "bg-amber-400";
  }

  return "bg-blue-200";
}

export const Alert: React.FC<AlertProps> = ({
  status = "error",
  className,
  children,
  onClose,
  ...rest
}) => {
  return (
    <AlertProvider status={status}>
      <div
        className={cx(
          "text-left px-6 py-4 flex relative pr-16 rounded-2xl shadow-z8",
          getBackground(status),
          className
        )}
        {...rest}
      >
        {children}
        {onClose && (
          <button
            className="absolute right-0 top-4 w-12 h-12 rounded-full flex items-center justify-center hover:bg-gray-500/[0.24]"
            onClick={onClose}
          >
            <FaTimesCircle className="text-white" />
          </button>
        )}
      </div>
    </AlertProvider>
  );
};

export const AlertTitle = ({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <h5 className={cx("text-h5", className)} {...props}>
      {children}
    </h5>
  );
};

export const AlertContent = ({
  children,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) => {
  return <p {...props}>{children}</p>;
};

export const AlertBody = ({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cx("space-y-1 pt-0.5", className)} {...props}>
      {children}
    </div>
  );
};

function getIcon(status: AlertStatus) {
  if (status === "error") {
    return FaExclamationCircle;
  }

  if (status === "success") {
    return FaCheckCircle;
  }

  if (status === "warning") {
    return FaExclamationTriangle;
  }

  return FaInfo;
}

export const AlertIcon = () => {
  const { status } = useAlertContext();

  const iconClassName = cx(
    "w-6 h-6 flex-none inline-flex justify-center items-center rounded-full text-white mr-4 mt-[10px] flex-none leading-none",
    getBackground(status)
  );

  const Icon = getIcon(status);

  return (
    <div className={iconClassName}>
      <Icon />
    </div>
  );
};

export type { AlertStatus } from "./context";
