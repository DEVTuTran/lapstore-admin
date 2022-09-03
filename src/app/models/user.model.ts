export interface AuthData {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    _id: string;
    email: string;
    username: string;
    role: string;
  };
}

export interface User {
  _id: string;
  email: string;
  username: string;
  profile: any;
  role: string;
}

export interface userInfor {
  userName: string;
  email: string;
  dateOfBirth: any;
  phoneNumber: string;
  photo: string;
  address: string;
  province: string;
  district: string;
  wards: string;
}
