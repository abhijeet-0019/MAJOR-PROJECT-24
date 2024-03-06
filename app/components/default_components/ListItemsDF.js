'use client'

import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Link from 'next/link'
import Avatar from '@mui/material/Avatar';
import Image from 'next/image'
import BusinessIcon from '@mui/icons-material/Business';
import HandshakeIcon from '@mui/icons-material/Handshake';
import InfoIcon from '@mui/icons-material/Info';
import FitbitIcon from '@mui/icons-material/Fitbit';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import GroupsIcon from '@mui/icons-material/Groups';

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
    <Link href="/d_f/about_tpo">
      <ListItemButton onClick={() => updateAppBarText('About')}>
        <ListItemIcon>
          <FitbitIcon />
        </ListItemIcon>
        <ListItemText primary="About" />
      </ListItemButton>
    </Link>
    <Link href="/d_f/team_tpo">
      <ListItemButton onClick={() => updateAppBarText('Team TPO')}>
        <ListItemIcon>
          <GroupsIcon />
        </ListItemIcon>
        <ListItemText primary="Team TPO" />
      </ListItemButton>
    </Link>
    <Link href="/d_f/p_stats">
      <ListItemButton onClick={() => updateAppBarText('Placement Stats')}>
        <ListItemIcon>
          <QueryStatsIcon />
        </ListItemIcon>
        <ListItemText primary="Placement Stats" />
      </ListItemButton>
    </Link>
    <Link href="/">
      <ListItemButton onClick={() => updateAppBarText('MBM Brochure')}>
        <ListItemIcon>
          <InfoIcon />
        </ListItemIcon>
        <ListItemText primary="MBM Brochure" />
      </ListItemButton>
    </Link>
    <Link href="/">
      <ListItemButton onClick={() => updateAppBarText('Alumni Connect')}>
        <ListItemIcon>
          <HandshakeIcon />
        </ListItemIcon>
        <ListItemText primary="Alumi Connect" />
      </ListItemButton>
    </Link>
    <Link href="/">
      <ListItemButton onClick={() => updateAppBarText('Company Connect')}>
        <ListItemIcon>
          <BusinessIcon />
        </ListItemIcon>
        <ListItemText primary="Company Connect" />
      </ListItemButton>
    </Link>
  </React.Fragment>
);