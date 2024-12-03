"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

const NotFoundPage = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <AlertCircle className="text-destructive w-24 h-24 mb-6" />
      <h1 className="text-7xl font-extrabold text-primary mb-4">404</h1>
      <h2 className="text-4xl font-bold text-zinc-800 mb-4">OOPS, Page Not Found</h2>
      <p className="text-lg text-zinc-500 mb-6">
        Sorry, the page you’re looking for doesn’t exist or has been removed.
      </p>
      <Button
        onClick={handleGoBack}
        variant="destructive"
        className="px-6 py-3 text-lg rounded-lg"
      >
        Go Back
      </Button>
    </div>
  );
};

export default NotFoundPage;
