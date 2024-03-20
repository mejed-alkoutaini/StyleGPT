import axios from "axios";

const HOST = process.env.NEXT_PUBLIC_HOST;

export const generateRoomImage = async (uid, roomType, roomTheme, imageUrl) => {
  try {
    const result = await axios({
      url: `${HOST}/api/generateImage`,
      method: "POST",
      data: {
        uid,
        roomType,
        roomTheme,
        image: imageUrl,
        resolution: "512",
      },
    });

    return result.data;
  } catch (error) {
    console.error("Error generating new image", error);
    throw error;
  }
};

export const createUser = async (uid, email, image, name) => {
  try {
    const result = await axios({
      url: `${HOST}/api/createUser`,
      method: "POST",
      data: {
        uid,
        email,
        image,
        name,
      },
    });

    return result.data;
  } catch (error) {
    console.error("Error creating new user", error);
    throw error;
  }
};

export const getUser = async (uid) => {
  try {
    const result = await axios({
      url: `${HOST}/api/user/${uid}`,
      method: "GET",
    });

    return result.data;
  } catch (error) {
    console.error("Error getting user data", error);
    throw error;
  }
};

export const isUserExist = async (uid) => {
  try {
    const result = await axios({
      url: `${HOST}/api/user/${uid}`,
      method: "GET",
    });

    return result.data;
  } catch (error) {
    return null;
  }
};

export const getUserImages = async (uid) => {
  try {
    const result = await axios({
      url: `${HOST}/api/user/${uid}/images`,
      method: "GET",
    });

    return result.data;
  } catch (error) {
    console.error("Error getting user images", error);
    throw error;
  }
};
