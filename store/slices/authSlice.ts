import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserData {
  id: number;
  title: string;
  userName: string;
  phoneCode: string;
  phoneNumber: string;
  email: string;
  nic: string;
  address: string;
  createdAt: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: UserData | null;
  token: string | null;
  tokenExpiration: number | null;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
  tokenExpiration: null,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<{ user: UserData; token: string; tokenExpiration: number }>) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.tokenExpiration = action.payload.tokenExpiration;
      state.error = null;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.tokenExpiration = null;
      state.error = null;
      
      // Clear localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('authToken');
        localStorage.removeItem('tokenExpiration');
        localStorage.removeItem('userData');
      }
    },
    clearError: (state) => {
      state.error = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    restoreAuth: (state, action: PayloadAction<{ token: string; tokenExpiration: number; userData: UserData }>) => {
      state.isAuthenticated = true;
      state.user = action.payload.userData;
      state.token = action.payload.token;
      state.tokenExpiration = action.payload.tokenExpiration;
    },
  },
});

export const { setAuth, logout, clearError, setError, restoreAuth } = authSlice.actions;
export default authSlice.reducer;