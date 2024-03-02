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
    <Link href="/drives">
      <ListItemButton onClick={() => updateAppBarText('Drives')}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Drives" />
      </ListItemButton>
    </Link>
    <Link href="/profile">
      <ListItemButton onClick={() => updateAppBarText('Profile')}>
        <ListItemIcon>
          <AccountCircleIcon />
        </ListItemIcon>
        <ListItemText primary="Profile" />
      </ListItemButton>
    </Link>
    <Link href="/faq">
      <ListItemButton onClick={() => updateAppBarText('FAQ')}>
        <ListItemIcon>
          <HelpCenterIcon />
        </ListItemIcon>
        <ListItemText primary="FAQ" />
      </ListItemButton>
    </Link>
    <Link href="/support">
      <ListItemButton onClick={() => updateAppBarText('Support')}>
        <ListItemIcon>
          <SupportIcon />
        </ListItemIcon>
        <ListItemText primary="Support" />
      </ListItemButton>
    </Link>
  </React.Fragment>
);