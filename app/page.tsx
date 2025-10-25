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

        {/* Waitlist form */}
        <div className="mt-8">
          <form action="https://formspree.io/f/mrbogbwz" method="POST" className="space-y-3">
            
            <input name="name" type="text" placeholder="Your Name" required
              className="w-full rounded-md px-3 py-2 bg-zinc-900 border border-zinc-700" />
            <input name="email" type="email" placeholder="Your Email Address" required
              className="w-full rounded-md px-3 py-2 bg-zinc-900 border border-zinc-700" />
            <button type="submit"
              className="w-full rounded-md px-3 py-2 bg-yellow-400 text-black font-medium">
              Join Waitlist
            </button>
            <input type="hidden" name="_subject" value="New Scheduler RX waitlist signup" />
          </form>
        </div>

        <p className="mt-8 text-sm text-zinc-400">
          Built in Raleigh, NC — Part of the RIoT Accelerator Program.
        </p>
      </div>
    </main>
  );
}