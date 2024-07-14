import axios from 'axios';

const VITE_API_SERVER = import.meta.env.VITE_APP_API_SERVER

function getUserStored () {
  const dataStored = window.localStorage.getItem('pgus-tk');
  const userStored = dataStored !== null ? JSON.parse(dataStored) : null;

  return userStored;
}

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

export async function UpdateProfile(data: any) {
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

// export async function fetchData() {
//   try {
//     const response = await axios.get('https://api.example.com/data');
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     throw error;
//   }
// }
