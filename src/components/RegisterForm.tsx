import {
  Box,
  Typography,
  TextField,
  Button,
  Link,
  IconButton,
  Grid,
  FormHelperText,
  CircularProgress,
} from '@material-ui/core';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import React, { useState } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { useAppDispatch, useAppSelector } from 'src/store';
import { registerWithEmail, registerWithPhoneNumber } from 'src/store/auth';
import { RegistrationError } from 'src/types/lib';
import { MIN_AGE } from 'src/constants';
import useProgressButtonStyles from 'src/composables/useProgressButtonStyles';

const maxDate = new Date(
  new Date().setFullYear(new Date().getFullYear() - MIN_AGE)
);

interface FormData {
  username: string;
  emailOrPhoneNumber: string;
  password: string;
  birthday: Date;
  pronouns: {
    subjective: string;
    objective: string;
    possessive: string;
  };
}

const initialFormData: FormData = {
  username: '',
  emailOrPhoneNumber: '',
  password: '',
  birthday: maxDate,
  pronouns: {
    subjective: '',
    objective: '',
    possessive: '',
  },
};

interface Props {
  setIsLogginIn: (isLoggingIn: boolean) => void;
}

const RegisterForm: React.FC<Props> = ({ setIsLogginIn }) => {
  const classes = useProgressButtonStyles();

  const dispatch = useAppDispatch();

  const { isLoading } = useAppSelector((state) => state.authStore);

  const [formData, setFormData] = React.useState<FormData>(initialFormData);
  const [isShowingPassword, setIsShowingPassword] = useState(false);
  const [errors, setErrors] = useState<RegistrationError>({});

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

  const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { username, emailOrPhoneNumber, birthday, password, pronouns } =
      formData;

    const regex = /^\d+$/;
    if (regex.test(emailOrPhoneNumber)) {
      const errors = await dispatch(
        registerWithPhoneNumber({
          birthday,
          phoneNumber: emailOrPhoneNumber,
          password,
          pronouns,
          username,
        })
      );

      if (errors) {
        setErrors(errors);
      }
    } else {
      const errors = await dispatch(
        registerWithEmail({
          birthday,
          email: emailOrPhoneNumber,
          password,
          pronouns,
          username,
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
        required
        value={formData.username}
        onChange={handleChange}
        error={errors.username && errors.username.length !== 0}
        helperText={errors.username && errors.username.join(', ')}
      />
      <TextField
        color="primary"
        variant="outlined"
        margin="normal"
        fullWidth
        type="text"
        label="email or phone number"
        name="emailOrPhoneNumber"
        required
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
        required
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
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          fullWidth
          variant="dialog"
          margin="normal"
          id="date-picker-dialog"
          label="Birthday"
          format="dd/MM/yyyy"
          required
          value={formData.birthday}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
          error={errors.birthday && errors.birthday.length !== 0}
          helperText={errors.birthday && errors.birthday.join(', ')}
          maxDate={maxDate}
          defaultValue={maxDate}
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
                name="pronouns.subjective"
                required
                value={formData.pronouns.subjective}
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
                name="pronouns.objective"
                required
                value={formData.pronouns.objective}
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
                required
                placeholder="e.g. his"
                name="pronouns.possessive"
                value={formData.pronouns.possessive}
                onChange={handleChange}
              />
            </Box>
          </Grid>
        </Grid>
        {errors.pronouns && (
          <FormHelperText
            error={errors.pronouns && errors.pronouns.length !== 0}
          >
            {errors.pronouns.join(', ')}
          </FormHelperText>
        )}
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
      <Box marginTop="15px" className={classes.wrapper}>
        <Button
          fullWidth
          type="submit"
          size="large"
          variant="contained"
          color="primary"
          disabled={isLoading}
        >
          Sign up
        </Button>
        {isLoading && (
          <CircularProgress className={classes.buttonProgress} size={36} />
        )}
      </Box>
    </form>
  );
};

export default RegisterForm;
