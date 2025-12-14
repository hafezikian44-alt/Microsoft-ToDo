document.getElementById("AllMicrosoftBtn").addEventListener("click", () => {
    document.getElementById("AllMicrosoftSection").style.display = "flex";
});
document.getElementById("searchBtn").addEventListener("click", () => {
    document.getElementById("AllMicrosoftBtn").style.display = "none";
    document.getElementById("headerList").style.display = "none";
    document.getElementById("cartBtn").style.display = "none";
    document.getElementById("signInBtn").style.display = "none";
    document.getElementById("searchBtn").style.display = "none";
    document.getElementById("searchSection").style.display = "flex";
});
document.getElementById("cancelSearchBtn").addEventListener("click", () => {
    document.getElementById("AllMicrosoftBtn").style.display = "flex";
    if (window.innerWidth > 768) {
        document.getElementById("headerList").style.display = "flex";
    }
    document.getElementById("cartBtn").style.display = "flex";
    document.getElementById("signInBtn").style.display = "flex";
    document.getElementById("searchBtn").style.display = "flex";
    document.getElementById("searchSection").style.display = "none";
});
document.getElementById("mobileMenuBtn").addEventListener("click", () => {
    document.getElementById("mobileList").style.display = "block";
    document.getElementById("mainSection").style.display = "none";
});
