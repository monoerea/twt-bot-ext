import React from "react";
import { Home, BarChart, AdminPanelSettings, Group, PostAdd} from "@mui/icons-material";
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
    { title: 'User', content: 'Lorem ipsum Lorem ipsumLorem ipsum Lorem ipsum', buttonText: 'Say Hi' },
    { title: 'User', content: 'Lorem ipsum Lorem ipsumLorem ipsum Lorem ipsum', buttonText: 'Say Hi' },
    { title: 'User', content: 'Lorem ipsum Lorem ipsumLorem ipsum Lorem ipsum', buttonText: 'Say Hi' },
  ];
 export const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];