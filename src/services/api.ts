import axios from "axios";

export const academicManagementApi = axios.create({
  baseURL: "http://localhost:8000/academic/",
});

export const studentApi = axios.create({
  baseURL: "http://localhost:8001/student/",
});

export const suapApi = axios.create({
	baseURL: "https://suap.ifrn.edu.br/api/v2/",
});

suapApi.interceptors.request.use(
	async (config) => {
		const token = localStorage.getItem("@ClassPlanner:token");
		const refresh = localStorage.getItem("@ClassPlanner:refresh");
		
		if (token) config.headers.Authorization = `Bearer ${token}`;

		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

academicManagementApi.interceptors.response.use(
	(response) => response,

	(error) => Promise.reject(error || "Something went wrong")
);

studentApi.interceptors.response.use(
	(response) => response,

	(error) => Promise.reject(error || "Something went wrong")
);