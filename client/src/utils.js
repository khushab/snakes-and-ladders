// Function to set the token in localStorage
export const setAuthTokenInLocalStorage = (token) => {
  if (token) {
    localStorage.setItem("jwtToken", token);
  } else {
    localStorage.removeItem("jwtToken");
  }
};

// Function to get the token from localStorage
export const getAuthTokenFromLocalStorage = () => {
  return localStorage.getItem("jwtToken");
};

export const removeAuthTokenFromLocalStorage = () => {
  localStorage.removeItem("jwtToken");
};

export const getFormattedDateAndTime = (date) => {
  const dateObject = new Date(date);

  const formattedDate = dateObject.toLocaleDateString(); // Formats date
  const formattedTime = dateObject.toLocaleTimeString(); // Formats time

  return `${formattedDate} - ${formattedTime}`;
};
