const playlistId = "PLtN3SIZuaGTseOSxP9F3AJaoJPhMilY-h";
const apiKey = "AIzaSyAhxhUUGHUcnYtOO0FYY9DhA5Ku5rjlIA4";
const videoList = document.querySelector("[data-video-list]");
const videoStatus = document.querySelector("[data-video-status]");
const loadMore = document.querySelector("[data-load-more]");

if (videoList && videoStatus && loadMore) {
  let nextPageToken = "";
  let loading = false;

  const addVideo = (snippet) => {
    const videoId = snippet.resourceId?.videoId;
    if (!/^[\w-]{11}$/.test(videoId || "") || ["Deleted video", "Private video"].includes(snippet.title)) return;

    const article = document.createElement("article");
    article.className = "overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm";

    const play = document.createElement("button");
    play.type = "button";
    play.className = "group relative block aspect-video w-full overflow-hidden bg-slate-900 text-white";
    play.setAttribute("aria-label", `Reproducir ${snippet.title}`);

    const image = document.createElement("img");
    image.className = "h-full w-full object-cover transition group-hover:scale-105";
    image.src = snippet.thumbnails?.medium?.url || `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`;
    image.alt = "";
    image.loading = "lazy";

    const icon = document.createElement("span");
    icon.className = "absolute inset-0 flex items-center justify-center text-4xl drop-shadow-lg";
    icon.textContent = "▶";
    icon.setAttribute("aria-hidden", "true");

    play.append(image, icon);
    play.addEventListener("click", () => {
      const iframe = document.createElement("iframe");
      iframe.className = "aspect-video w-full";
      iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
      iframe.title = snippet.title;
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      iframe.allowFullscreen = true;
      play.replaceWith(iframe);
    });

    const title = document.createElement("h3");
    title.className = "p-4 font-semibold leading-6 text-slate-900";
    title.textContent = snippet.title;
    article.append(play, title);
    videoList.appendChild(article);
  };

  const loadVideos = async () => {
    if (loading) return;
    loading = true;
    loadMore.disabled = true;
    loadMore.textContent = "Cargando...";
    videoStatus.hidden = false;
    videoStatus.textContent = "Cargando videos...";

    const params = new URLSearchParams({ part: "snippet", playlistId, maxResults: "12", key: apiKey });
    if (nextPageToken) params.set("pageToken", nextPageToken);

    try {
      const response = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?${params}`);
      const data = await response.json();
      if (!response.ok || !Array.isArray(data.items)) throw new Error(data.error?.message || "Respuesta inválida de YouTube");

      data.items.forEach(({ snippet }) => {
        if (snippet) addVideo(snippet);
      });
      nextPageToken = data.nextPageToken || "";
      loadMore.classList.toggle("hidden", !nextPageToken);
      videoStatus.hidden = videoList.children.length > 0;
      if (!videoStatus.hidden) videoStatus.textContent = "No hay videos disponibles en esta playlist.";
      loadMore.textContent = "Cargar más videos";
    } catch (error) {
      console.error("No se pudieron cargar los videos", error);
      videoStatus.textContent = "No se pudieron cargar los videos. Puedes reintentar o abrir la playlist en YouTube.";
      loadMore.classList.remove("hidden");
      loadMore.textContent = "Reintentar";
    } finally {
      loading = false;
      loadMore.disabled = false;
    }
  };

  loadMore.addEventListener("click", loadVideos);
  loadVideos();
}
