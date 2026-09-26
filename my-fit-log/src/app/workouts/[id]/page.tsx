import Image from "next/image";
import { Workout } from "@/types/workout";
import WorkoutActions from "@/components/WorkoutActions";

const getWorkout = async (id: string): Promise<Workout> => {
  const response = await fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch workout");
  }
  return response.json();
};

const WorkoutDetails = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const workout = await getWorkout(id);

  return (
    <main className="px-6 py-10">
      <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left: Image */}
        <div className="rounded-2xl overflow-hidden">
          <Image
            src={workout.image}
            alt={workout.name}
            width={600}
            height={700}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right: Details */}
        <div>
          <h1 className=" `font-(family-name:--font-oswald)` text-3xl md:text-4xl font-bold uppercase text-white">
            {workout.name}
          </h1>
          <p className="mt-3 text-gray-400">{workout.description}</p>

          <div className="flex gap-2 mt-4">
            {workout.muscleGroups.map((group) => (
              <span
                key={group}
                className="rounded-full bg-[#ccff00] px-3 py-1 text-xs font-bold text-black"
              >
                {group}
              </span>
            ))}
          </div>

          {/* Info card */}
          <div className="mt-6 bg-[#15171d] rounded-xl overflow-hidden">
            {[
              ["Equipment", workout.equipment],
              ["Difficulty", workout.difficulty],
              ["Sets", workout.sets],
              ["Reps", workout.reps],
              ["Duration", `${workout.duration} min`],
              ["Calories", `${workout.caloriesBurned} kcal`],
              ["Rating", workout.rating],
            ].map(([label, value]) => (
              <div
                key={label}
                className="flex justify-between px-4 py-3 border-b border-gray-800 last:border-b-0 text-sm"
              >
                <span className="text-gray-400 uppercase text-xs tracking-wide">
                  {label}
                </span>
                <span className="font-medium text-white">{value}</span>
              </div>
            ))}
          </div>

          {/* Instructions */}
          <div className="mt-6">
            <h2 className="font-bold text-white mb-3">INSTRUCTIONS</h2>
            <ol className="space-y-2 text-sm text-gray-300 list-decimal list-inside">
              {workout.instructions.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </div>

          {/* Buttons (client component) */}
          <WorkoutActions workout={workout} />
        </div>
      </div>
    </main>
  );
};

export default WorkoutDetails;