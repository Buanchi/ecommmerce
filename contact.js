class Mail {
    constructor(name, email, message) {
        this.name = name;
        this.email = email;
        this.message = message;
    }
}
//array de objetos correo
let mails = []

localStorage.setItem('Mails', JSON.stringify(mails))
let form = document.getElementById('form')
//evento submit del formulario
form.addEventListener('submit', (e) => {
    e.preventDefault()
    let datForm = new FormData(e.target)
    if (validateEmail(datForm.get('email'))) {
        const mail = new Mail(datForm.get('name'), datForm.get('email'), datForm.get('message'))
        mails.push(mail)
        Swal.fire({
            title: '<strong>Message sent</strong>',
            icon: 'success',
            html:
                '<a href="index.html">Continue shopping</a>',
            showCloseButton: true,
            showCancelButton: false,
            focusConfirm: false,
            confirmButtonColor: "#000",
            confirmButtonText:
                'Great',
        })
        localStorage.setItem('Mails', JSON.stringify(mails))
        form.reset()
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Invalid email',
            confirmButtonColor: "#000",
        })
    }


})
const validateEmail = (email) => {
    const emailRegex = /^(([^<>()\[\]\\.,:\s@"]+(\.[^<>()\[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if (emailRegex.test(email))
        return true
    else
        return false
}

cart = []
loadLocalStorage()
function loadLocalStorage() {
    localStorage.getItem('cart') ? cart = JSON.parse(localStorage.getItem('cart')) : localStorage.setItem('cart', JSON.stringify(cart))
}
//contador de productos del boton carrito
let counter = document.getElementById("cartCounter");
counter.innerText = `${cart.length}`;


