import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "@prisma/client";

export default function ProfileCard({ userData }: { userData: User }) {
  return (
    <Card className="xl:col-span-2">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Profile</CardTitle>
          <CardDescription>Your account details...</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4">
          <div className="flex gap-2 items-center justify-center">
            <Label>Account Number</Label>
            <Input value={userData?.account_no} disabled />
          </div>
          <div className="flex gap-4 space-y-1 items-center justify-center">
            <Label>Name</Label>
            <Input value={userData?.name} />
          </div>
          <div className="flex gap-4 space-y-1 items-center justify-center">
            <Label>Email</Label>
            <Input value={userData?.email} />
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </CardContent>
    </Card>
  );
}
