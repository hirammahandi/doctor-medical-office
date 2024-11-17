import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export const AddMedicalHistoryForm = () => {
  return (
    <Dialog defaultOpen>
      <DialogTrigger asChild>
        <Button variant="outline">Create/Update Patient History</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Patient Medical History</DialogTitle>
          <DialogDescription>
            Enter the details of the patient&apos;s medical history.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="name" className="text-right">
              Patient Name
            </Label>
            <Input
              id="name"
              placeholder="Enter patient name"
              className="col-span-3"
            />
          </div>
          <div className="grid items-start grid-cols-4 gap-4">
            <Label htmlFor="history" className="text-right">
              Medical History
            </Label>
            <Textarea
              id="history"
              placeholder="Describe the patient's medical history"
              className="col-span-3 min-h-[150px]"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save</Button>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
