import axios from "axios";

const HOST = process.env.NEXT_PUBLIC_HOST;
const ENV = process.env.NEXT_PUBLIC_ENV;

export const generateRoomImage = async (uid, selectedSource, roomType, roomTheme, imageUrl) => {
  try {
    const result = await axios({
      url: `${HOST}/api/generateImage`,
      method: "POST",
      data: {
        uid,
        roomType: selectedSource === "architecture" ? selectedSource : roomType,
        roomTheme,
        image: imageUrl,
        resolution: "512",
        test: ENV === "development",
      },
    });

    return result.data;
  } catch (error) {
    console.error("Error generating new image", error);
    throw error.response.data;
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
    throw error.response.data;
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
    throw error.response.data;
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
    throw error.response.data;
  }
};

export const getExploreImages = async (uid) => {
  try {
    const result = await axios({
      url: `${HOST}/api/explore`,
      method: "GET",
    });

    return result.data;
  } catch (error) {
    console.error("Error getting images", error);
    throw error.response.data;
  }
};

export const getAdminExploreImages = async () => {
  try {
    const result = await axios({
      url: `${HOST}/api/admin/explore`,
      method: "GET",
    });

    return result.data;
  } catch (error) {
    console.error("Error getting images", error);
    throw error.response.data;
  }
};

export const publishImage = async (id, published) => {
  try {
    const result = await axios({
      url: `${HOST}/api/publish`,
      method: "POST",
      data: {
        id,
        published,
      },
    });

    return result.data;
  } catch (error) {
    console.error("Error publishing image", error);
    throw error.response.data;
  }
};

export const adminPublishImage = async (id, published) => {
  try {
    const result = await axios({
      url: `${HOST}/api/admin/publish?id=${id}&published=${published}`,
      method: "GET",
    });

    return result.data;
  } catch (error) {
    console.error("Error publishing image", error);
    throw error.response.data;
  }
};

export const createTransaction = async (priceId, email) => {
  try {
    const result = await axios({
      url: `${HOST}/api/transactions`,
      method: "POST",
      data: {
        priceId: priceId,
        email,
      },
    });

    return result.data;
  } catch (error) {
    console.error("Error create transaction", error);
    throw error.response.data;
  }
};
