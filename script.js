function insert(num) {
    document.querySelector('.screen').innerHTML += num;
}

function clean() {
    document.querySelector('.screen').innerHTML = '';
}

function backSpace() {
    var screen = document.querySelector('.screen').innerHTML;

    document.querySelector('.screen').innerHTML = screen.substring(0, screen.length - 1);
}

function resultado() {
    var resultado = document.querySelector('.screen').innerHTML;

    document.querySelector('.screen').innerHTML = eval(resultado);

    if (resultado) {
        document.querySelector('.screen').innerHTML = eval(resultado);
    } else {
        document.querySelector('.screen').innerHTML = 'Nenhum resultado';
    }
}