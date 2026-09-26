import Image from "next/image";

const Hero = () => {
  return (
    <section className="mx-4 md:mx-6 mt-6 rounded-3xl bg-[#16181d] border border-white/5 px-8 py-12 md:px-12 md:py-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        
        <div>
          <p className="text-[#ccff00] text-xs font-bold tracking-[0.2em] mb-4">
            WORKOUT LIBRARY
          </p>
          <h1 className=" `font-(family-name:--font-oswald)` text-4xl md:text-5xl lg:text-6xl font-bold uppercase leading-tight text-white">
            Train with intent.
            <br />
            Log every set.
          </h1>
          <p className="mt-6 text-gray-400 max-w-md">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.
          </p>
          
           <a href="#library"
            className="inline-flex items-center gap-2 mt-8 bg-[#ccff00] text-black font-bold px-6 py-3 rounded-lg text-sm hover:bg-[#b8e600] transition"
          >
            BROWSE WORKOUTS
          </a>
        </div>

        
        <div className="flex justify-center lg:justify-end">
          <Image
            src="/banner.png"
            alt="Workout illustration"
            width={400}
            height={500}
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;