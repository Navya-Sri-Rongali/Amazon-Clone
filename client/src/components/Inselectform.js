import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Signin from "./Signin";
import axios from 'axios'

import Register from "./Register";
import Adminregister from "./Adminregister";
import Adminsignin from "./Adminsignin";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function BasicSelect() {
  const [age, setAge] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [content, setcontent] = React.useState(null);
  const [user, setuser] = React.useState(false);
  const handleClickOpen = (arg) => {
    setcontent(arg);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  React.useEffect(() => {
    if (localStorage.getItem("Token") || localStorage.getItem("AdminToken")) {
      setuser(true);
    }
  }, [user]);

  return (
    <Box sx={{ minWidth: 100 }}>
      <FormControl fullWidth>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          {user ? (
            <Button
              onClick={() => {
                if ('AdminToken') {
                  localStorage.removeItem('AdminToken');
                }
                if ("Token") {
                  localStorage.removeItem("Token");
                }
                axios.delete("http://localhost:5000/logout").then((res) => {
                  console.log(res.token)
                });
                setuser(false);
              }}
            >
              Signout
            </Button>
          ) : (
            <>
              <Button
                onClick={() => {
                  handleClickOpen("Su");
                }}
              >
                Singin As User
              </Button>
              <br />
              <Button
                onClick={() => {
                  handleClickOpen("Ru");
                }}
              >
                Register as User
              </Button>
              <br />
              <Button
                onClick={() => {
                  handleClickOpen("Ra");
                }}
              >
                Register as Admin
              </Button>
              <br />
              <Button
                onClick={() => {
                  handleClickOpen("Sa");
                }}
              >
                Singin As Admin
              </Button>
            </>
          )}
        </Select>
      </FormControl>

      {/* Dialouge */}
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {content === "Sa" ? (
              <Adminsignin />
            ) : content === "Ra" ? (
              <Adminregister />
            ) : content === "Su" ? (
              <Signin />
            ) : content === "Ru" ? (
              <Register />
            ) : (
              <>Signout</>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </Box>
  );
}
