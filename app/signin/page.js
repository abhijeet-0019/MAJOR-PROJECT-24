'use client'
import { useEffect, useState } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
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

  const { loginStatus, setUser, getAuthHeader } = useAPIAuth();
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
    
    setUser(user).then(success => {
      console.log(user);
      console.log("success -> ", success)
      // const userType = sessionStorage.userType;
      if (success) {
        const userType = sessionStorage.getItem("userType");
        //console.log(userType)
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

  useEffect(() => {
    console.log("Auth Status:", loginStatus, getAuthHeader());
    if (loginStatus) {
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
      ).then(listResponse => {
        const list = listResponse.data;
        const user = list.find((item) => item.email === user_verified_email);

        const userType = user?.user_type || "";
        const user_id = user?.user_id || "";
        console.log("--> userType to be stored in session storage ->", userType);
        sessionStorage.setItem("userType", userType);
        sessionStorage.setItem("userID", user_id);

        if (userType === "admin") {
          console.log("reload from successful sign in")
          router.push("../admin/dashboard");
          // window.location.reload();
        } else if (userType === "applicant") {
          router.push("../client/drives");
          // window.location.reload();
        }
      });
    }
  }, [loginStatus]);

  useEffect(()=>{
    const sreload = sessionStorage.getItem("sreload");
    if(!sreload){
      window.location.reload();
      sessionStorage.setItem("sreload", true);
    }
  }, [])

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
            Sign In
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
              sx={{ mt: 3, mb: 2, color: 'black' }}
              className=" bg-sky-400"
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