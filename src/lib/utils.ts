import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { forwardRef } from 'react';
import { type GenericForwardRef } from '@/lib/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const genericForwardRef = forwardRef as GenericForwardRef;

export const isResultError = (result: unknown): result is { error: string } => {
  return !!result && typeof result === 'object' && 'error' in result;
};
