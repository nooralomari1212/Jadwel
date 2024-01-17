import ApiService from './ApiService'
import jwt from 'jwt-decode'

export async function apiGetNotificationCount() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const count = 3; // Simulated count value
        resolve({ data: { count } });
      }, 1000); // Simulate a 1-second delay
    });
  }
  
  export async function apiGetNotificationList() {
    try {
      const token = sessionStorage.getItem('token')
      const decodedToken = jwt(token)
      const userId = decodedToken.userId
      const response = await fetch(`/api/notifyMessage/${userId}`);
      const data = await response.json();
      // Assume the API returns an array of notifications in the "data" field
      return { data };
    } catch (error) {
      throw new Error('Failed to fetch notification list.');
    }
  }
export async function apiGetSearchResult(data) {
    return ApiService.fetchData({
        url: '/search/query',
        method: 'post',
        data,
    })
}
