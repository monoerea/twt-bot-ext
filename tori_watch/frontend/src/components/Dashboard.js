import React from 'react';
import { styled, createTheme, ThemeProvider, CssBaseline, Drawer, AppBar, Toolbar, List, Typography, Divider, IconButton, ListItem, ListItemIcon, ListItemText, Container, Paper } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import {Chart as ChartJS, CategoryScale, BarElement, LinearScale} from 'chart.js'
import { Home as HomeIcon, BarChart as BarChartIcon, Settings as SettingsIcon } from '@mui/icons-material';

ChartJS.register(CategoryScale, LinearScale, BarElement);  

const drawerWidth = 240;

const AppBarStyled = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerStyled = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  })
);

const defaultTheme = createTheme();

const Dashboard = () => {
  const [open, setOpen] = React.useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const chartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Monthly Sales',
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.4)',
        hoverBorderColor: 'rgba(75,192,192,1)',
      },
    ],
  };
  
  const chartOptions = {
    scales: {
      x: {
        type: 'category',
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  const drawerItems = [
    { icon: <HomeIcon />, text: 'Home' },
    { icon: <BarChartIcon />, text: 'Charts' },
    { icon: <SettingsIcon />, text: 'Settings' },
  ];

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppBarStyled open={open}>
        <Toolbar>
          <IconButton onClick={toggleDrawer}>
            <Typography variant="h6" noWrap>
              Dashboard
            </Typography>
          </IconButton>
        </Toolbar>
      </AppBarStyled>
      <DrawerStyled variant="permanent" open={open}>
        <Toolbar />
        <Divider />
        <List>
          {drawerItems.map((item, index) => (
            <ListItem key={index}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              {open && <ListItemText primary={item.text} />}
            </ListItem>
          ))}
        </List>
      </DrawerStyled>
      <Container>
        <Typography variant="h4" style={{ marginTop: '20px' }}>
          Welcome to the Dashboards
        </Typography>
        <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
          <Bar data={chartData} options={chartOptions} />
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default Dashboard;
