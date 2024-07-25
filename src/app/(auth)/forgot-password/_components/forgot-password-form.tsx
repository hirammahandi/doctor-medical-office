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
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ClientRoutes } from "@/utils/clients-routes";

export const ForgotPasswordForm = () => {
  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">Forgot Password</CardTitle>
        <CardDescription>
          Enter your email address and we'll send you a link to reset your
          password.
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
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link
          className="text-sm text-muted-foreground hover:text-black"
          href={ClientRoutes.LOGIN}
        >
          Back to login
        </Link>
        <Button type="submit">Reset Password</Button>
      </CardFooter>
    </Card>
  );
};