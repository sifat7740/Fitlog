"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import type { Workout } from "@/types/workout";

interface PlanItem extends Workout {
  done?: boolean;
}

interface PlanContextType {
  todaysPlan: PlanItem[];
  saved: PlanItem[];
  addToPlan: (workout: Workout) => boolean; // returns false if cap reached
  addToSaved: (workout: Workout) => void;
  removeFromPlan: (id: number) => void;
  removeFromSaved: (id: number) => void;
  markAsDone: (id: number) => void;
  isInPlan: (id: number) => boolean;
  isInSaved: (id: number) => boolean;
}

const PLAN_CAP = 5;

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export const PlanProvider = ({ children }: { children: ReactNode }) => {
 const [todaysPlan, setTodaysPlan] = useState<PlanItem[]>(() => {
  if (typeof window === "undefined") return [];

  const stored = localStorage.getItem("todaysPlan");
  return stored ? JSON.parse(stored) : [];
});

const [saved, setSaved] = useState<PlanItem[]>(() => {
  if (typeof window === "undefined") return [];

  const stored = localStorage.getItem("saved");
  return stored ? JSON.parse(stored) : [];
});

const [loaded, setloaded] = useState(true);

  // Save to localStorage whenever data changes
  useEffect(() => {
    if (loaded) {
      localStorage.setItem("todaysPlan", JSON.stringify(todaysPlan));
    }
  }, [todaysPlan, loaded]);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem("saved", JSON.stringify(saved));
    }
  }, [saved, loaded]);

  const isInPlan = (id: number) => todaysPlan.some((w) => w.id === id);
  const isInSaved = (id: number) => saved.some((w) => w.id === id);

  const addToPlan = (workout: Workout): boolean => {
    if (todaysPlan.length >= PLAN_CAP) return false;
    if (isInPlan(workout.id)) return true;
    setTodaysPlan((prev) => [...prev, { ...workout, done: false }]);
    return true;
  };

  const addToSaved = (workout: Workout) => {
    if (isInSaved(workout.id)) return;
    setSaved((prev) => [...prev, workout]);
  };

  const removeFromPlan = (id: number) => {
    setTodaysPlan((prev) => prev.filter((w) => w.id !== id));
  };

  const removeFromSaved = (id: number) => {
    setSaved((prev) => prev.filter((w) => w.id !== id));
  };

  const markAsDone = (id: number) => {
    setTodaysPlan((prev) =>
      prev.map((w) => (w.id === id ? { ...w, done: true } : w))
    );
  };

  return (
    <PlanContext.Provider
      value={{
        todaysPlan,
        saved,
        addToPlan,
        addToSaved,
        removeFromPlan,
        removeFromSaved,
        markAsDone,
        isInPlan,
        isInSaved,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
};

export const usePlan = () => {
  const context = useContext(PlanContext);
  if (!context) {
    throw new Error("usePlan must be used within a PlanProvider");
  }
  return context;
};