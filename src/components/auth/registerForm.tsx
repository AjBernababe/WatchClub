"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema, RegisterType } from "@/lib/zodSchema";
import { useTransition } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormRootMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import GoogleSignInBtn from "@/components/auth/googleSignInBtn";

import { register } from "@/actions/auth/register";

export default function RegisterForm() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<RegisterType>({
    resolver: zodResolver(RegisterSchema),
    mode: "onChange",
  });

  const onSubmit = async (values: RegisterType) => {
    startTransition(async () => {
      const result = await register(values);
      if (result.message) {
        form.setError(result.field as "email" | "root", {
          message: result.message,
          type: result.type,
        });
      }
    });
  };

  const isDisabled = isPending || !form.formState.isValid;

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Create an Account</CardTitle>
        <CardDescription>
          Create your Watch Club account or sign up with Google to get started.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormRootMessage />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter your registered email address.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormDescription>Enter your password.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full cursor-pointer"
              disabled={isDisabled}
            >
              Create an Account
            </Button>
          </form>
        </Form>

        <>
          <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
            <span className="relative z-10 bg-card px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>

          <GoogleSignInBtn />

          <div className="text-center text-sm">
            Already have an account?{" "}
            <a href="/login" className="underline">
              Sign in
            </a>
          </div>
        </>
      </CardContent>
    </Card>
  );
}
