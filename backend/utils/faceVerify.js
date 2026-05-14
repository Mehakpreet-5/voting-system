const verifyFaces = (registeredImage, liveImage) => {

  try {

    if (!registeredImage || !liveImage) {
      return false;
    }

    // Remove base64 header
    const reg = registeredImage.split(",")[1];
    const live = liveImage.split(",")[1];

    // Simple similarity check
    const similarity = reg.substring(0, 1000) === live.substring(0, 1000);

    return similarity;

  } catch (err) {
    console.log(err);
    return false;
  }

};

module.exports = { verifyFaces };