"use client";

import { Workout } from "@/types/workout";
import { usePlan } from "@/context/PlanContext";
import { useToast } from "@/context/ToastContext";

interface WorkoutActionsProps {
  workout: Workout;
}

const WorkoutActions = ({ workout }: WorkoutActionsProps) => {
  const { addToPlan, addToSaved, isInPlan, isInSaved, todaysPlan } = usePlan();
  const { showToast } = useToast();

  const inPlan = isInPlan(workout.id);
  const inSaved = isInSaved(workout.id);
  const planFull = todaysPlan.length >= 5;

  const handleAddToPlan = () => {
    if (inPlan) {
      showToast("Already in today's plan");
      return;
    }
    const success = addToPlan(workout);
    if (success) {
      showToast("Added to today's plan");
    } else {
      showToast("Today's plan is full (5 max)");
    }
  };

  const handleSave = () => {
    if (inSaved) {
      showToast("Already saved");
      return;
    }
    addToSaved(workout);
    showToast("Saved for later");
  };

  return (
    <div className="mt-8 flex gap-3">
      <button
        onClick={handleAddToPlan}
        disabled={inPlan || planFull}
        className="bg-[#ccff00] text-black px-5 py-3 rounded-lg font-bold text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#b8e600] transition"
      >
        + {inPlan ? "Added to plan" : "Add to today's plan"}
      </button>
      <button
        onClick={handleSave}
        disabled={inSaved}
        className="border border-gray-700 px-5 py-3 rounded-lg text-sm text-white disabled:opacity-40 disabled:cursor-not-allowed hover:border-gray-500 transition"
      >
        🔖 {inSaved ? "Saved" : "Save for later"}
      </button>
    </div>
  );
};

export default WorkoutActions;