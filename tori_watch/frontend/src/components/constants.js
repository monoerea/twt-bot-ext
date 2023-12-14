import React from "react";
import { Home, BarChart, AdminPanelSettings, Group, PostAdd} from "@mui/icons-material";
export const drawerItems = [
    { icon: <Home/>,               text: 'Home',    link: '/' },
    { icon: <Group/>,              text: 'Users',   link:'/admins/user'},
    { icon: <PostAdd/>,            text: 'Posts',   link:'/admin/posts'},
    { icon: <BarChart/>,           text: 'Charts',  link: '/charts' },
    { icon: <AdminPanelSettings/>, text: 'Admin',   link: '/admins/user' },
  ];