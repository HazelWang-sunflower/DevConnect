import Header from "@/components/layout/header";
import FeatureCard from "@/components/shared/feature-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Header />
      <main className="flex-grow">
        <section className="py-20 px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Welcome to DevConnect
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Connect, Collaborate, and Create with fellow developers from around
            the world.
          </p>
          <Button asChild size="lg">
            <Link href="/register">Join the Community</Link>
          </Button>
        </section>

        <section className="py-16 px-4 md:px-6 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Why DevConnect?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                title="Showcase Your Projects"
                description="Share your work with a global audience and get valuable feedback."
              />
              <FeatureCard
                title="Find Collaborators"
                description="Connect with like-minded developers for your next big idea."
              />
              <FeatureCard
                title="Learn and Grow"
                description="Engage in discussions, read articles, and stay updated with the latest in tech."
              />
            </div>
          </div>
        </section>

        <section className="py-20 px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to get started?</h2>
          <p className="text-xl mb-8">
            Join thousands of developers already on DevConnect
          </p>
          <Button asChild size="lg">
            <Link href="/register">Create Your Account</Link>
          </Button>
        </section>
      </main>
    </div>
  );
}
