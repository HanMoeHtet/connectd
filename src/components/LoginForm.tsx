import {
  Box,
  Typography,
  TextField,
  Button,
  Link,
  IconButton,
  Divider,
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
        label="Password"
        name="password"
        value={formData.password}
        onChange={handleChange}
      />
      <Link
        href="/login"
        onClick={(e: any) => {
          e.preventDefault();
          setIsLogginIn(false);
        }}
        underline="hover"
      >
        <Box fontWeight="bold" marginTop="15px">
          Forgot password?
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
          Log in
        </Button>
      </Box>
      <Divider />
      <Link
        href="/login"
        onClick={(e: any) => {
          e.preventDefault();
          setIsLogginIn(false);
        }}
        underline="hover"
      >
        <Typography>
          <Box fontWeight="bold" marginTop="15px" textAlign="center">
            Create new account
          </Box>
        </Typography>
      </Link>
    </form>
  );
};

export default LoginForm;
