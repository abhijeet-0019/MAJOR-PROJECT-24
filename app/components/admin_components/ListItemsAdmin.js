'use client'

import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Link from 'next/link'
import Avatar from '@mui/material/Avatar';
import Image from 'next/image'
import LogoutIcon from '@mui/icons-material/Logout';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import WorkIcon from '@mui/icons-material/Work';
import ListAltIcon from '@mui/icons-material/ListAlt';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import cookies from 'js-cookie';

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
    <Link href="/admin/dashboard">
      <ListItemButton onClick={() => updateAppBarText('Dashboard')}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
    </Link>
    <Link href="/admin/drives">
      <ListItemButton onClick={() => updateAppBarText('Drives')}>
        <ListItemIcon>
          <WorkIcon />
        </ListItemIcon>
        <ListItemText primary="Drives" />
      </ListItemButton>
    </Link>
    <Link href="/admin/calendar">
      <ListItemButton onClick={() => updateAppBarText('Calendar')}>
        <ListItemIcon>
          <CalendarTodayIcon />
        </ListItemIcon>
        <ListItemText primary="Calendar" />
      </ListItemButton>
    </Link>
    <Link href="/admin/students">
      <ListItemButton onClick={() => updateAppBarText('Student List')}>
        <ListItemIcon>
          <ListAltIcon />
        </ListItemIcon>
        <ListItemText primary="Student List" />
      </ListItemButton>
    </Link>
    <Link href="/admin/companies">
      <ListItemButton onClick={() => updateAppBarText('Company List')}>
        <ListItemIcon>
          <LocalLibraryIcon />
        </ListItemIcon>
        <ListItemText primary="Company List" />
      </ListItemButton>
    </Link>
    <Link href={"/signin"}>
      <ListItemButton onClick={() => {
        localStorage.clear();
        sessionStorage.clear();
        cookies.remove('accessToken');
        cookies.remove('refreshToken');
        // window.location.reload();
      }}>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItemButton>
    </Link>
  </React.Fragment>
);