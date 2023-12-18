import React from "react";
import { Home, BarChart, AdminPanelSettings, Group, PostAdd, Inbox, Mail} from "@mui/icons-material";
import { ArrowForward } from "@mui/icons-material";

import { logoutUser } from "./api";


export const drawerItems = [
    { icon: <Home/>,               text: 'Home',    link: '/' },
    { icon: <Group/>,              text: 'Users',   link:'/admins/user'},
    { icon: <PostAdd/>,            text: 'Posts',   link:'/admin/posts'},
    { icon: <BarChart/>,           text: 'Charts',  link: '/charts' },
    { icon: <AdminPanelSettings/>, text: 'Admin',   link: '/admins/user' },
  ];
 export const pages = [
    { title: 'Home', link: '/' },
    { title: 'About', link: '/about' },
    { title: 'Contact', link: '/contact' },
    // Add more pages as needed
  ];
  export const highlightItems = [
    {
      title: 'User',
      content: {
        text: 'Lorem ipsum Lorem ipsumLorem ipsum Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsum Lorem ipsum',
        item: 'Bruh ipsum',
      },
      buttonText: 'Say Hi',
      endIcon: <ArrowForward />,
    },
    {
      title: 'User',
      content: {
        text: 'Lorem ipsum Lorem ipsumLorem ipsum Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsum Lorem ipsum',
        item: 'Bruh ipsum',
      },
      buttonText: 'Say Hi',
      endIcon: <ArrowForward />,
    },
    {
      title: 'User',
      content: {
        text: 'Lorem ipsum Lorem ipsumLorem ipsum Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsum Lorem ipsum',
        item: 'Bruh ipsum',
      },
      buttonText: 'Say Hi',
      endIcon: <ArrowForward />,
    },
  ];
  export const settings = [
    { label: 'Profile', onClick: () => console.log('Profile clicked') },
    { label: 'Account', onClick: () => console.log('Account clicked') },
    { label: 'Dashboard', onClick: () => console.log('Dashboard clicked'), link: '/dashboard/1' },
    { label: 'Logout', onClick: () => { console.log('Logout clicked'); logoutUser(); },
    link: '/' },
  ];
  
 export const items = [
  { section: 'Section 1' },
  { text: 'Item 1', icon: <Inbox />, link:'/' },
  { text: 'Item 2', icon: <Mail />,  link:'/' },
  { section: 'Section 2' },
  { text: 'Item 3', icon: <Inbox />, link:'/' },
  { text: 'Item 4', icon: <Mail />,  link:'/' },
];