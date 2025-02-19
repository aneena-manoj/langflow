import { useEffect } from "react";
import { BASE_URL_API } from "../../../../../../../../../constants/constants";

const usePreloadImages = (
  profilePictures: { [key: string]: string[] },
  setImagesLoaded: (value: boolean) => void,
  loading: boolean,
) => {
  const preloadImages = async (imageUrls) => {
    return Promise.all(
      imageUrls.map(
        (src) =>
          new Promise((resolve) => {
            const img = new Image();
            img.src = src;
            img.onload = resolve;
            img.onerror = resolve;
          }),
      ),
    );
  };

  useEffect(() => {
    if (loading) return;
    const imageArray: string[] = [];

    Object.keys(profilePictures).flatMap((folder) =>
      profilePictures[folder].map((path) =>
        imageArray.push(
          `${BASE_URL_API}files/profile_pictures/${folder}/${path}`,
        ),
      ),
    );

    preloadImages(imageArray).then(() => {
      setImagesLoaded(true);
    });
  }, [profilePictures, loading]);

  return;
};

export default usePreloadImages;
