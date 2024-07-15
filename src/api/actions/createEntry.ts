import axios from 'axios';
import { getUserStored } from "@/libs/utils/GeneralUtils";

const VITE_API_SERVER = import.meta.env.VITE_APP_API_SERVER

export async function CreateEntry(data: any) {
  const userStored = getUserStored()

  if (userStored?.token) {
    try {
      const response = await axios.post(`${VITE_API_SERVER}/entries`, data, {
        headers: {
          // 'Content-Type': 'application/json',
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userStored.token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error sending data:', error);
      throw error;
    }
  } else {
    throw 'Undefined token'
  }
}