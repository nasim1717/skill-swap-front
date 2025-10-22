import { ConfirmDialogContext } from "@/context";
import { useContext } from "react";

export function useConfirmDialog() {
    return useContext(ConfirmDialogContext)
}