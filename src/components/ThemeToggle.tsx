
import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  // Check for system preference or saved preference on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const newDarkMode = !prev;
      
      // Save preference to localStorage
      localStorage.setItem("theme", newDarkMode ? "dark" : "light");
      
      // Update DOM
      if (newDarkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      
      return newDarkMode;
    });
  };

  return (
    <div className="flex items-center space-x-2">
      <Sun className={`h-5 w-5 ${!isDark ? "text-roomie-amber" : "text-muted-foreground"}`} />
      <Switch checked={isDark} onCheckedChange={toggleTheme} />
      <Moon className={`h-5 w-5 ${isDark ? "text-roomie-teal" : "text-muted-foreground"}`} />
    </div>
  );
};

export default ThemeToggle;
