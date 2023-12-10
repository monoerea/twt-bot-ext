import React, { useState } from "react";
import {
  Button,
  TextField,
  Grid,
  Typography,
  FormControlLabel,
  Checkbox,
  Paper,
  Box,
  createTheme,
  ThemeProvider,
  CssBaseline,
  Avatar,
  Container,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link, useNavigate } from "react-router-dom";

import AppBarComponent from "./AppBar";

const NotFound404 = () =>{
    return(
        <ThemeProvider theme={createTheme()}>
            <CssBaseline />
            <Container >
                <div>
                    <AppBarComponent/>
                    <h2>PAGE NOT FOUND</h2>
                </div>
                
            </Container>

        </ThemeProvider>
       
    );
};

export default NotFound404;