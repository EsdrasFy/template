import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";

interface LoginApiResponse {
  status: number;
  user: {
    username: string;
  };
  msg?: string;
  token: string;
}

interface LoginApiProps {
  credential: string;
  password: string;
}

interface LoginApiResult {
  status: number;
  user?: {
    username: string;
  };
  error?: string;
}

async function LoginApi({
  credential,
  password,
}: LoginApiProps): Promise<LoginApiResult> {
  try {
    const loginUrl = "http://localhost:9090/req/login";

    const urlValidate = "http://localhost:9090/auth/";
    const { data } = await axios.post<LoginApiResponse>(loginUrl, {
      credential,
      password,
    });
    const response = await axios.get<LoginApiResponse>(
      `${urlValidate}${data.user.username}`,
      {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }
    );

    if (response.data.status === 200) {
      Cookies.set("jwt", data.token, {
        expires: 3,
        path: "/",
        secure: true,
        httpOnly: false,
        sameSite: "lax",
      });
      Cookies.set("username", response.data.user.username, {
        expires: 3,
        path: "/",
        secure: true,
        httpOnly: false,
        sameSite: "lax",
      });
    }

    return {
      status: response.data.status,
      user: response.data.user,
    };
  } catch (error) {
    console.error(error);
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<LoginApiResponse>;
      if (axiosError.response?.data?.msg) {
        return {
          status: axiosError.response.data.status,
          error: axiosError.response.data.msg,
        };
      }
    }
    return {
      status: 400,
      error: "Erro desconhecido",
    };
  }
}

export default LoginApi;
