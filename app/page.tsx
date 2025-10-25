import WaitlistForm from "../components/WaitlistForm"; // adjust path if different

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="max-w-xl w-full px-6 py-16 text-center">
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">
          Smarter scheduling for healthcare teams
        </h1>
        <p className="mt-4 text-zinc-300">
          Scheduler RX uses AI + constraint solving to create fair, transparent schedules in minutes — 
          starting with residency programs and hospitals.
        </p>

        <div className="mt-8">
          <WaitlistForm />
        </div>

        <p className="mt-8 text-sm text-zinc-400">
          Built in Raleigh, NC — Part of the RIoT Accelerator Program.
        </p>
      </div>
    </main>
  );
}
