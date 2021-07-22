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
  email: string;
  password: string;
}

const initialFormData: FormData = {
  email: '',
  password: '',
};

interface Props {
  setIsLogginIn: (isLoggingIn: boolean) => void;
}

const LoginForm: React.FC<Props> = ({ setIsLogginIn }) => {
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
        Log in
      </Typography>
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
        label="Password"
        name="password"
        value={formData.password}
        onChange={handleChange}
      />
      <Box
        width="100%"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        padding="10px"
      >
        <Box>
          <Link
            href="/login"
            onClick={(e: any) => {
              e.preventDefault();
              setIsLogginIn(false);
            }}
          >
            <Box fontWeight="bold">Forgot password</Box>
          </Link>
          <Link
            href="/login"
            onClick={(e: any) => {
              e.preventDefault();
              setIsLogginIn(false);
            }}
          >
            <Box fontWeight="bold">Register</Box>
          </Link>
        </Box>
        <Button type="submit" size="large" variant="contained" color="primary">
          Log in
        </Button>
      </Box>
    </form>
  );
};

export default LoginForm;
