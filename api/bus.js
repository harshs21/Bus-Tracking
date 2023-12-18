import axios from "axios";

import config from "../config.json";

export const getBusCode = async (lat, lon) => {
  try {
    const result = await axios.get(
      config.SERVER_URL + "/code?lat=" + lat + "&lon=" + lon
    );
    if (result.status === 200) return result.data;
  } catch (ex) {
    alert(ex.message);
  }
};
