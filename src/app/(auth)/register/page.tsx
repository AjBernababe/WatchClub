"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterType } from "@/lib/zodSchema";

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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import GoogleSignInBtn from "@/components/auth/googleSignInBtn";

export default function RegisterPage() {
  const [step, setStep] = useState<1 | 2>(1);

  const form = useForm<RegisterType>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  const onSubmit = (values: RegisterType) => {
    console.log("Final submission:", values);
  };

  const goToStep2 = async () => {
    const isStep1Valid = await form.trigger(["email", "password"]);
    if (isStep1Valid) {
      setStep(2);
    }
  };

  return (
    <main className="flex items-center justify-center h-screen">
      <Card className="w-full max-w-md transition-all">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Welcome to Watch Club</CardTitle>
          <CardDescription>
            {step === 1
              ? "Create your Watch Club account to get started"
              : "Enter the OTP sent to your email"}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <Form {...form}>
            <form
              onSubmit={
                step === 1
                  ? (e) => {
                      e.preventDefault();
                      goToStep2();
                    }
                  : form.handleSubmit(onSubmit)
              }
              className="space-y-6"
            >
              {/* Step 1: Email + Password */}
              {step === 1 && (
                <div className="animate__animated animate__fadeInRight">
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
                </div>
              )}

              {/* Step 2: OTP Field */}
              {step === 2 && (
                <div className="animate__animated animate__fadeInRight">
                  <FormField
                    control={form.control}
                    name="secretCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>One-Time Password</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>
                          Check your email for a 6-digit code.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              <Button type="submit" className="w-full">
                {step === 1 ? "Create an Account" : "Verify and Register"}
              </Button>
            </form>
          </Form>

          {/* Only show this in step 1 */}
          {step === 1 && (
            <>
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-card px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>

              <GoogleSignInBtn />
            </>
          )}

          <div className="text-center text-sm">
            Already have an account?{" "}
            <a href="/login" className="underline">
              Sign in
            </a>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
