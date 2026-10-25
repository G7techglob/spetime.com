
document.addEventListener("DOMContentLoaded", function () {

    // AUTOMATIC COPYRIGHT YEAR
    const yearElements = document.querySelectorAll("#current-year");

    yearElements.forEach(function (element) {
        element.textContent = new Date().getFullYear();
    });

    // HIGHLIGHT THE CURRENT ABOUT PAGE LINK
    const aboutLinks = document.querySelectorAll(
        '.about-nav a[href="about.html"]'
    );

    aboutLinks.forEach(function (link) {
        link.setAttribute("aria-current", "page");
    });

    // CONFIRM THAT INTERNAL PAGE LINKS ARE SET
    const contactLinks = document.querySelectorAll(
        'a[href="contact.html"]'
    );

    contactLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            // Normal browser navigation continues.
        });
    });

    // SAFETY NOTICE
    const safetyNotice = document.getElementById("about-safety-notice");

    if (safetyNotice) {
        safetyNotice.setAttribute("role", "note");
        safetyNotice.setAttribute("aria-label", "Safety information");
    }

});
