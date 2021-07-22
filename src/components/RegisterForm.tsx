import {
  Box,
  Typography,
  TextField,
  Button,
  Link,
  IconButton,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import React, { useState } from 'react';

interface FormData {
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

const initialFormData: FormData = {
  username: '',
  email: '',
  password: '',
  passwordConfirmation: '',
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
    setFormData((prevData) => ({
      ...prevData,
      [propName]: value,
    }));
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
        type="email"
        label="Email"
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
      <TextField
        color="primary"
        variant="outlined"
        margin="normal"
        fullWidth
        type={isShowingPassword ? 'text' : 'password'}
        label="Confirm password"
        name="passwordConfirmation"
        value={formData.passwordConfirmation}
        onChange={handleChange}
      />
      <Box
        width="100%"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        padding="10px"
      >
        <Link
          href="/login"
          onClick={(e: any) => {
            e.preventDefault();
            setIsLogginIn(true);
          }}
        >
          <Box fontWeight="bold">Already have an account?</Box>
        </Link>
        <Button type="submit" size="large" variant="contained" color="primary">
          Sign up
        </Button>
      </Box>
    </form>
  );
};

export default RegisterForm;
