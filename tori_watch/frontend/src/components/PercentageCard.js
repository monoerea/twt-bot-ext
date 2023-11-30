import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

const PercentageCardComponent = ({ value, label, title, body }) => {
  const animatedProgress = (value > 0 && value <= 100) ? value : 0; // Ensure value is between 0 and 100

  return (
    <Card>
      <CardContent style={{ textAlign: 'center' }}>
        <Typography variant="h6" component="div" style={{ marginBottom: '10px' }}>
          {title}
        </Typography>
        <div style={{ position: 'relative', width: '120px', height: '120px', margin: '0 auto' }}>
          <CircularProgress
            variant="determinate"
            value={animatedProgress}
            size={120}
            thickness={5}
            color={animatedProgress >= 100 ? 'primary' : 'secondary'}
            style={{
              position: 'absolute',
              top: '0',
              left: '0',
              transition: 'all 1s ease-in-out', // Add animation to the circular progress bar
            }}
          />
          <Typography
            variant="h5"
            component="div"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 1,
              color: animatedProgress >= 100 ? 'primary' : 'secondary',
              transition: 'color 0.5s ease-in-out', // Add color transition
            }}
          >
            {animatedProgress}%
          </Typography>
        </div>
        <Typography variant="subtitle1" color="textSecondary" style={{ marginTop: '10px' }}>
          {label}
        </Typography>
        <Typography variant="body2" color="textSecondary" style={{ marginTop: '10px' }}>
          {body}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PercentageCardComponent;
