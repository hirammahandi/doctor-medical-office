import { PencilIcon, Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Skeleton, SkeletonStyles } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export const PatientSkeletonCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className={cn(SkeletonStyles, "h-6 w-40")} />
          <span className={cn(SkeletonStyles, "h-4 w-24")} />
        </CardTitle>
        <CardDescription>
          <Label htmlFor="identification" className="font-medium">
            Identification:
          </Label>{" "}
          <span className={cn(SkeletonStyles, "h-4 w-32")} />
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Label htmlFor="age" className="font-medium">
            Age:
          </Label>{" "}
          <Skeleton className="h-5 w-16" />
        </div>
        <div className="mt-1.5 flex items-center gap-2 text-sm text-muted-foreground">
          <Label htmlFor="address" className="font-medium">
            Address:
          </Label>{" "}
          <Skeleton className="h-5 w-40" />
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-end gap-4">
        <Button variant="secondary" size="icon">
          <PencilIcon className="size-4" />
        </Button>
        <Button variant="destructive" size="icon">
          <Trash2Icon className="size-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};
