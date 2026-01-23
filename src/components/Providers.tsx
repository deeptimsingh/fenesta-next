"use client";

import { ThemeProvider } from "next-themes";
import LenisProvider from "@/components/LenisProvider";
import CustomCursor from "@/components/base/CustomCursor";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <LenisProvider>
        {children}       
      </LenisProvider>
       <CustomCursor />
    </ThemeProvider>
    
  );
}
