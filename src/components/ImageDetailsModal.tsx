import { TImage } from "@/type/common.type";
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { TModalOpenProps } from "./CommonModal";
import { Box } from "@mui/material";

const ImageDetailsModal = ({
  imageData,
  open,
  setOpen,
}: { imageData: TImage } & TModalOpenProps) => {
  console.log(imageData);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        fullWidth={true}
        maxWidth={"lg"}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Image details of {`"${imageData.title}"`}</DialogTitle>
        <DialogContent>
          <Box
            component="img"
            src={
              imageData.imageUrl.slice(0, 50) +
              "q_auto,f_auto/" +
              imageData.imageUrl.slice(50)
            }
            alt={imageData.title || "Image"}
            sx={{
              width: "100%",
              maxHeight: 500,
              objectFit: "contain",
              borderRadius: 2,
              mb: 2,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default ImageDetailsModal;
