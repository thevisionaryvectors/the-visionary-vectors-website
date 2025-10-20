import { ReactNode } from 'react';

export interface ButtonLink {
  url: string;
  label: string;
  icon?: ReactNode;
  target?: string;
}