import Hero from "@/components/Hero";
import WorkoutCard from "@/components/WorkoutCard";
import { Workout } from "@/types/workout";

const getWorkouts = async (): Promise<Workout[]> => {
  const response = await fetch("https://api.abcz.workers.dev/api/fitlog");
  if (!response.ok) {
    throw new Error("Failed to fetch workouts");
  }
  return response.json();
};

const Home = async () => {
  const workouts = await getWorkouts();

  return (
    <main>
      <Hero />

      <section id="library" className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className=" `font-(family-name:--font-oswald)` text-3xl font-bold uppercase text-white">
            The Library
          </h2>
          <p className="mt-2 text-gray-400">
            Twelve lifts covering every major muscle group.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {workouts.map((workout) => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;