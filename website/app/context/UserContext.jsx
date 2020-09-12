/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useCallback } from "react";
import constate from "constate";

const useUser = () => {
  const [user, setUser] = useState({
    isLoggedIn: false,
  });

  const login = useCallback(
    (token) => {
      window.localStorage.setItem("AUTH_TOKEN", token);
      setUser({
        ...user,
        isLoggedIn: true,
      });
    },
    [user]
  );

  const logout = useCallback(() => {
    window.localStorage.removeItem("AUTH_TOKEN");
    setUser({ ...user, isLoggedIn: false });
  }, [user]);

  const updateUser = useCallback(
    (prop) => {
      setUser({ ...user, ...prop });
    },
    [user]
  );

  return { user, login, logout, updateUser };
};

const [UserProvider, useUserContext] = constate(useUser);

const withUser = (Children) => (props) => {
  const { user, login, logout, updateUser } = useUserContext();

  return (
    <>
      <Children
        {...props}
        {...user}
        login={login}
        logout={logout}
        updateUser={updateUser}
      />
    </>
  );
};

export { withUser, useUserContext, UserProvider };
