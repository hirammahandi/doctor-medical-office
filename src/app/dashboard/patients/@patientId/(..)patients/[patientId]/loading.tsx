import { DialogDescription } from '@radix-ui/react-dialog';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Loader } from '@/components/ui/loader';
import { VisuallyHidden } from '@/components/ui/visually-hidden';

const Loading = () => {
  return (
    <Dialog open>
      <DialogContent
        className="grid bg-transparent border-0 shadow-none place-items-center"
        hideCloseButton
      >
        <VisuallyHidden>
          <DialogHeader>
            <DialogTitle>Loader</DialogTitle>
            <DialogDescription>Loader for patient details</DialogDescription>
          </DialogHeader>
        </VisuallyHidden>
        <Loader />
      </DialogContent>
    </Dialog>
  );
};

export default Loading;
