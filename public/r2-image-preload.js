(() => {
  const configuredBaseUrl =
    document.currentScript?.dataset.r2PublicUrl || "";
  const r2BaseUrl = configuredBaseUrl
    .replace(/^%VITE_R2_PUBLIC_URL%$/, "")
    .replace(/\/+$/, "");
  const path = window.location.pathname.replace(/\/+$/, "") || "/";

  if (!r2BaseUrl || (path !== "/locations" && path !== "/service")) {
    return;
  }

  const smallImage = `${r2BaseUrl}/shared/site-assets/locationSectionImg-sm.webp`;
  const largeImage = `${r2BaseUrl}/shared/site-assets/locationSectionImg.webp`;
  const link = document.createElement("link");
  link.rel = "preload";
  link.as = "image";
  link.fetchPriority = "high";
  link.href = largeImage;
  link.setAttribute("imagesrcset", `${smallImage} 929w, ${largeImage} 1645w`);
  link.setAttribute("imagesizes", "100vw");
  document.head.appendChild(link);
})();
