"use client";

import { useState, useCallback } from "react";

export function useToast() {
  const [toast, setToast] = useState<{ message: string; type: "info" | "success" | "error" } | null>(null);

  const show = useCallback((message: string, type: "info" | "success" | "error" = "info") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  return { toast, show };
}
