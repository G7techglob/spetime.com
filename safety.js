
/* =====================================
   SPETIME SAFETY GUIDE
===================================== */

document.addEventListener("DOMContentLoaded", function () {

    // Display the current year in the footer.
    const yearElement = document.getElementById("current-year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Mark the current Safety page in the footer.
    const safetyLinks = document.querySelectorAll(
        '.safety-nav a[href="safety.html"], ' +
        '.safety-footer-links a[href="safety.html"]'
    );

    safetyLinks.forEach(function (link) {
        link.setAttribute("aria-current", "page");
    });

});
```
