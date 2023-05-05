import { makeStyles } from "@mui/styles";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GETPOST } from "../ApiUrl";
import { themes } from "../Helpers/Theme";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../Firebase-config";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from "react-router-dom";
import { Grid, Modal, Box, TextField, Typography } from "@mui/material";

const PostDetails = () => {
  const DetailsStyles = makeStyles((theme) => ({
    root: {
      padding: "100px 50px",
      backgroundColor: themes.palette.primary.maindark,
      color: themes.palette.primary.offwhite,
      height: "100vh",
      [theme.breakpoints.down("sm")]: {
        padding: "100px 13px",
      },
    },
  }));
  const classes = DetailsStyles();
  const HomeStyles = makeStyles((theme) => ({
    root: {
      padding: "100px 50px",
      backgroundColor: themes.palette.primary.maindark,
      [theme.breakpoints.down("sm")]: {
        padding: "100px 10px",
      },
    },
    modalstyle: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "70%",
      height: "90%",
      backgroundColor: themes.palette.primary.white,
      boxShadow: 24,
      padding: "20px 15px",
      [theme.breakpoints.down("sm")]: {
        width: "80%",
        height: "80%",
      },
    },
    textDiv: {
      display: "flex",
      flexDirection: "column",
      alignItem: "center",
      justifyContent: "center",
      margin: "0 auto",
    },
    input: {
      margin: "0 auto",
      width: "100%",
      padding: "10px 20px",
    },
    spaceY: {
      padding: "16px 0",
    },
    buttonStyles: {
      backgroundColor: themes.palette.primary.darkbtn,
      borderRadius: "3px",
      color: themes.palette.primary.white,
      padding: "10px 18px",
      fontWeight: "600",
      fontSize: "16px",
      cursor: "pointer",
      border: "none",
      margin: "20px 0",
    },
    titleDiv: {
      display: "flex",
      alignItem: "center",
      justifyContent: "space-between",
      color: themes.palette.primary.white,
      padding: "0 14px",
    },
    text: {
      fontWeight: "bold",
      color: themes.palette.primary.offwhite,
      [theme.breakpoints.down("sm")]: {
        marginRight: 10,
      },
    },
    created: {
      backgroundColor: themes.palette.primary.darkbtn,
      position: "absolute",
      right: 5,
      top: 7,
      zIndex: 2,
      borderRadius: 6,
      padding: "10px 40px",
      animationDuration: "3s",
      animationName: "created",
    },
    "@keyframes created": {
      from: {
        marginLeft: "100%",
        width: "400%",
      },
      to: {
        marginLeft: "0%",
        width: "100%",
      },
    },
  }));
  const classess = HomeStyles();

  const [postdetails, setPostDetails] = useState({});
  let { id } = useParams();
  const [UID, setUID] = useState("");
  const [open, setOpen] = useState(false);
  const [body, setBody] = useState( "" );
  const [title, setTitle] = useState( "" );

  auth.onAuthStateChanged((user) => {
    if (user) {
      // User logged in already or has just logged in.
      setUID(user.uid)
    } else {
      // User not logged in or has just logged out.
    }
  });
  const handleOpen = () => {
   
      setOpen(true);
    
  };
  const handleClose = () => {
    setOpen(false);
  };
  let navigate = useNavigate();
  const fetchPost = async (id) => {
      
    const docRef = doc(db, "posts", `${id}`);
    const docSnap = await getDoc(docRef);
    console.log(docSnap.data());
    setPostDetails(docSnap.data());
    setBody(docSnap.data().blog)
    setTitle(docSnap.data().title)
  };
  useEffect(() => {
   
    fetchPost(id);
  }, []);
  


const handleEdit=(id,UID)=>{
handleOpen()

}

const handleDelete=(id,UID)=>{
  const docRef = doc(db, `posts/${id}`);
  deleteDoc(docRef)
  navigate("/");

}
const saveChanges=(id)=>{
  const docRef1 = doc(db, `posts/${id}`);
  const data1 = {
    title,
    blog:body,
    uid:UID
    };
  updateDoc(docRef1, data1).then(()=>{
    handleClose()
    navigate(`/`);

  })
}

  return (
    <div className={classes.root}>
      <div className="flex justify-center lg:px-0">
      <div className={`${postdetails.uid &&  postdetails.uid== UID ? " w-3/4 lg:w-2/4 flex justify-end" : "w-full flex justify-center"}`}>
        <h2 className="text-xl font-bold mb-10 lg:mb-5 lg:mb-7">{postdetails.title}</h2>

      </div>
      {postdetails.uid &&  postdetails.uid== UID &&
      <div className="w-1/4 lg:w-2/4 flex justify-end lg:pr-10 mr-3" >
      <div className="cursor-pointer" onClick={()=>handleEdit(id,UID)}>
        <EditIcon />
      </div>
      <div onClick={()=>handleDelete(id,UID)} className="pl-4 lg:ml-10 cursor-pointer">
        <DeleteIcon />
      </div>
    </div>
      }
      </div>
      <Modal open={open} onClose={handleClose}>
          <Box className={classess.modalstyle}>
            <div className={classess.textDiv}>
              <Typography className={classess.spaceY} variant="h5">
                Title
              </Typography>
              <TextField
                id="outlined-basic"
                variant="outlined"
                className={classess.input}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Typography className={classess.spaceY} variant="h5">
                Body
              </Typography>
              <TextField
                id="outlined-multiline-static"
                multiline
                rows={10}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="write a post..."
                className={classess.input}
              />
            </div>
            <div>
              <button
                type="submit"
                variant="contained"
                className={classess.buttonStyles}
                onClick={()=>{saveChanges(id)}}
              >
                Save Changes
              </button>
            </div>
          </Box>
        </Modal>
      <div>{postdetails.blog}</div>
    </div>
  );
};

export default PostDetails;

