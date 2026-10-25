document.addEventListener("DOMContentLoaded", function () {

    /*
      ADD YOUR PUBLISHED CONTENT HERE.

      Images:
      type: "image"

      Videos:
      type: "video"

      Use publicly accessible image/video URLs.
      Only publish content you have permission to use.
    */

    const galleryItems = [
        /*
        Example image:

        {
            title: "Featured Image",
            description: "A short description of this image.",
            type: "image",
            src: "https://example.com/your-image.jpg"
        },

        Example video:

        {
            title: "Featured Video",
            description: "A short description of this video.",
            type: "video",
            src: "https://example.com/your-video.mp4"
        }
        */
    ];

    const gallery = document.getElementById("gallery-grid");
    const filterButtons = document.querySelectorAll(".gallery-filter");
    const yearElements = document.querySelectorAll("#current-year");

    // UPDATE COPYRIGHT YEAR
    yearElements.forEach(function (element) {
        element.textContent = new Date().getFullYear();
    });

    // STOP IF THE GALLERY CONTAINER IS NOT ON THIS PAGE
    if (!gallery) {
        return;
    }

    // DISPLAY AN EMPTY GALLERY MESSAGE
    function showEmptyMessage(message) {
        gallery.replaceChildren();

        const notice = document.createElement("div");
        notice.className = "gallery-message";

        const heading = document.createElement("h3");
        heading.textContent = "No Content Available";

        const paragraph = document.createElement("p");
        paragraph.textContent = message;

        notice.append(heading, paragraph);
        gallery.appendChild(notice);
    }

    // CREATE A GALLERY CARD
    function createGalleryCard(item) {
        const card = document.createElement("article");
        card.className = "gallery-card";

        const mediaType = item.type === "video" ? "video" : "image";

        const media = document.createElement(
            mediaType === "video" ? "video" : "img"
        );

        media.className = "gallery-media";
        media.src = item.src;
        media.setAttribute("controls", mediaType === "video" ? "" : "false");

        if (mediaType === "image") {
            media.alt = item.title || "Spetime featured image";
            media.loading = "lazy";
        } else {
            media.controls = true;
            media.preload = "metadata";
            media.playsInline = true;
        }

        media.addEventListener("error", function () {
            card.replaceChildren();

            const errorMessage = document.createElement("div");
            errorMessage.className = "gallery-message";
            errorMessage.textContent = "This media could not be loaded.";

            card.appendChild(errorMessage);
        });

        const content = document.createElement("div");
        content.className = "gallery-card-content";

        const label = document.createElement("span");
        label.className = "gallery-type";
        label.textContent = mediaType;

        const title = document.createElement("h3");
        title.textContent = item.title || "Featured Content";

        const description = document.createElement("p");
        description.textContent =
            item.description || "Explore this featured content.";

        content.append(label, title, description);
        card.append(media, content);

        return card;
    }

    // DISPLAY ITEMS AND APPLY FILTERS
    function renderGallery(filter) {
        gallery.replaceChildren();

        const filteredItems = galleryItems.filter(function (item) {
            const validType = item.type === "image" || item.type === "video";
            const hasSource =
                typeof item.src === "string" && item.src.trim() !== "";

            if (!validType || !hasSource) {
                return false;
            }

            return filter === "all" || item.type === filter;
        });

        if (filteredItems.length === 0) {
            showEmptyMessage(
                "Featured images and videos will appear here when content is published."
            );
            return;
        }

        filteredItems.forEach(function (item) {
            gallery.appendChild(createGalleryCard(item));
        });
    }

    // CONNECT FILTER BUTTONS
    filterButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            filterButtons.forEach(function (otherButton) {
                otherButton.classList.remove("active");
                otherButton.removeAttribute("aria-pressed");
            });

            button.classList.add("active");
            button.setAttribute("aria-pressed", "true");

            const filter = button.dataset.filter || "all";
            renderGallery(filter);
        });
    });

    // INITIAL DISPLAY
    renderGallery("all");

});
