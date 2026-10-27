
/* =====================================
   SPETIME CREATOR STUDIO
   PREVIEW MODE ONLY
===================================== */

document.addEventListener("DOMContentLoaded", function () {

    // Update the footer year.
    const yearElement = document.getElementById("current-year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Elements in the preview publishing form.
    const postForm = document.getElementById("creator-post-form");
    const postType = document.getElementById("post-type");
    const postAccess = document.getElementById("post-access");
    const priceField = document.getElementById("post-price-field");
    const priceInput = document.getElementById("post-price");
    const fileInput = document.getElementById("post-file");
    const statusMessage = document.getElementById("creator-form-status");

    // Show the price field only for paid posts.
    function updatePriceField() {
        if (!postAccess || !priceField || !priceInput) {
            return;
        }

        const isPaid = postAccess.value === "paid";

        priceField.hidden = !isPaid;
        priceInput.required = isPaid;

        if (!isPaid) {
            priceInput.value = "";
        }
    }

    if (postAccess) {
        postAccess.addEventListener("change", updatePriceField);
        updatePriceField();
    }

    // Check that the selected file matches the chosen content type.
    if (fileInput && postType) {
        fileInput.addEventListener("change", function () {
            const file = fileInput.files && fileInput.files[0];

            if (!file) {
                return;
            }

            const isImage = file.type.startsWith("image/");
            const isVideo = file.type.startsWith("video/");
            const expectedType = postType.value;

            if (
                (expectedType === "photo" && !isImage) ||
                (expectedType === "video" && !isVideo)
            ) {
                fileInput.value = "";

                if (statusMessage) {
                    statusMessage.textContent =
                        "Please choose a file matching the selected content type.";
                }

                return;
            }

            if (statusMessage) {
                statusMessage.textContent =
                    "Sample file selected locally. It has not been uploaded or saved.";
            }
        });
    }

    // Recheck the selected file if the content type changes.
    if (postType && fileInput) {
        postType.addEventListener("change", function () {
            if (fileInput.files && fileInput.files.length > 0) {
                const file = fileInput.files[0];
                const isImage = file.type.startsWith("image/");
                const isVideo = file.type.startsWith("video/");

                if (
                    (postType.value === "photo" && !isImage) ||
                    (postType.value === "video" && !isVideo)
                ) {
                    fileInput.value = "";

                    if (statusMessage) {
                        statusMessage.textContent =
                            "The selected file was cleared because it does not match the new content type.";
                    }
                }
            }
        });
    }

    // Preview the form without uploading or publishing anything.
    if (postForm && statusMessage) {
        postForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const title = document.getElementById("post-title");
            const description = document.getElementById("post-description");
            const consent = document.getElementById("rights-confirmation");

            if (!title || !description || !consent) {
                statusMessage.textContent =
                    "The preview form is missing a required field.";
                return;
            }

            if (!consent.checked) {
                statusMessage.textContent =
                    "Please confirm the content rights and consent requirement.";
                return;
            }

            const selectedFile =
                fileInput && fileInput.files ? fileInput.files[0] : null;

            if (!selectedFile) {
                statusMessage.textContent =
                    "Choose a sample photo or video file before previewing.";
                return;
            }

            const accessLabel = postAccess.value === "paid"
                ? "Paid members only"
                : "Free for eligible visitors";

            const proposedPrice = priceInput && priceInput.value
                ? " Proposed amount: " + priceInput.value + " (currency not configured)."
                : "";

            statusMessage.textContent =
                "Preview ready: \"" + title.value.trim() +
                "\". Content type: " + postType.value +
                ". Access: " + accessLabel + "." +
                proposedPrice +
                " Nothing has been uploaded, saved, charged, or published.";
        });
    }

    // Inform users that dashboard features are not connected yet.
    const previewButtons = document.querySelectorAll("[data-notice]");

    previewButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            if (statusMessage) {
                statusMessage.textContent = button.getAttribute("data-notice");
                statusMessage.scrollIntoView({
                    behavior: "smooth",
                    block: "nearest"
                });
            } else {
                window.alert(button.getAttribute("data-notice"));
            }
        });
    });

});
