import { useEffect, useState } from "react";
import mainVideo from "../assets/mainVideo.mp4";
import mainVideoMobile from "../assets/mainVideos.mp4";

export const useHeroVideo = () => {
  const [videoSrc, setVideoSrc] = useState(mainVideoMobile);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const updateSource = () => {
      setVideoSrc(mediaQuery.matches ? mainVideo : mainVideoMobile);
    };

    updateSource();
    mediaQuery.addEventListener("change", updateSource);

    return () => mediaQuery.removeEventListener("change", updateSource);
  }, []);

  return videoSrc;
};
