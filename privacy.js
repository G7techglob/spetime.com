
/* =====================================
   SPETIME PRIVACY POLICY
===================================== */

document.addEventListener("DOMContentLoaded", function () {

    // Display the current year in the footer.
    const yearElement = document.getElementById("current-year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Highlight the Privacy Policy navigation link.
    const privacyLinks = document.querySelectorAll(
        '.privacy-nav a[href="privacy.html"], ' +
        '.privacy-footer-links a[href="privacy.html"]'
    );

    privacyLinks.forEach(function (link) {
        link.setAttribute("aria-current", "page");
    });

});
```
