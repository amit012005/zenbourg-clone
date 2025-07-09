"use client";

// All imports are at the top
import { Suspense, useState, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, Loader2 } from "lucide-react";

/**
 * This is the inner component containing all the client-side logic.
 * It uses the necessary hooks like useSearchParams and useState.
 */
function VerificationForm() {
  const router = useRouter();
  const params = useSearchParams();
  const email = params.get("email") || "";
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleVerify = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });

      if (!res.ok) throw new Error((await res.json()).message);
      router.push("/signin");
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-md w-full">
      <CardHeader>
        <CardTitle>Verify Your Email</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <form onSubmit={handleVerify} className="space-y-4">
          <Label htmlFor="code">Verification Code</Label>
          <Input
            id="code"
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
            placeholder="Enter the code sent to your email"
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Verify"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

/**
 * A fallback skeleton component to show while the main form is loading.
 * This prevents layout shift and provides a better user experience.
 */
function VerificationFormSkeleton() {
  return (
    <Card className="max-w-md w-full">
      <CardHeader>
        <CardTitle>Verify Your Email</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-10 w-full" />
        </div>
        <Skeleton className="h-10 w-full" />
      </CardContent>
    </Card>
  )
}

/**
 * This is the main page component that Next.js will render.
 * It uses Suspense to wrap our client-side form, which solves the build error.
 */
export default function VerifyPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Suspense fallback={<VerificationFormSkeleton />}>
        <VerificationForm />
      </Suspense>
    </div>
  );
}