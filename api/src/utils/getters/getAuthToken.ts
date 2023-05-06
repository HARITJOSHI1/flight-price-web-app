import axios from "axios";
import { AuthCredentialResponse } from "../../types/res/AmadeusResponseTypes";

export default async function getAuthToken(url: string) {
  const { data } = await axios.post<AuthCredentialResponse>(
    url,
    {
      grant_type: "client_credentials",
      client_id: process.env.CLIENT_ID_DEV,
      client_secret: process.env.CLIENT_SECRET_DEV,
    },

    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  return data;
}
