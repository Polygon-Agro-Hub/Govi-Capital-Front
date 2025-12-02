import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserData {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  buyerType: string;
  image: string | null;
}

interface AuthState {
  token: string | null;
  tokenExpiration: number | null; // Unix timestamp
  user: UserData | null;
}




const initialState: AuthState = {
  token: null,
  tokenExpiration: null,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ token: string; user: UserData, tokenExpiration?: number }>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.tokenExpiration = action.payload.tokenExpiration || null;
    },
    logout: (state) => {
      state.token = null;
      state.tokenExpiration = null;
      state.user = null;
    },
    updateUser: (state, action: PayloadAction<Partial<UserData>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
});

export const { setCredentials, logout, updateUser } = authSlice.actions;

export default authSlice.reducer;