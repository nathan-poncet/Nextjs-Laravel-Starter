import Axios from 'axios';

const axios = Axios.create({
  baseURL:
    typeof window === 'undefined'
      ? process.env.NEXT_PUBLIC_BACKEND_URL_SERVER
      : process.env.NEXT_PUBLIC_BACKEND_URL_CLIENT,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
  withCredentials: true,
});

export default axios;

// export const fetcher = (url: string) => axios.get(url).then((res) => res.data);
