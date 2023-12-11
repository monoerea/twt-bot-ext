import React from 'react';
import { Box, Button, Checkbox, FormControlLabel, Grid, Link, TextField } from '@mui/material';
import PasswordField from './PasswordField';  // Adjust the import path based on your project structure
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function SignUpFormFields({ formFields, formErrors, showPassword, setShowPassword, handleChange, handleSubmit }) {
  return (
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        {formFields.map((field) => (
          <Grid item xs={12} key={field.id}>
            {field.type === 'password' ? (
              <PasswordField
                formErrors={formErrors}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                handleChange={handleChange}
              />
            ) : (
              <TextField
                error={Boolean(formErrors[field.id])}
                helperText={formErrors[field.id] || ''}
                required
                fullWidth
                id={field.id}
                label={field.label}
                name={field.id}
                type={field.type}
                autoComplete={field.autoComplete}
                onChange={handleChange}
              />
            )}
          </Grid>
        ))}
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox value="allowExtraEmails" color="primary" />}
            label="I want to receive inspiration, marketing promotions and updates via email."
          />
        </Grid>
      </Grid>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Sign Up
      </Button>
      <Grid container justifyContent="flex-end">
        <Grid item>
          <Link href="/sign_in" variant="body2">
            Already have an account? Sign in
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
}

export default SignUpFormFields;
