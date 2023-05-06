import axios from "axios";
import { AuthCredentialResponse } from "../../types/res/AmadeusResponseTypes";

export default async function getAuthToken(url: string) {
  const { data } = await axios.post<AuthCredentialResponse>(
    url,
    {
      grant_type: "client_credentials",
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
    },

    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  return data;
}
