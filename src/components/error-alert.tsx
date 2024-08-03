import { AlertCircle } from "lucide-react";
import React, { FC, PropsWithChildren } from "react";
import { Alert, AlertTitle, AlertDescription } from "@components/ui/alert";

type ErrorAlertProps = PropsWithChildren;

export const ErrorAlert: FC<ErrorAlertProps> = ({ children }) => {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{children}</AlertDescription>
    </Alert>
  );
};
