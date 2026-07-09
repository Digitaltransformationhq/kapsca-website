"use client";

import { createContext, useContext } from "react";

/** Call to open the "Book a Consultation" modal from anywhere. */
export const ConsultationContext = createContext<() => void>(() => {});

export const useConsultation = () => useContext(ConsultationContext);
