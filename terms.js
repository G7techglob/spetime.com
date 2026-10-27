
/* =====================================
   SPETIME TERMS OF USE
===================================== */

document.addEventListener("DOMContentLoaded", function () {

    // Display the current year in the footer.
    const yearElement = document.getElementById("current-year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Mark the current Terms of Use page in the footer.
    const termsLinks = document.querySelectorAll(
        '.terms-nav a[href="terms.html"], ' +
        '.terms-footer-links a[href="terms.html"]'
    );

    termsLinks.forEach(function (link) {
        link.setAttribute("aria-current", "page");
    });

});
```
