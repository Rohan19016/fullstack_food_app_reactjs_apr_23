export const setUserDetails = (user) => {
  return {
    type: "SET_USER",
    user: user,
  };
};

export const getUserDetails = () => {
  return {
    type: "GET_USER",
  };
};

export const setUserNull = (user) => {
  return {
    type: "SET_USER_NULL",
    user: null,
  };
};
