import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-white text-black dark:bg-[#121212] dark:text-white">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <p className="mb-8 text-center sm:text-left max-w-xl">
          Manage your cinema data easily. Choose a section below to view, add, or delete data.
        </p>
        <div className="grid gap-4 w-full max-w-sm">
          <Link href="/salon">
            <button className="w-full py-2 rounded text-white bg-[#2c5364] hover:opacity-90">
              Manage Salons
            </button>
          </Link>
          <Link href="/movie">
            <button className="w-full py-2 rounded text-white bg-[#2c5364] hover:opacity-90">
              Manage Movies
            </button>
          </Link>
          <Link href="/viewing">
            <button className="w-full py-2 rounded text-white bg-[#2c5364] hover:opacity-90">
              Manage Viewings
            </button>
          </Link>
          <Link href="/reservation">
            <button className="w-full py-2 rounded text-white bg-[#2c5364] hover:opacity-90">
              Manage Reservations
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}
