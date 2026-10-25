


document.addEventListener("DOMContentLoaded", function () {

    // AGE NOTICE ELEMENTS
    const ageNotice = document.getElementById("age-notice");
    const enterButton = document.getElementById("enter-site");
    const leaveButton = document.getElementById("leave-site");

    // COPYRIGHT YEAR
    const yearElements = document.querySelectorAll("#current-year");

    yearElements.forEach(function (element) {
        element.textContent = new Date().getFullYear();
    });

    // CHECK WHETHER THE VISITOR HAS CONFIRMED THEY ARE 18+
    const ageConfirmed = sessionStorage.getItem("spetimeAgeConfirmed");

    if (ageNotice && ageConfirmed === "yes") {
        ageNotice.style.display = "none";
    }

    // ENTER THE WEBSITE
    if (enterButton && ageNotice) {
        enterButton.addEventListener("click", function () {

            sessionStorage.setItem("spetimeAgeConfirmed", "yes");

            ageNotice.style.display = "none";
        });
    }

    // LEAVE THE WEBSITE
    if (leaveButton) {
        leaveButton.addEventListener("click", function () {
            window.location.href = "https://www.google.com/";
        });
    }

});
