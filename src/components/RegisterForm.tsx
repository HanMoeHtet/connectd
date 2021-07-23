import {
  Box,
  Typography,
  TextField,
  Button,
  Link,
  IconButton,
  Grid,
} from '@material-ui/core';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import React, { useState } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

interface FormData {
  username: string;
  email: string;
  password: string;
  birthday: Date;
  pronouns: {
    subject: string;
    object: string;
    possessive: string;
  };
}

const initialFormData: FormData = {
  username: '',
  email: '',
  password: '',
  birthday: new Date(),
  pronouns: {
    subject: '',
    object: '',
    possessive: '',
  },
};

interface Props {
  setIsLogginIn: (isLoggingIn: boolean) => void;
}

const RegisterForm: React.FC<Props> = ({ setIsLogginIn }) => {
  const [formData, setFormData] = React.useState<FormData>(initialFormData);
  const [isShowingPassword, setIsShowingPassword] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const propName = event.target.name;
    const value = event.target.value;
    if (propName.split('.')[0] === 'pronouns') {
      setFormData({
        ...formData,
        pronouns: { ...formData.pronouns, [propName.split('.')[1]]: value },
      });
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [propName]: value,
      }));
    }
  };

  const handleDateChange = (
    date: MaterialUiPickersDate,
    value?: string | null | undefined
  ) => {
    if (date) {
      setFormData((prevData) => ({
        ...prevData,
        birthday: date,
      }));
    }
  };

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h4" color="primary" align="center">
        Sign up
      </Typography>
      <TextField
        color="primary"
        variant="outlined"
        margin="normal"
        fullWidth
        type="texxt"
        label="Username"
        name="username"
        value={formData.username}
        onChange={handleChange}
      />
      <TextField
        color="primary"
        variant="outlined"
        margin="normal"
        fullWidth
        type="text"
        label="Email or phone number"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      <TextField
        color="primary"
        variant="outlined"
        margin="normal"
        fullWidth
        InputProps={{
          endAdornment: (
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setIsShowingPassword(!isShowingPassword)}
            >
              {isShowingPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          ),
        }}
        type={isShowingPassword ? 'text' : 'password'}
        label="Password"
        name="password"
        value={formData.password}
        onChange={handleChange}
      />
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          fullWidth
          variant="dialog"
          margin="normal"
          id="date-picker-dialog"
          label="Birthday"
          format="dd/MM/yyyy"
          value={formData.birthday}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </MuiPickersUtilsProvider>
      <Box marginTop="20px">
        <Typography
          color="primary"
          variant="body2"
          style={{ fontWeight: 'bold' }}
        >
          Tell us how we should call you.
        </Typography>
        <Grid container>
          <Grid item container xs={12} sm={4} justifyContent="center">
            <Box marginX="10px">
              <TextField
                color="primary"
                variant="outlined"
                margin="normal"
                type="text"
                placeholder="e.g. he"
                name="pronouns.subject"
                value={formData.pronouns.subject}
                onChange={handleChange}
              />
            </Box>
          </Grid>
          <Grid item container xs={12} sm={4} justifyContent="center">
            <Box marginX="10px">
              <TextField
                color="primary"
                variant="outlined"
                margin="normal"
                type="text"
                placeholder="e.g. him"
                name="pronouns.object"
                value={formData.pronouns.object}
                onChange={handleChange}
              />
            </Box>
          </Grid>
          <Grid item container xs={12} sm={4} justifyContent="center">
            <Box marginX="10px">
              <TextField
                color="primary"
                variant="outlined"
                margin="normal"
                type="text"
                placeholder="e.g. his"
                name="pronouns.possessive"
                value={formData.pronouns.possessive}
                onChange={handleChange}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Link
        href="/login"
        underline="hover"
        onClick={(e: any) => {
          e.preventDefault();
          setIsLogginIn(true);
        }}
      >
        <Box fontWeight="bold" marginTop="15px">
          Already have an account?
        </Box>
      </Link>
      <Box marginTop="15px">
        <Button
          fullWidth
          type="submit"
          size="large"
          variant="contained"
          color="primary"
        >
          Sign up
        </Button>
      </Box>
    </form>
  );
};

export default RegisterForm;
