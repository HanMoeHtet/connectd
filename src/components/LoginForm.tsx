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
import { useAppDispatch } from 'src/store';
import { logInWithEmail, logInWithPhoneNumber } from 'src/store/auth';
import { LogInError } from 'src/types/lib';

interface FormData {
  emailOrPhoneNumber: string;
  password: string;
}

const initialFormData: FormData = {
  emailOrPhoneNumber: '',
  password: '',
};

interface Props {
  setIsLogginIn: (isLoggingIn: boolean) => void;
}

const LoginForm: React.FC<Props> = ({ setIsLogginIn }) => {
  const dispatch = useAppDispatch();

  const [formData, setFormData] = React.useState<FormData>(initialFormData);
  const [isShowingPassword, setIsShowingPassword] = useState(false);
  const [errors, setErrors] = useState<LogInError>({});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const propName = event.target.name;
    const value = event.target.value;
    setFormData((prevData) => ({
      ...prevData,
      [propName]: value,
    }));
  };

  const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { emailOrPhoneNumber, password } = formData;

    const regex = /^\d+$/;
    if (regex.test(emailOrPhoneNumber)) {
      const errors = await dispatch(
        logInWithPhoneNumber({
          phoneNumber: emailOrPhoneNumber,
          password,
        })
      );

      if (errors) {
        setErrors(errors);
      }
    } else {
      const errors = await dispatch(
        logInWithEmail({
          email: emailOrPhoneNumber,
          password,
        })
      );

      if (errors) {
        setErrors(errors);
      }
    }
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
        name="emailOrPhoneNumber"
        value={formData.emailOrPhoneNumber}
        onChange={handleChange}
        error={
          (errors.email && errors.email.length !== 0) ||
          (errors.phoneNumber && errors.phoneNumber.length !== 0)
        }
        helperText={
          (errors.email && errors.email.join(', ')) ||
          (errors.phoneNumber && errors.phoneNumber.join(', '))
        }
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
              {isShowingPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          ),
        }}
        type={isShowingPassword ? 'text' : 'password'}
        label="Password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        error={errors.password && errors.password.length !== 0}
        helperText={errors.password && errors.password.join(', ')}
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
        <Box marginTop="15px" textAlign="center">
          <Typography style={{ fontWeight: 'bold' }}>
            Create new account
          </Typography>
        </Box>
      </Link>
    </form>
  );
};

export default LoginForm;
