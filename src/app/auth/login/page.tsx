"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema, LoginType } from "@/lib/validation/authSchema";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const form = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
  });

  const {
    handleSubmit,
    control,
    setError,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (data: LoginType) => {
    const res = await signIn("credentials", {
      ...data,
      callbackUrl: "/dashboard",
    });
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
        </CardHeader>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <FormField
                  control={control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Email Address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>

            <CardFooter>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
