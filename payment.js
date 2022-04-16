let cart = []
const DOMcart = document.getElementById('cartList')
const DOMtotal = document.getElementById('total')

loadLocalStorage()


function renderCart() {
    DOMcart.textContent = ''

    //filtro de duplicados para evitar renderizados innecesarios
    let cartWithoutDup = cart.filter((item, index) => {

        const _item = JSON.stringify(item)

        return index === cart.findIndex(item => {
            return JSON.stringify(item) === _item
        })
    })
    cartWithoutDup.forEach(p => {

        //contenedor del producto
        const productCart = document.createElement('li')
        DOMcart.append(productCart)
        productCart.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'lh-sm', 'align-items-center')
        //contador de cantidad
        const amount = cart.reduce((acc, item) => {
            if (item.id == p.id)
                return acc += 1
            else
                return acc
        }, 0)

        //creacion de card del producto
        let { name, price } = p
        productCart.innerHTML = `
        <div>
            <h6 class="my-0">${name}</h6>
            <small class="text-muted">Units: ${amount}</small>
        </div>
        <span class="text-muted">$${price * amount}</span>
        `


    });
    //guarda el total en el dom
    DOMtotal.textContent = calculateTotal()
    saveLocalStorage()

}

const validateCreditCard = (card) => {
    const creditCardRegex = /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/
    if(creditCardRegex.test(card)) return true
    else return false
}

function calculateTotal() {
    return cart.reduce((acc, itemId) => acc + itemId.price, 0)
}

function saveLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart))
}

function loadLocalStorage() {
    localStorage.getItem('cart') ? cart = JSON.parse(localStorage.getItem('cart')) : localStorage.setItem('cart', JSON.stringify(cart))
}
renderCart()


//imprime informacion de contacto
let info = JSON.parse(localStorage.getItem('Shipping'))
const infoContact = document.getElementById('infoContact')
const infoAddress = document.getElementById('infoAddress')
const infoName = document.getElementById('infoName')
let { firstName, lastName, email, address, country, state, zip } = info
infoContact.innerText = `${email}`
infoAddress.innerText = `${address}, ${zip}, ${state}, ${country}`
infoName.innerText = `${firstName} ${lastName}`
