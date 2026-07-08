"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { Navbar } from "./Navbar";
import { Sections } from "./Sections";
import { ScrollNavContext } from "./scroll-nav";

/**
 * Client shell that shares the scroll engine's state (active section + a
 * smooth "go to section" action) between the Navbar and the Sections.
 */
export function SiteFrame() {
  const [active, setActive] = useState("top");
  const goRef = useRef<(id: string) => void>(() => {});
  const go = useCallback((id: string) => goRef.current(id), []);
  const value = useMemo(() => ({ active, go }), [active, go]);

  return (
    <ScrollNavContext.Provider value={value}>
      <Navbar />
      <Sections
        onActiveChange={setActive}
        bindGo={(fn) => {
          goRef.current = fn;
        }}
      />
    </ScrollNavContext.Provider>
  );
}
