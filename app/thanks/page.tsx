export default function Thanks() {
    return (
      <main className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center px-6">
          <h1 className="text-4xl font-semibold">You’re on the waitlist ✅</h1>
          <p className="mt-3 text-zinc-300">Thanks for your interest in Scheduler RX.</p>
          <a href="/" className="inline-block mt-6 px-4 py-2 bg-yellow-400 text-black rounded-md">
            Back to site
          </a>
        </div>
      </main>
    );
  }
  