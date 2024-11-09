'use client';

import Link from 'next/link';
import { ErrorAlert } from '@/components/error-alert';
import { PasswordInput } from '@/components/password-input';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ClientRoutes } from '@/utils/clients-routes';
import { useLoginAction } from '../_hooks/use-login-action';

export const LoginForm = () => {
  const {
    actions: { handleLogin },
    states: { errorResponse, form, isLoading },
  } = useLoginAction();

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email and password to access your account.
        </CardDescription>
        <CardDescription className="md:text-center">
          Don&apos;t have an account?{' '}
          <Link
            href={ClientRoutes.REGISTER}
            className="w-full text-center text-sm font-bold text-muted-foreground hover:text-black hover:underline"
          >
            Sign Up.
          </Link>
        </CardDescription>
        {errorResponse?.message ? (
          <ErrorAlert>{errorResponse.message}</ErrorAlert>
        ) : null}
      </CardHeader>
      <Form {...form}>
        <form onSubmit={handleLogin} noValidate>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="john@example.com"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <PasswordInput {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <Button isLoading={isLoading} type="submit" className="w-full">
              Sign In
            </Button>
            <Link
              href={ClientRoutes.FORGOT_PASSWORD}
              className="w-full text-center text-sm text-muted-foreground hover:text-black"
            >
              Forgot your password?
            </Link>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};
