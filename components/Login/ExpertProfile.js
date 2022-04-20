import { FormHelperText, Grid, InputLabel, TextField } from '@mui/material';
import React from 'react';

const ExpertProfile = (props) => {
  return (
    <>
      <Grid item xs={12} sm={6}>
        <InputLabel> Name * </InputLabel>
        <TextField
          required
          variant="outlined"
          sx={{ mt: 1 }}
          fullWidth
          name="firstname"
          autoComplete="firstname"
          placeholder="Your Name"
          value={firstname}
          disabled={displayeditprofile ? false : true}
          onChange={(e) =>
            displayeditprofile ? setfirstname(e.target.value) : null
          }
          error={!!firstnameErr}
        />
        <FormHelperText error={!!firstnameErr}>{firstnameErr}</FormHelperText>
      </Grid>
      <Grid item xs={12} sm={6}>
        <InputLabel> Username * </InputLabel>
        <TextField
          required
          variant="outlined"
          sx={{ mt: 1 }}
          fullWidth
          name="firstname"
          autoComplete="firstname"
          placeholder="Your username"
          value={firstname}
          disabled={displayeditprofile ? false : true}
          onChange={(e) =>
            displayeditprofile ? setfirstname(e.target.value) : null
          }
          error={!!firstnameErr}
        />
        <FormHelperText error={!!firstnameErr}>{firstnameErr}</FormHelperText>
      </Grid>
      <Grid item xs={12} sm={6}>
        <InputLabel> First Name * </InputLabel>
        <TextField
          required
          variant="outlined"
          sx={{ mt: 1 }}
          fullWidth
          name="firstname"
          autoComplete="firstname"
          placeholder="Your First Name"
          value={firstname}
          disabled={displayeditprofile ? false : true}
          onChange={(e) =>
            displayeditprofile ? setfirstname(e.target.value) : null
          }
          error={!!firstnameErr}
        />
        <FormHelperText error={!!firstnameErr}>{firstnameErr}</FormHelperText>
      </Grid>
    </>
  );
};

export default ExpertProfile;
