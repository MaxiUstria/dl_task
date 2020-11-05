import * as React from 'react';
import { connect } from 'react-redux';
import { ICurrent, User } from '../../types';
import { updateUser } from '../../redux/actions/userActions';
import { useState } from 'react';
import { getUser } from '../../back/dataApi';

import Grid from '@material-ui/core/Grid';
import { FormControl, TextField, Button } from '@material-ui/core';

export interface UserInfoProps {
  user: User | null;
  updateUser: (
    user: User,
    name: string,
    surname: string,
    username: string,
  ) => void;
}

const UserInfo = (props: UserInfoProps) => {
  const [newUser, setNewUser] = useState({
    username: props.user!.username,
    name: props.user!.name,
    surname: props.user!.surname,
  });

  const [errors, setErrors] = useState({
    name: '',
    surname: '',
    username: '',
  });

  const updateUser = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const formOk = await validateForm();
    if (props.user && formOk) {
      props.updateUser(
        props.user,
        newUser.name,
        newUser.surname,
        newUser.username,
      );
    }
  };

  const validateForm = async () => {
    setErrors({ name: '', surname: '', username: '' });
    let formOk = true;
    const { name, surname, username } = newUser;

    if (!name) {
      formOk = false;
      setErrors({ ...errors, name: "Name can't be blank." });
    }

    if (!username) {
      formOk = false;
      setErrors({ ...errors, username: "Username can't be blank." });
    } else {
      const askedUser = await getUser(username);
      if (askedUser && props.user?.username === askedUser.username) {
        formOk = false;
        setErrors({ ...errors, username: 'Username already taken.' });
      }
    }

    if (!surname) {
      formOk = false;
      setErrors({ ...errors, surname: "Surname can't be blank." });
    }

    return formOk;
  };

  const handleChangeEvent = (prop: string, value: string) => {
    setNewUser({ ...newUser, [prop]: value });
  };

  return (
    <div style={{ margin: '5%', textAlign: 'center' }}>
      <Grid item xs={12}>
        <FormControl>
          <TextField
            label="Name"
            aria-describedby="my-helper-text"
            value={newUser.name}
            name="name"
            error={errors.name ? true : false}
            helperText={errors.name}
            onChange={(e) => handleChangeEvent('name', e.target.value)}
          />
        </FormControl>
      </Grid>
      <br></br>
      <Grid item xs={12}>
        <FormControl>
          <TextField
            label="Surname"
            aria-describedby="my-helper-text"
            value={newUser.surname}
            error={errors.surname ? true : false}
            helperText={errors.surname}
            name="surname"
            onChange={(e) => handleChangeEvent('surname', e.target.value)}
          />
        </FormControl>
      </Grid>
      <br></br>
      <Grid item xs={12}>
        <FormControl>
          <TextField
            label="Username"
            aria-describedby="my-helper-text"
            value={newUser.username}
            error={errors.username ? true : false}
            helperText={errors.username}
            name="username"
            onChange={(e) => handleChangeEvent('username', e.target.value)}
          />
        </FormControl>
      </Grid>
      <br></br>
      <Button
        type="submit"
        color="primary"
        variant="contained"
        onClick={updateUser}
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

const mapDispatchToProps = {
  updateUser: updateUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);
