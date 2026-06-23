document.addEventListener("DOMContentLoaded", () => {

const botaoConverter = document.querySelector('.botao-converter');
const currenceSelecionarMoeda = document.querySelector('.currence-selecionar-moeda');

function convertValues() {
    const inputValorDigitadoValue = document.querySelector('.input-valor-digitado');
    const currenceValorSerConverter = document.querySelector('.currence-valor-ser-converter');
    const currenceValorConvertido = document.querySelector('.currence-valor-convertido');

    const valor = Number(inputValorDigitadoValue.value);

    if (isNaN(valor) || valor <= 0) {
        alert("Digite um valor válido");
        return;
    }

    const moeda = currenceSelecionarMoeda.value;

    currenceValorSerConverter.innerHTML = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(valor);

    fetch(`https://api.frankfurter.app/latest?amount=${valor}&from=BRL&to=${moeda}`)
        .then(res => res.json())
        .then(data => {

            const taxa = data.rates[moeda];

           
            let locale = 'en-US';
            if (moeda === 'EUR') locale = 'de-DE';
            if (moeda === 'GBP') locale = 'en-GB';

            currenceValorConvertido.innerHTML = new Intl.NumberFormat(locale, {
                style: 'currency',
                currency: moeda
            }).format(valorConvertido);

        })
        .catch(err => {
            console.error(err);
        });
}

function changeCurrence() {
    const currenceNome = document.getElementById('currence-nome');
    const currenceImagem = document.querySelector('.currence-img');

    const moeda = currenceSelecionarMoeda.value;

    if (moeda === 'USD') {
        currenceNome.innerHTML = 'Dólar';
        currenceImagem.src = './assets/icons8-circular-dos-eua-50.png';
    } else if (moeda === 'EUR') {
        currenceNome.innerHTML = 'Euro';
        currenceImagem.src = './assets/logo-euro.png';
    } else if (moeda === 'GBP') {
        currenceNome.innerHTML = 'Libra';
        currenceImagem.src = './assets/icons8-moeda-de-libra-53.png';
    }

    convertValues();
}

botaoConverter.addEventListener('click', convertValues);
currenceSelecionarMoeda.addEventListener('change', changeCurrence);

});
