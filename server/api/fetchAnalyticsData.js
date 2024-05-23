// server/api/fetchAnalyticsData.js

export default defineEventHandler(async (event) => {
  const {
    CLOUDINARY_CLOUD_NAME,
    NUXT_ENV_CLOUDINARY_PUBLIC_ID,
    NUXT_ENV_CLOUDINARY_API_KEY,
    NUXT_ENV_CLOUDINARY_API_SECRET,
  } = process.env;

  if (
    !CLOUDINARY_CLOUD_NAME ||
    !NUXT_ENV_CLOUDINARY_PUBLIC_ID ||
    !NUXT_ENV_CLOUDINARY_API_KEY ||
    !NUXT_ENV_CLOUDINARY_API_SECRET
  ) {
    throw createError({
      statusCode: 500,
      statusMessage: "Cloudinary environment variables are not set",
    });
  }

  const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/video/analytics/views?expression=video_public_id=${NUXT_ENV_CLOUDINARY_PUBLIC_ID}&max_results=500`;

  const authorizationHeader = `Basic ${Buffer.from(
    `${NUXT_ENV_CLOUDINARY_API_KEY}:${NUXT_ENV_CLOUDINARY_API_SECRET}`
  ).toString("base64")}`;

  let response;
  try {
    response = await fetch(cloudinaryUrl, {
      headers: {
        Authorization: authorizationHeader,
      },
    });
  } catch (fetchError) {
    throw createError({
      statusCode: 502,
      statusMessage: "Failed to fetch analytics data from Cloudinary",
    });
  }

  if (!response.ok) {
    throw createError({
      statusCode: response.status,
      statusMessage: response.statusText,
    });
  }

  try {
    const data = await response.json();
    // console.log("data: ", data);
    return data;
  } catch (parseError) {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to parse analytics data",
    });
  }
});
