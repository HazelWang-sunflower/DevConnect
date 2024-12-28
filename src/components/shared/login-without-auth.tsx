import { Github } from "lucide-react";
import { Button } from "../ui/button";

export default function LoginWithoutAuth() {
  const handleLogin = () => {
    window.location.href = "/api/auth/github";
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <Button
        onClick={handleLogin}
        className="mt-2 w-full flex items-center justify-center bg-white border border-black text-gray-900"
      >
        <Github className="w-5 h-5 mr-2" />
        Sign in with GitHub(No NextAuth)
      </Button>
    </div>
  );
}
