import { getUserStored } from "@/libs/utils/GeneralUtils";
import { mockActionUserProfile } from "@/api/mockActions/mockActionUserProfile";
import axios from 'axios';

const VITE_API_SERVER = import.meta.env.VITE_APP_API_SERVER
const USE_MOCK_DATA = import.meta.env.VITE_APP_USE_MOCK_DATA === 'true';

export async function UpdateProfile(data: any) {
  if (USE_MOCK_DATA) {
    return mockActionUserProfile();
  }

  const userStored = getUserStored()

  if (userStored?.token) {
    try {
      const response = await axios.post(`${VITE_API_SERVER}/profiles`, data, {
        headers: {
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