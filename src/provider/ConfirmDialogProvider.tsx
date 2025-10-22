import { createContext, useContext, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const ConfirmDialogContext = createContext(null);

export function ConfirmDialogProvider({ children }) {
  const [dialogState, setDialogState] = useState({
    open: false,
    title: "",
    description: "",
    resolve: null,
  });

  const confirm = (title: string, description: string) => {
    return new Promise((resolve) => {
      setDialogState({
        open: true,
        title,
        description,
        resolve,
      });
    });
  };

  const handleClose = (result: boolean) => {
    setDialogState((prev) => {
      prev.resolve?.(result);
      return { ...prev, open: false, resolve: null };
    });
  };

  return (
    <ConfirmDialogContext.Provider value={{ confirm }}>
      {children}

      <AlertDialog open={dialogState.open}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{dialogState.title}</AlertDialogTitle>
            <AlertDialogDescription>{dialogState.description}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => handleClose(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleClose(true)}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </ConfirmDialogContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useConfirmDialog() {
  return useContext(ConfirmDialogContext);
}
