import React from 'react'
import { TextField, InputAdornment, IconButton, Grid } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const Input = ({ name, label, type, autoFocus, half, handleChange, handleShowPassword }) => {
  return (
    <Grid item xs={6} sm={half ? 6 : 12}>
      <TextField
        name={name}
        label={label}
        type={type}
        autoFocus={autoFocus}
        onChange={handleChange}
        variant='outlined'
        // required
        fullWidth

        InputProps={name === 'password' ? {
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton onClick={handleShowPassword}>
                {type === 'password' ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </IconButton>
            </InputAdornment>
          ),
        } : null}
      />
    </Grid>
  )
}

export default Input
