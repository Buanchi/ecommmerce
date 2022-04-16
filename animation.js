function scanDocument() {
    let sectionList = document.querySelectorAll('.hidden')
    sectionList.forEach(function (section) {
        section.classList.remove('hidden')
    })
}

addEventListener("load", scanDocument)