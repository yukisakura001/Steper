import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, //環境変数で登録
  headers: {
    "Content-type": "application/json", //形式の登録
  },
});

export default apiClient;
