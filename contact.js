/* =====================================
   SPETIME CONTACT PAGE
===================================== */

document.addEventListener("DOMContentLoaded", function () {
    // Display the current year in the footer.
    const yearElement = document.getElementById("current-year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Handle the contact form safely.
    const contactForm = document.getElementById("contact-form");
    const statusMessage = document.getElementById("contact-form-status");

    if (contactForm && statusMessage) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            statusMessage.textContent =
                "Your message has not been sent. Contact support is not connected yet. Please check back later.";

            statusMessage.setAttribute("role", "alert");
        });
    }
});
```
