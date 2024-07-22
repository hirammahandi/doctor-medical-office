import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ClientRoutes } from "@/utils/clients-routes";

export const LoginForm = () => {
  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email and password to access your account.
        </CardDescription>
        <CardDescription className="md:text-center">
          Don't have an account?{" "}
          <Link
            href={ClientRoutes.REGISTER}
            className="w-full text-center text-sm text-muted-foreground hover:text-black"
          >
            Create one here.
          </Link>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="example@example.com"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            required
            placeholder="********"
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Button type="submit" className="w-full">
          Sign In
        </Button>
        <Link
          href={ClientRoutes.FORGOT_PASSWORD}
          className="w-full text-center text-sm text-muted-foreground hover:text-black"
        >
          Forgot your password?
        </Link>
      </CardFooter>
    </Card>
  );
};
