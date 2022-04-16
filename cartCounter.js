let cart = []

function loadLocalStorage() {
    localStorage.getItem('cart') ? cart = JSON.parse(localStorage.getItem('cart')) : localStorage.setItem('cart', JSON.stringify(cart))
}
function renderCounter() {
    let counter = document.getElementById("cartCounter")
    counter.innerText = `${cart.length}`
    DOMcart.textContent = ''
}


loadLocalStorage()
renderCounter()