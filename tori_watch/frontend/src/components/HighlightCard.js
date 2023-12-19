import React from 'react';
import { Card, CardContent, Typography, Button, Divider, Box } from '@mui/material';

const HighlightCard = ({ title, content, buttonText, onClick, endIcon }) => {
  return (
    <Card style={{ 
      // flex: '1 1 300px',
      margin: '10px',
      borderRadius: '10px',
      overflow: 'hidden',
      minWidth: '200px', // Set a minimum width for each card
      maxWidth: '200px',
      maxWidth: 600,
      borderRadius: '20px'
      }}>
      <CardContent style={{paddingBottom: '5px'}}>
        <Box p={{ xs: 2, sm: 3, md: 4 }} display={'flex'} flex={'row'}>
          <Box>
            <Typography variant="h5" gutterBottom>
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {content.text}
              </Typography>
          </Box>
          {content.item}
        </Box>
        <Divider variant='middle' />
        <Box alignContent="center" >
          {buttonText && (
            <Button variant="text" onClick={onClick} style={{ marginTop: '10px' }} endIcon={endIcon}>
              {buttonText}
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};


export default HighlightCard;
