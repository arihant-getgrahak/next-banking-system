import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { updatePassword } from "@/helper/api/dashboard";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import { useForm } from "react-hook-form";
import { Label } from "../../ui/label";
import * as z from "zod";

export default function UpdatePass({ userData }: { userData: User }) {
  const schema = z.object({
    old: z.string(),
    new: z
      .string()
      .min(8, { message: "Password must have at least 8 characters" }),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      const password = {
        old: data.old,
        new: data.new,
      };
      const res = await updatePassword(userData?.id, password);
      if (res?.status !== 200) {
        return alert("Error updating password");
      }
      alert("Password updated successfully");
      reset();
    } catch (error) {
      console.error("Failed to update Password:", error);
      alert("Error updating Password");
    }
  });
  return (
    <Card className="xl:col-span-2">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Password</CardTitle>
          <CardDescription>Update your password</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4" onSubmit={onSubmit}>
          <div className="flex flex-col md:flex-row gap-4 space-y-1 items-center justify-center ">
            <Label>Old Password</Label>
            <Input {...register("old")} type="password" />
            {errors.old && (
              <p className="text-red-500">{errors.old.message?.toString()}</p>
            )}
          </div>
          <div className="flex flex-col md:flex-row gap-4 space-y-1 items-center justify-center ">
            <Label>New Password</Label>
            <Input type="password" {...register("new")} />
            {errors.new && (
              <p className="text-red-500">{errors.new.message?.toString()}</p>
            )}
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </CardContent>
    </Card>
  );
}
