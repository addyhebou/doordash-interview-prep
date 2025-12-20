'use client';
import React, { ReactNode } from 'react';
import { CommentProvider } from './CommentContext';

/**
 * Root provider that wraps all application-level context providers
 * In a real app, this might include AuthProvider, ThemeProvider, etc.
 */
export function AppProviders({ children }: { children: ReactNode }) {
  return <CommentProvider>{children}</CommentProvider>;
}
