import { type FC } from "react";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";

type TotalPatientsBadgeProps = {
  total: number;
};
export const TotalPatientsBadge: FC<TotalPatientsBadgeProps> = ({ total }) => {
  return (
    <div className="flex items-center gap-4">
      <Label htmlFor="identification" className="font-medium">
        Patients:
      </Label>
      <Badge>{total}</Badge>
    </div>
  );
};
