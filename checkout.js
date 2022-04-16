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
class Shipments {
    constructor(firstName, lastName, email, address, address2, country, state, zip) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.address = address;
        this.address2 = address2;
        this.country = country;
        this.state = state;
        this.zip = zip;
    }
}
const validateEmail = (email) => {
    const emailRegex = /^(([^<>()\[\]\\.,:\s@"]+(\.[^<>()\[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if (emailRegex.test(email))
        return true
    else
        return false
}
//objeto envio
let shipping 

localStorage.setItem('Shipping', JSON.stringify(shipping))
let form = document.getElementById('form')
//evento submit del formulario
form.addEventListener('submit', (e) => {
    e.preventDefault()
    let datForm = new FormData(e.target)
    if (validateEmail(datForm.get('email'))) {
        const ship = new Shipments(datForm.get('firstName'), datForm.get('lastName'), datForm.get('email'), datForm.get('address'), datForm.get('address2'), datForm.get('country'), datForm.get('state'), datForm.get('zip'))
        shipping = ship
        localStorage.setItem('Shipping', JSON.stringify(shipping))
        form.reset()
        location.href='payment.html'
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Invalid email',
            confirmButtonColor: "#000",
        })
    }

})
