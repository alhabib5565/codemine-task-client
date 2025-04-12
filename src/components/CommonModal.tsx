import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { IconButton } from "@mui/material";
import React, { ReactNode } from "react";
import CloseIcon from "@mui/icons-material/Close";

export type TModalOpenProps = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  title?: string;
};

const CommonModal = ({
  setOpen,
  open,
  title,
  children,
}: TModalOpenProps & { children: ReactNode }) => {
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={"sm"}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {title}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>

        <DialogContent dividers>{children}</DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default CommonModal;
