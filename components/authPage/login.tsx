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

export default function Login() {
  return (
    <Card className="w-[400px] mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Login to your Account</CardTitle>
        <CardDescription>
          Enter your credentials below to log in your account
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Name</Label>
          <Input id="name" type="text" placeholder="John Doe" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Button className="w-full">Create account</Button>
        <div>
          <p>
            Don't have an account? {" "}
            <Link href="/auth/register" className="underline">
              Register
            </Link>
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}
