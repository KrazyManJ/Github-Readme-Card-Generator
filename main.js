"use strict";
var link = "https://github-readme-stats.vercel.app/api?";
window.onload = () => {
    var input = document.querySelector("form");
    var preview = document.getElementById("preview");
    Array.from(input.elements).forEach(e => {
        e.value = e.getAttribute("placeholder");
    });
    updatePreview();
    document.getElementById("input").addEventListener("change", () => {
        updatePreview();
    });
    function updatePreview() {
        var params = [];
        Array.from(input.elements).forEach(e => {
            params.push(`${e.name}=${e.value}`);
        });
        preview.src = link + params.join("&");
    }
};
