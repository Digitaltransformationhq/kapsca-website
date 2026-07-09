"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { Navbar } from "./Navbar";
import { Sections } from "./Sections";
import { ScrollNavContext } from "./scroll-nav";
import { ConsultationContext } from "./consultation";
import { ConsultationModal } from "./ConsultationModal";

/**
 * Client shell that shares the scroll engine's state (active section + a smooth
 * "go to section" action) and the consultation modal opener across the site.
 */
export function SiteFrame() {
  const [active, setActive] = useState("top");
  const goRef = useRef<(id: string) => void>(() => {});
  const go = useCallback((id: string) => goRef.current(id), []);
  const scrollValue = useMemo(() => ({ active, go }), [active, go]);

  const [consultOpen, setConsultOpen] = useState(false);
  const openConsult = useCallback(() => setConsultOpen(true), []);

  return (
    <ConsultationContext.Provider value={openConsult}>
      <ScrollNavContext.Provider value={scrollValue}>
        <Navbar />
        <Sections
          onActiveChange={setActive}
          bindGo={(fn) => {
            goRef.current = fn;
          }}
        />
      </ScrollNavContext.Provider>

      <ConsultationModal
        open={consultOpen}
        onClose={() => setConsultOpen(false)}
      />
    </ConsultationContext.Provider>
  );
}
