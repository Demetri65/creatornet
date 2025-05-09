export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
      <h1 className="text-4xl font-bold mb-4 text-center">
        Welcome to CreatorNet
      </h1>
      <p className="text-lg text-gray-600 text-center max-w-md mb-6">
        Connect. Collaborate. Create. A platform built for content creators to
        find collaborators, build their brand, and grow together.
      </p>
      <a
        href="/login"
        className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
      >
        Get Started
      </a>
    </main>
  );
}