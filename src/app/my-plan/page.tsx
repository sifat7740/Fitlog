"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePlan } from "@/context/PlanContext";
import { useToast } from "@/context/ToastContext";

type Tab = "today" | "saved";
type SortKey = "duration" | "calories" | "rating";

const MyPlan = () => {
  const { todaysPlan, saved, removeFromPlan, removeFromSaved, markAsDone } =
    usePlan();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<Tab>("today");
  const [sortBy, setSortBy] = useState<SortKey>("duration");

  const activeList = activeTab === "today" ? todaysPlan : saved;

  const sortedList = [...activeList].sort((a, b) => {
    if (sortBy === "duration") return a.duration - b.duration;
    if (sortBy === "calories") return a.caloriesBurned - b.caloriesBurned;
    return b.rating - a.rating;
  });

  const totalExercises = todaysPlan.length;
  const totalMinutes = todaysPlan.reduce((sum, w) => sum + w.duration, 0);
  const totalCalories = todaysPlan.reduce(
    (sum, w) => sum + w.caloriesBurned,
    0
  );

  const handleRemove = (id: number) => {
    if (activeTab === "today") {
      removeFromPlan(id);
      showToast("Removed from plan");
    } else {
      removeFromSaved(id);
      showToast("Removed from saved");
    }
  };

  const handleMarkAsDone = (id: number) => {
    markAsDone(id);
    showToast("Marked as done");
  };

  return (
    <main className="px-6 py-10">
      <div className="mx-auto max-w-6xl">
        
        <h1 className="`font-(family-name:--font-oswald)`text-3xl font-bold uppercase text-white">
          My Plan
        </h1>
        <p className="mt-2 text-gray-400">
          Cap of five lifts for today. Finish them, then load more.
        </p>

      
        <div className="mt-6 grid grid-cols-3 gap-4 bg-[#15171d] rounded-xl p-6">
          <div>
            <p className="text-xs text-gray-400">Exercises</p>
            <p className="text-2xl font-bold text-[#ccff00]">
              {totalExercises}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Minutes</p>
            <p className="text-2xl font-bold text-white">{totalMinutes}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Calories</p>
            <p className="text-2xl font-bold text-white">{totalCalories}</p>
          </div>
        </div>

        
        <div className="mt-6 flex items-center justify-between">
          <div className="flex gap-2 bg-[#15171d] rounded-full p-1">
            <button
              onClick={() => setActiveTab("today")}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
                activeTab === "today"
                  ? "bg-[#ccff00] text-black"
                  : "text-gray-400"
              }`}
            >
              Today&apos;s Plan
            </button>
            <button
              onClick={() => setActiveTab("saved")}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
                activeTab === "saved"
                  ? "bg-[#ccff00] text-black"
                  : "text-gray-400"
              }`}
            >
              Saved
            </button>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span>Sort By</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortKey)}
              className="bg-[#15171d] border border-gray-700 rounded-lg px-3 py-1.5 text-white text-sm"
            >
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>

        
        <div className="mt-6 bg-[#15171d] rounded-xl p-6 `min-h-75`">
          {sortedList.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full py-16 text-center">
              <h3 className="text-white font-bold text-lg">
                NOTHING HERE YET
              </h3>
              <p className="mt-2 text-gray-400 text-sm max-w-sm">
                Browse the library and add a lift to get today moving.
              </p>
              <Link
                href="/"
                className="mt-6 bg-[#ccff00] text-black font-bold px-5 py-2.5 rounded-lg text-sm hover:bg-[#b8e600] transition"
              >
                Go to workouts
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {sortedList.map((workout) => (
                <div
                  key={workout.id}
                  className="flex items-center gap-4 bg-black/30 rounded-lg p-3"
                >
                  <Image
                    src={workout.image}
                    alt={workout.name}
                    width={64}
                    height={64}
                    className="rounded-lg object-cover w-16 h-16"
                  />

                  <div className="flex-1">
                    <h4 className="text-white font-bold text-sm">
                      {workout.name.toUpperCase()}
                    </h4>
                    <p className="text-gray-400 text-xs">
                      {workout.equipment}
                    </p>
                    <div className="mt-1 flex items-center gap-3 text-xs text-gray-400">
                      <span>⏱ {workout.duration} min</span>
                      <span>🔥 {workout.caloriesBurned} kcal</span>
                      <span>⭐ {workout.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/workouts/${workout.id}`}
                      className="border border-gray-700 text-white text-xs px-3 py-2 rounded-lg hover:border-gray-500 transition"
                    >
                      View Details
                    </Link>

                    {activeTab === "today" && (
                      <button
                        onClick={() => handleMarkAsDone(workout.id)}
                        disabled={workout.done}
                        className="bg-[#ccff00] text-black text-xs font-bold px-3 py-2 rounded-lg disabled:opacity-40 hover:bg-[#b8e600] transition"
                      >
                        ✓ {workout.done ? "Done" : "Mark as Done"}
                      </button>
                    )}

                    <button
                      onClick={() => handleRemove(workout.id)}
                      className="text-gray-400 hover:text-white px-2 text-lg"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default MyPlan;