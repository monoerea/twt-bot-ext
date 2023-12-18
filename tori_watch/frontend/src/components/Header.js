import { Box, Button, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

export const Header = ({ children, title, items, text }) => {
    const [itemList,setItems] = useState(items)
    useEffect(() => {
        setItems(items);
      }, [items]);
    console.log('Header', itemList)
    return(
        <Box display={'flex'} justifyContent={"space-between"} alignItems={'center'} p={2}>
            <Box display={'flex'} flexDirection={'column'}>
                <Typography variant="h4">Welcome to {title}</Typography>
                {text && 
                <Typography variant="body1" >{text}</Typography>}
            </Box>
            <Box display={'flex'} flexDirection={'row'} padding={'20px'}justifyContent ={'space-evenly'}>
                {itemList.map((item) => (
                <Button variant={'contained'} key={item.name} textAlign ={'center'} component={Link} to={item.link} style={{ margin: '0 8px'}} startIcon={item.icon}>
                    {item.name}
                </Button>
                ))}
                {children}
            </Box>
            
        </Box>

    )
}