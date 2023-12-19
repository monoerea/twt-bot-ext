import { Box, Button, Typography, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
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
            <Box display={'flex'} flexDirection={'row'} 
            justifyContent={'space-evenly'}>
            {itemList.map((item) => (
                <React.Fragment key={item.name}>
                {item.component ? (
                    item.component
                ) : (
                    <div>
                        <Button
                        variant={'contained'}
                        
                        key={item.name}
                        textAlign={'center'}
                        component={item.link ? Link : undefined}
                        to={item.link ? item.link : undefined}
                        onClick={item.onClick}
                        style={{ margin: '0 8px' }}
                        startIcon={item.icon}
                        >
                        {item.name}
                        </Button>
                    </div>
                )}
                </React.Fragment>
            ))}
            {children}
            </Box>
        
        </Box>

    )
}