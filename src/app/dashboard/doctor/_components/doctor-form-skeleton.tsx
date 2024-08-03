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
import { Label, labelVariants } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";

export const DoctorFormSkeleton = () => {
  return (
    <Card className="mx-auto w-full max-w-4xl">
      <CardHeader>
        {/* TODO: Make this responsive */}
        <CardTitle className="text-xl md:text-2xl">
          Update Personal Information
        </CardTitle>
        <CardDescription className="text-xs md:text-sm">
          Make changes to your personal information.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label className={labelVariants()}>First Name</Label>
              <Skeleton className="h-10 w-full rounded" />
            </div>
            <div className="space-y-2">
              <Label className={labelVariants()}>Last Name</Label>
              <Skeleton className="h-10 w-full rounded" />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label className={labelVariants()}>Username</Label>
              <Skeleton className="h-10 w-full rounded" />
            </div>
            <div className="space-y-2">
              <Label className={labelVariants()}>Email</Label>
              <Skeleton className="h-10 w-full rounded" />
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button type="submit">Save Changes</Button>
      </CardFooter>
    </Card>
  );
};
