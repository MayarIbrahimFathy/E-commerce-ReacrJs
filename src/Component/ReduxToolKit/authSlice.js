import { createSlice } from '@reduxjs/toolkit';

const getUserFromStorage = () => {
  const savedUser = localStorage.getItem("user");
  if (savedUser) {
    return JSON.parse(savedUser);
  }
  return null;
};

const user = getUserFromStorage();

const initialState = {
  user: user,
  isLoggedIn: user ? true : false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      const userData = action.payload;
      state.user = userData;
      state.isLoggedIn = true;
      localStorage.setItem("user", JSON.stringify(userData));
    },
    
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      localStorage.removeItem("user");
    }
  }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;