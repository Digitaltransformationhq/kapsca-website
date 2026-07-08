"use client";

import { createContext, useContext } from "react";

export type ScrollNavState = {
  /** id of the section currently in view ("top", "about", …) */
  active: string;
  /** smooth-scroll to a section by id */
  go: (id: string) => void;
};

export const ScrollNavContext = createContext<ScrollNavState>({
  active: "top",
  go: () => {},
});

export const useScrollNav = () => useContext(ScrollNavContext);
