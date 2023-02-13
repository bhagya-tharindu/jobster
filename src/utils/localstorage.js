export const addusertolocalstorage = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const removeuserfromlocalstorage = () => {
  localStorage.removeItem("user");
};

export const getuserfromlocalstorage = () => {
  const result = localStorage.getItem("user");
  const user = result ? JSON.parse(result) : null;
  return user;
};
