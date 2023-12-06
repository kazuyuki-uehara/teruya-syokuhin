import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Stack } from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  text: string
  submit : ()=>void;
  cancelButton? : boolean
}

const AlertBox = ({ open, setOpen,text,submit,cancelButton=false }: Props) => {
  const handleClose = () => setOpen(false);

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {text}
          </Typography>
          <Stack direction="row" marginTop={5} justifyContent="flex-end" spacing={2}>
            {cancelButton &&<Button variant="contained" onClick={handleClose} sx={{backgroundColor:"red"}}>キャンセル</Button>}
            <Button variant="contained" onClick={submit} >OK</Button>
        </Stack>
        </Box>
       
      </Modal>
    </>
  );
};

export default AlertBox;
