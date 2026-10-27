
/* =========================================
   SPETIME — CREATE CREATOR PROFILE
   Setup preview only — no permanent saving
========================================= */

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("creator-profile-form");
    const message = document.getElementById("creator-profile-message");
    const imageInput = document.getElementById("creator-profile-image");

    if (!form || !message) {
        return;
    }

    // Check the selected profile picture.
    if (imageInput) {
        imageInput.addEventListener("change", function () {
            const file = imageInput.files[0];

            if (!file) {
                return;
            }

            const allowedTypes = [
                "image/jpeg",
                "image/png",
                "image/webp"
            ];

            if (!allowedTypes.includes(file.type)) {
                imageInput.value = "";
                message.textContent =
                    "Please choose a JPG, PNG, or WebP image.";
                return;
            }

            if (file.size > 5 * 1024 * 1024) {
                imageInput.value = "";
                message.textContent =
                    "Your profile picture must be 5 MB or smaller.";
                return;
            }

            message.textContent = "";
        });
    }

    // Handle form submission.
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const displayName =
            document.getElementById("creator-display-name").value.trim();

        const username =
            document.getElementById("creator-username").value.trim();

        const bio =
            document.getElementById("creator-bio").value.trim();

        const location =
            document.getElementById("creator-location").value.trim();

        const socialLink =
            document.getElementById("creator-social-link").value.trim();

        const consent =
            document.getElementById("creator-profile-consent").checked;

        if (!displayName || !username) {
            message.textContent =
                "Please enter your display name and username.";
            return;
        }

        if (!/^[A-Za-z0-9_]{3,30}$/.test(username)) {
            message.textContent =
                "Your username must be 3–30 characters using letters, numbers, and underscores.";
            return;
        }

        if (!consent) {
            message.textContent =
                "Please confirm the age and profile information statement.";
            return;
        }

        // No profile information is saved or uploaded at this stage.
        message.textContent =
            "The form is working! Your information has not been saved or published yet. Account registration and secure profile storage must be connected before your profile can go live.";

        console.log("Creator profile form validated.", {
            displayName: displayName,
            username: username,
            bioProvided: Boolean(bio),
            locationProvided: Boolean(location),
            socialLinkProvided: Boolean(socialLink)
        });
    });
});
