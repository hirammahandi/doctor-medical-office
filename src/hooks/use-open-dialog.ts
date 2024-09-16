import { useState } from "react";

type UseOpenDialogParams = {
  openConditions?: boolean[];
};

export const useOpenDialog = ({ openConditions }: UseOpenDialogParams) => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = (open: boolean) => {
    if (openConditions?.includes(true)) return;

    setOpenDialog(open);
  };

  return {
    openDialog,
    handleOpenDialog,
  };
};
