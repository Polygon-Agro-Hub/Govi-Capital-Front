import axios from '@/lib/axios';

interface LoginPayload {
  phoneNumber: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  message: string;
  token: string;
  tokenExpiration: number;
  userData: {
    id: number;
    title: string;
    userName: string;
    phoneCode: string;
    phoneNumber: string;
    email: string;
    nic: string;
    address: string;
    createdAt: string;
  };
}

interface RegisterPayload {
  title: string;
  userName: string;
  phoneNumber: string;
  nic: string;
  email: string;
  address: string;
  password: string;
  confirmPassword: string;
}

interface RegisterResponse {
  success: boolean;
  message: string;
  userData: {
    id: number;
    title: string;
    userName: string;
    phoneCode: string;
    phoneNumber: string;
    email: string;
    nic: string;
    address: string;
    createdAt: string;
  };
}

export const investmentLogin = async (payload: LoginPayload): Promise<LoginResponse> => {
  try {
    const response = await axios.post('auth/login', payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      throw new Error(response.data?.message || 'Login failed');
    }
  } catch (error: any) {
    if (error.response) {
      throw new Error(
        error.response.data?.message ||
        error.response.data?.error ||
        `Login failed with status ${error.response.status}`
      );
    } else if (error.request) {
      throw new Error('No response received from server. Please check your network connection.');
    } else {
      throw new Error(error.message || 'An error occurred during login');
    }
  }
};

export const investmentRegister = async (payload: RegisterPayload): Promise<RegisterResponse> => {
  try {
    const response = await axios.post('auth/register', payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      throw new Error(response.data?.message || 'Registration failed');
    }
  } catch (error: any) {
    if (error.response) {
      throw new Error(
        error.response.data?.message ||
        error.response.data?.error ||
        `Registration failed with status ${error.response.status}`
      );
    } else if (error.request) {
      throw new Error('No response received from server. Please check your network connection.');
    } else {
      throw new Error(error.message || 'An error occurred during registration');
    }
  }
};