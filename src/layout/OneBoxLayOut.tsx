"use client";
import React, {  ReactNode } from "react";
interface ClientLayoutProps {
  readonly children: ReactNode;
}

export default function OneBoxLayOut({ children }: ClientLayoutProps) {
  return <>{children}</>;
}
