"use client";
import * as React from "react";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export default function ModeToggle() {
  const { resolvedTheme, setTheme } = useTheme(); // Use resolvedTheme for better consistency

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      {/* Sun Icon (Visible in Light Mode) */}
      <SunIcon className="h-[1.2rem] w-[1.2rem] transition-all dark:hidden" />
      {/* Moon Icon (Visible in Dark Mode) */}
      <MoonIcon className="h-[1.2rem] w-[1.2rem] hidden dark:block" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
