import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem("token");

  if (token) {
    // IMPORTANT: backend expects raw token, not "Bearer"
    config.headers.Authorization = token;
  }

  return config;
});

export default api;

/*
  Upload image to Cloudinary
*/
export async function uploadImage(file) {
  if (!file) return "";

  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: "POST",
      body: formData
    }
  );

  const data = await response.json();
  return data.secure_url;
}
