import { Box, Button, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

export const Header = ({title,items}) => {
    const [itemList,setItems] = useState(items)
    useEffect(() => {
        setItems(items);
      }, [items]);
    console.log('Header', itemList)
    return(
        <Box display={'flex'} justifyContent={"space-between"} alignItems={'center'} p={2}>
            <Typography variant="h3">Welcome to {title}</Typography>
            <Typography variant="h5"> ToriWatch</Typography>
            <Box display={'flex'} flexDirection={'row'} padding={'20px'}justifyContent ={'space-evenly'}>
                {itemList.map((item) => (
                <Button variant={'contained'} key={item.name} component={Link} to={item.link} style={{ margin: '0 8px'}}>
                    {item.name}
                </Button>
                ))}
            </Box>
        </Box>

    )
}