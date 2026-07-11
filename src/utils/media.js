import poiKalyanCover from "../assets/locations/poi-kalyan/cover.jpg";
import poiKalyan01 from "../assets/locations/poi-kalyan/01.jpg";
import poiKalyan02 from "../assets/locations/poi-kalyan/02.jpg";
import poiKalyan03 from "../assets/locations/poi-kalyan/03.jpg";

import arkCover from "../assets/locations/ark/cover.jpg";
import ark01 from "../assets/locations/ark/01.jpg";
import ark02 from "../assets/locations/ark/02.jpg";

import lyabiHauzCover from "../assets/locations/lyabi-hauz/cover.jpg";
import lyabiHauz01 from "../assets/locations/lyabi-hauz/01.jpg";
import lyabiHauz02 from "../assets/locations/lyabi-hauz/02.jpg";

import kyzylkumCover from "../assets/locations/kyzylkum/cover.jpg";

import rooftopsCover from "../assets/locations/rooftops/cover.jpg";
import rooftops01 from "../assets/locations/rooftops/01.jpg";
import rooftops02 from "../assets/locations/rooftops/02.jpg";
import rooftops03 from "../assets/locations/rooftops/03.jpg";

import caravanseraiCover from "../assets/locations/caravanserai/cover.jpg";
import caravanserai01 from "../assets/locations/caravanserai/01.jpg";
import caravanserai02 from "../assets/locations/caravanserai/02.jpg";
import caravanserai03 from "../assets/locations/caravanserai/03.jpg";

export const locationMedia = {
  poiKalyan: {
    cover: poiKalyanCover,
    gallery: [poiKalyan01, poiKalyan02, poiKalyan03, caravanserai01]
  },
  ark: {
    cover: arkCover,
    gallery: [ark01, ark02, poiKalyan01, rooftops02]
  },
  lyabiHauz: {
    cover: lyabiHauzCover,
    gallery: [lyabiHauz01, lyabiHauz02, caravanserai03, poiKalyan02]
  },
  kyzylkum: {
    cover: kyzylkumCover,
    gallery: [kyzylkumCover, ark01, rooftops03, ark02]
  },
  rooftops: {
    cover: rooftopsCover,
    gallery: [rooftops01, rooftops02, rooftops03, poiKalyanCover]
  },
  caravanserai: {
    cover: caravanseraiCover,
    gallery: [caravanserai01, caravanserai02, caravanserai03, lyabiHauz01]
  }
};

export const serviceMedia = [
  {
    image: poiKalyan03,
    gallery: [poiKalyan03, poiKalyan02, caravanserai02, caravanserai01]
  },
  {
    image: ark02,
    gallery: [ark02, ark01, rooftops01, caravanserai01]
  },
  {
    image: lyabiHauzCover,
    gallery: [lyabiHauzCover, lyabiHauz01, rooftops02, poiKalyan01]
  },
  {
    image: rooftopsCover,
    gallery: [rooftopsCover, rooftops01, arkCover, lyabiHauz02]
  }
];
