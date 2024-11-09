import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { forwardRef } from "react";
import { type GenericForwardRef } from "@/utils/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const genericForwardRef = forwardRef as GenericForwardRef;
