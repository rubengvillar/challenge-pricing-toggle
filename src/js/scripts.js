document.addEventListener("DOMContentLoaded", function () {

    const check = document.getElementById('checked-price');
    const basic = document.getElementById('price-basic');
    const profesional = document.getElementById('price-professional');
    const master = document.getElementById('price-master');

    check.addEventListener('change', function (e) {
        const checkCurrent = e.target.checked
        if(checkCurrent) {
            basic.innerHTML = 19.99;
            profesional.innerHTML = 24.99
            master.innerHTML = 39.99
        } else {
            basic.innerHTML = 199.99;
            profesional.innerHTML = 249.99
            master.innerHTML = 399.99
        }
    });

});