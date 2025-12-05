import axios from '@/lib/axios';
import { environment } from '@/environment/environment'; 

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


interface OTPServiceResponse {
  referenceId: string;
}

// Check if user exists
export const verifyUserDetails = async (
  email: string,
  phoneNumber: string,
  phoneCode: string
): Promise<void> => {
  try {
    const response = await axios.post('auth/check-user', {
      email,
      phoneNumber,
      phoneCode
    });

    if (response.data.status === false) {
      const error: any = new Error(response.data.message);
      error.type = response.data.type;
      throw error;
    }
  } catch (error: any) {
    if (error.response) {
      const errorData = error.response.data;
      const customError: any = new Error(errorData.message || 'Verification failed');
      customError.type = errorData.type;
      throw customError;
    }
    throw error;
  }
};

// Send OTP during signup
export const sendOTPInSignup = async (
  phoneNumber: string,
  countryCode: string,
  options?: {
    checkPhoneExists?: boolean;
    message?: string;
    source?: string;
  }
): Promise<OTPServiceResponse> => {
  try {
    const formattedPhone = phoneNumber.replace(/\s+/g, '');
    const fullPhoneNumber = `${countryCode}${formattedPhone}`;
    
    console.log('Sending OTP to:', fullPhoneNumber);
    
    const {
      message = `Your OTP for verification is: {{code}}`,
      source = "PolygonAgro"
    } = options || {};

    const apiUrl = "https://api.getshoutout.com/otpservice/send";
    const headers = {
      Authorization: `Apikey ${environment.NEXT_PUBLIC_SHOUTOUT_API_KEY}`,
      "Content-Type": "application/json",
    };
    
    const body = {
      source,
      transport: "sms",
      content: {
        sms: message,
      },
      destination: fullPhoneNumber,
    };
    
    const response = await axios.post(apiUrl, body, { headers });
    
    console.log("OTP response:", response.data);
    
    if (response.data.referenceId) {
      return { referenceId: response.data.referenceId };
    }
    
    throw new Error("Failed to send OTP: No reference ID received");
  } catch (error: any) {
    console.error("Error sending OTP:", error);
    if (error.response) {
      throw new Error(
        error.response.data?.message ||
        `Failed to send OTP (${error.response.status})`
      );
    }
    throw new Error(error.message || "Failed to send OTP");
  }
};

// Verify OTP
export const verifyOTP = async (code: string, referenceId: string) => {
  try {
    const url = 'https://api.getshoutout.com/otpservice/verify';
    const headers = {
      Authorization: `Apikey ${environment.NEXT_PUBLIC_SHOUTOUT_API_KEY}`,
      'Content-Type': 'application/json',
    };
    const body = { code, referenceId };
    
    const response = await axios.post(url, body, { headers });
    return response.data;
  } catch (error) {
    console.error('OTP verification error:', error);
    throw error;
  }
};

export const investmentRegister = async (userData: {
  title: string;
  userName: string;
  phoneNumber: string;
  nic: string;
  email: string;
  address: string;
  password: string;
  confirmPassword: string;
}) => {
  try {
    const response = await axios.post('auth/register', userData);
    return response.data;
  } catch (error: any) {
    console.error('Registration error:', error);
    if (error.response) {
      throw new Error(
        error.response.data?.message || 'Registration failed'
      );
    }
    throw new Error(error.message || 'Registration failed');
  }
};

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

