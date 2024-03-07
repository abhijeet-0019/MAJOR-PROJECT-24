'use client'

import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import SupportIcon from '@mui/icons-material/Support';
import Link from 'next/link'
import Avatar from '@mui/material/Avatar';
import Image from 'next/image'
import LogoutIcon from '@mui/icons-material/Logout';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import cookies from 'js-cookie';
import { useRouter } from 'next/navigation';


export const mainListItems = ({ updateAppBarText }) => (
 
  <React.Fragment>
    {/* <Avatar sx={{width: 100, height: 100, display:'flex', justifyContent: 'center'}} >
    <Image
      src="/utils/mbmulogo.png"
      width={500}
      height={500}
      alt="Picture of the author"
    />
    </Avatar> */}
   
    <Link href="/client/drives">
      <ListItemButton onClick={() => updateAppBarText('Drives')}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Drives" />
      </ListItemButton>
    </Link>
    <Link href="/client/notification">
      <ListItemButton onClick={() => updateAppBarText('Notifications')}>
        <ListItemIcon>
          <CircleNotificationsIcon />
        </ListItemIcon>
        <ListItemText primary="Notifications" />
      </ListItemButton>
    </Link>
    <Link href="/client/profile">
      <ListItemButton onClick={() => updateAppBarText('Profile')}>
        <ListItemIcon>
          <AccountCircleIcon />
        </ListItemIcon>
        <ListItemText primary="Profile" />
      </ListItemButton>
    </Link>
    <Link href="/client/prep_material">
      <ListItemButton onClick={() => updateAppBarText('Preparation Material')}>
        <ListItemIcon>
          <MenuBookIcon />
        </ListItemIcon>
        <ListItemText primary="Preparation Material" />
      </ListItemButton>
    </Link>
    <Link href="/client/faq">
      <ListItemButton onClick={() => updateAppBarText('FAQ')}>
        <ListItemIcon>
          <HelpCenterIcon />
        </ListItemIcon>
        <ListItemText primary="FAQ" />
      </ListItemButton>
    </Link>
    <Link href="/client/support">
      <ListItemButton onClick={() => updateAppBarText('Support')}>
        <ListItemIcon>
          <SupportIcon />
        </ListItemIcon>
        <ListItemText primary="Support" />
      </ListItemButton>
    </Link>
    <Link href="/client/drives">
      <ListItemButton onClick={() => updateAppBarText('Logout')}>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItemButton>
    </Link>
    <Link>
    <ListItemButton onClick={()=>{
      localStorage.clear();
      cookies.remove('access token');
      cookies.remove('refresh token');
      window,location.reload;
    }}>
      <ListItemIcon>
        <LogoutIcon />
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItemButton>
    </Link>

  </React.Fragment>
);