"use client";

import { useEffect } from "react";

/**
 * The page is static, so the summer schedule is pre-selected in the HTML. On load, switch to the
 * winter schedule between November and February (most temples move to winter hours around Diwali).
 */
export function SeasonAuto({ name }: { name: string }) {
  useEffect(() => {
    const month = new Date().getMonth();
    if (month >= 10 || month <= 1) {
      const winter = document.querySelector<HTMLInputElement>(`input[name="${name}"][value="winter"]`);
      if (winter) winter.checked = true;
    }
  }, [name]);
  return null;
}
