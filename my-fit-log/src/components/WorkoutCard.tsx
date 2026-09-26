import Image from "next/image";
import Link from "next/link";
import { Workout } from "@/types/workout";

interface WorkoutCardProps {
  workout: Workout;
}

const WorkoutCard = ({ workout }: WorkoutCardProps) => {
  return (
    <Link
      href={`/workouts/${workout.id}`}
      className="block rounded-xl border border-gray-800 bg-[#15171d] p-3 transition hover:border-[#ccff00]/50"
    >
      
      <div className="overflow-hidden rounded-lg">
        <Image
          src={workout.image}
          alt={workout.name}
          width={300}
          height={300}
          className="h-40 w-full object-cover object-[center_25%]"
        />
      </div>

      
      <div className="mt-3 flex flex-wrap gap-2">
        {workout.muscleGroups.map((group) => (
          <span
            key={group}
            className="rounded-full bg-[#ccff00] px-2 py-1 text-[10px] font-bold text-black"
          >
            {group}
          </span>
        ))}
      </div>

      
      <h3 className="mt-3 text-base font-bold text-white">{workout.name}</h3>
      <p className="text-sm text-gray-400">{workout.equipment}</p>

      
      <div className="mt-3 flex items-center justify-between text-xs text-gray-400">
        <span>⏱ {workout.duration} min</span>
        <span>🔥 {workout.caloriesBurned} kcal</span>
        <span>⭐ {workout.rating}</span>
      </div>
    </Link>
  );
};

export default WorkoutCard;