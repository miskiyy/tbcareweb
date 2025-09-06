import axios from "axios";

const API_BASE = "http://localhost:8000";

export const getPasien = async () => {
  const res = await axios.get(`${API_BASE}/pasien`);
  return res.data;
};

export const uploadAudio = async (formData) => {
  const res = await axios.post(`${API_BASE}/audio/upload`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};
