const botaoConverter = document.querySelector('.botao-converter');

const moedaDe = document.querySelector('.currence-valor-ser-converter');
const moedaPara = document.querySelector('.currence-selecionar-moeda');

const inputValor = document.querySelector('.input-valor-digitado');

const resultadoFinal = document.querySelector('.currence-valor-convertido');

const currencyName = document.getElementById('currency-name');
const currencyImg = document.getElementById('currency-img');

async function converterMoeda() {

    try {

        const valor = Number(inputValor.value);

        if (!valor) {
            resultadoFinal.innerHTML = "Digite um valor válido";
            return;
        }

        const data = await fetch(
            "https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL"
        ).then(res => res.json());

        const dolar = Number(data.USDBRL.high);
        const euro = Number(data.EURBRL.high);

        let resultado = 0;

        if (moedaPara.value === "US$ Dólar americano") {
            resultado = valor / dolar;

            resultadoFinal.innerHTML = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD"
            }).format(resultado);
        }

        if (moedaPara.value === "€ Euro") {
            resultado = valor / euro;

            resultadoFinal.innerHTML = new Intl.NumberFormat("de-DE", {
                style: "currency",
                currency: "EUR"
            }).format(resultado);
        }

    } catch (error) {
        console.log(error);
        resultadoFinal.innerHTML = "Erro na conversão";
    }
}

function changeCurrency() {

    if (moedaPara.value === "€ Euro") {
        currencyName.innerHTML = "Euro";
        currencyImg.src = "./assets/euro.png";
    }

    if (moedaPara.value === "US$ Dólar americano") {
        currencyName.innerHTML = "Dólar Americano";
        currencyImg.src = "./assets/eua.png";
    }

    converterMoeda();
}

botaoConverter.addEventListener("click", converterMoeda);
moedaPara.addEventListener("change", changeCurrency);
