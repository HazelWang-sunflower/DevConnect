import Header from "@/components/layout/header";

export default function Home() {
  return (
    <div>
      <Header />
      <main>
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)]">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Welcome to DevConnect
          </h1>
        </div>
      </main>
    </div>
  );
}
