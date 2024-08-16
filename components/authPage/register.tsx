"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { RegisterApi } from "@/helper/api";
import crypto from "crypto";

export default function Register() {
  const passwordValidation = new RegExp(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
  );
  const schema = z.object({
    name: z.string().min(1, { message: "Required" }),
    email: z.string().email({ message: "Invalid email" }),
    password: z.string().min(8, { message: "Must have at least 8 character" }),
    // .regex(passwordValidation, {
    //   message: "Your password is not valid",
    // }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit(async (data) => {
    const res = await RegisterApi(data);
    if (res?.status != 200) return alert("Error");
    alert("Your account created successfully");
  });

  return (
    <Card className="w-[400px] mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Create an account</CardTitle>
        <CardDescription>
          Enter your email below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
          </div>
          <form onSubmit={onSubmit} className="grid gap-2">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                {...register("email")}
              />
              {errors?.email?.message && (
                <p className="text-red-500 font-2xl">
                  {errors?.email?.message.toString()}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                {...register("name")}
              />
              {errors?.name?.message && (
                <p className="text-red-500">
                  {errors?.name?.message.toString()}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" {...register("password")} />
              {errors?.password?.message && (
                <p className="text-red-500">
                  {errors?.password?.message.toString()}
                </p>
              )}
            </div>
            <Button className="w-full mt-5" type="submit">
              Create account
            </Button>
          </form>
        </>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <div>
          <p>
            Already have an account?{" "}
            <Link href="/auth/login" className="underline">
              Login
            </Link>
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}
