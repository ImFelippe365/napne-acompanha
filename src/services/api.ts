import axios from "axios";

export const api = axios.create({
  headers: {
    "Access-Control-Allow-Origin": "*",
    // "aplication/json"
  },
});

// api.interceptors.request.use(
// 	async (config) => {
// 		const token = localStorage.getItem("@NapneAcompanha:token");

// 		if (token) config.headers.Authorization = `Bearer ${token}`;

// 		return config;
// 	},
// 	(error) => {
//     if (error.status === 401) localStorage.clear()
// 		return Promise.reject(error);
// 	}
// );

// api.interceptors.response.use(
//   (response) => response,

//   (error) => Promise.reject(error || "Something went wrong")
// );
