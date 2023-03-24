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
import Shopping1 from './shopping1.png'
import Register from "./Register";
import Adminregister from "./Adminregister";
import Adminsignin from "./Adminsignin";

import './Frontpage.css'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function BasicSelect() {
  const [age, setAge] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [content, setcontent] = React.useState(null);
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

  return (
    <div className="frontpage">
      <img
        src={Shopping1}
        className="back-image"
      ></img>
      <div className="frontpage_container">
        
        <Box>
          <FormControl className="signinbox" fullWidth>
            <InputLabel id="demo-simple-select-label">SignIn</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label="Age"
              onChange={handleChange}
            >
              <Button
                onClick={() => {
                  handleClickOpen("Su");
                }}
                className="btns"
              >
                Singin As User
              </Button>
              <br />
              <Button
                onClick={() => {
                  handleClickOpen("Ru");
                }}
                className="btns"
              >
                Register as User
              </Button>
              <br />
              <Button
                onClick={() => {
                  handleClickOpen("Ra");
                }}
                className="btns"
              >
                Register as Admin
              </Button>
              <br />
              <Button
                onClick={() => {
                  handleClickOpen("Sa");
                }}
                className="btns"
              >
                Singin As Admin
              </Button>
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
                  <></>
                )}
              </DialogContentText>
            </DialogContent>
            <DialogActions></DialogActions>
          </Dialog>
        </Box>
      </div>
    </div>
  );
}
