import axios from 'axios';

const VITE_API_URL= 'http://localhost:3001/api'

function getUserStored () {
  const dataStored = window.localStorage.getItem('pgus-tk');
  const userStored = dataStored !== null ? JSON.parse(dataStored) : null;

  return userStored;
}

export async function CreateEntry(data: any) {
  const userStored = getUserStored()

  if (userStored?.token) {
    try {
      const response = await axios.post(`${VITE_API_URL}/entries`, data, {
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


// export async function fetchData() {
//   try {
//     const response = await axios.get('https://api.example.com/data');
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     throw error;
//   }
// }
