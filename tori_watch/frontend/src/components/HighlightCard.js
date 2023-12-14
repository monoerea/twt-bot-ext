import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';

const HighlightCard = ({ title, content, buttonText, onClick }) => {
  return (
    <Card style={{ maxWidth: 300, margin: '10px', borderRadius: '10px' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {content}
        </Typography>
        {buttonText && (
          <Button variant="contained" onClick={onClick} style={{ marginTop: '10px' }}>
            {buttonText}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default HighlightCard;
