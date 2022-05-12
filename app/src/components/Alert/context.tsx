import createContext from "utils/createContext";

export type AlertStatus = "error" | "success" | "info" | "warning";

const [Provider, useAlertContext] = createContext<{
  status: AlertStatus;
}>();

type AlertProviderProps = {
  status: AlertStatus;
  children: React.ReactNode;
};

export const AlertProvider = ({ children, ...props }: AlertProviderProps) => {
  return <Provider value={props}>{children}</Provider>;
};

export { useAlertContext };
