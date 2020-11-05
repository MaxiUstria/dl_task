import * as React from 'react';
import { connect } from 'react-redux';
import { ICurrent, User } from '../../types';
import { updateUserPassword } from '../../back/dataApi';
import { useState } from 'react';
import { toast } from 'react-toastify';

import Grid from '@material-ui/core/Grid';
import { FormControl, TextField, Button } from '@material-ui/core';

export interface PasswordModifyerProps {
  user?: User | null;
}

const PasswordModifyer = (props: PasswordModifyerProps) => {
  const [newPassword, setNewPassword] = useState({
    password: '',
    passwordConfirmation: '',
  });

  const [errors, setErrors] = useState({
    password: '',
    passwordConfirmation: '',
  });

  const updatePass = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const formOk = await validateForm();
    if (props.user && formOk) {
      updateUserPassword(props.user, newPassword.password).then(() => {
        toast.success('Password updated');
      });
    }
  };

  const validateForm = async () => {
    setErrors({ password: '', passwordConfirmation: '' });
    let formOk = true;
    const { password, passwordConfirmation } = newPassword;
    let newErrors = {
      password: '',
      passwordConfirmation: '',
    };

    if (!password) {
      formOk = false;
      newErrors.password = "Password can't be blank.";
    }

    if (!passwordConfirmation) {
      formOk = false;
      newErrors.passwordConfirmation = "Password Confirmation can't be blank.";
    } else if (passwordConfirmation !== password) {
      formOk = false;
      newErrors.passwordConfirmation = "Passwords don't match.";
    }

    setErrors({
      password: newErrors.password,
      passwordConfirmation: newErrors.passwordConfirmation,
    });

    return formOk;
  };

  const handleChangeEvent = (prop: string, value: string) => {
    setNewPassword({ ...newPassword, [prop]: value });
  };

  return (
    <div style={{ margin: '5%', textAlign: 'center' }}>
      <Grid item xs={12}>
        <FormControl>
          <TextField
            label="Password"
            type="password"
            value={newPassword.password}
            name="password"
            error={errors.password ? true : false}
            helperText={errors.password}
            onChange={(e) => handleChangeEvent('password', e.target.value)}
          />
        </FormControl>
      </Grid>
      <br></br>
      <Grid item xs={12}>
        <FormControl>
          <TextField
            label="Password Confirmation"
            value={newPassword.passwordConfirmation}
            type="password"
            error={errors.passwordConfirmation ? true : false}
            helperText={errors.passwordConfirmation}
            name="passwordConfirmation"
            onChange={(e) =>
              handleChangeEvent('passwordConfirmation', e.target.value)
            }
          />
        </FormControl>
      </Grid>
      <br></br>
      <Button
        type="submit"
        color="primary"
        variant="contained"
        onClick={updatePass}
      >
        Update
      </Button>
    </div>
  );
};

const mapStateToProps = (state: ICurrent) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, null)(PasswordModifyer);
