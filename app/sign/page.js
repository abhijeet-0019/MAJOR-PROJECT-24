'use client'
import { useEffect, useState } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useAPIData from "../../apiConfig/useAPIData";
import useAPIAuth from "../../apiConfig/useAPIAuth";
import { useRouter } from "next/navigation";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        TPO MBM
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignIn() {

  const { loginStatus,setUser,getAuthHeader} = useAPIAuth();
  const { getItems } = useAPIData();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleUsernameChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault(); 
    const user = { email, password };
    /*try {
      const response = await fetch("https://api.mbm.ac.in/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, mode: "json" }),
      });
      console.log(response, " fetching");
  
      if (response.ok) {
        // If login is successful
        setUser(user).then((success) => {
          console.log(user);
          console.log("success -> ", success);
          if (success) {
            router.push("../profile");
          } else {
            alert("Incorrect Login Credentials");
          }
        });
      } else {
        // If login fails
        console.log("Login failed");
        alert("Login failed");
      }
    } catch (error) {
      console.log(error, "errorr");
      alert("Error during login");
    }
    */
    setUser(user).then(success=>{
      console.log(user);
      console.log("success -> ", success)
      if (success) {
        if (userType === "admin") {
          router.push("../admin/dashboard");
        } else if (userType === "applicant") {
          router.push("../client/drives");
        }
      } else {
        alert("Incorrect Login Credentials");
      }
    });    
  };
  

  useEffect(()=>{
    console.log("Auth Status:",loginStatus, getAuthHeader());
    if(loginStatus){
    console.log(sessionStorage.getItem("userEmail"));
        const user_verified_email = sessionStorage.getItem("userEmail");
        getItems(
          "TPO_students_personal_details",
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          true
        ).then(listResponse=>{
          const list = listResponse.data;
          const user = list.find((item) => item.email === user_verified_email);
          
          const userType = user?.user_type || "";
          const user_id = user?.user_id || "";
          console.log("--> userType to be stored in session storage ", userType);
          sessionStorage.setItem("userType", userType);
          sessionStorage.setItem("userID", user_id);

          /*if (userType === "admin") {
            router.push("../admin/dashboard");
          } else if (userType === "applicant") {
            router.push("../client/drives");
          }*/
        });
      }
  },[loginStatus]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ color: 'black', fontWeight: 'bold' }}> 
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleUsernameChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handlePasswordChange}
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, color:'black', bgcolor: 'blue' }}
            >
              Sign In
            </Button>
            
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}