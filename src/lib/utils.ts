import { clsx } from 'clsx';
import type { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Some function
 *
 * @returns {string} Stringed value
 */
export default function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
