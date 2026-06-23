const botaoConverter = document.querySelector('.botao-converter');

const moedaPara = document.querySelector('.currence-selecionar-moeda');
const inputValor = document.querySelector('.input-valor-digitado');

const resultadoBRL = document.querySelector('.currence-valor-ser-converter');
const resultadoFinal = document.querySelector('.currence-valor-convertido');

const nomeMoeda = document.getElementById('currence-nome');
const imgMoeda = document.querySelector('.currence-img');

async function converterMoeda() {

    const valor = Number(inputValor.value);

    if (!valor) return;

    const data = await fetch(
        "https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,GBP-BRL"
    ).then(r => r.json());

    const dolar = Number(data.USDBRL.high);
    const euro = Number(data.EURBRL.high);
    const libra = Number(data.GBPBRL.high);

    resultadoBRL.innerHTML = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
    }).format(valor);

    let resultado = 0;

    if (moedaPara.value === "USD") {
        resultado = valor / dolar;
        resultadoFinal.innerHTML = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD"
        }).format(resultado);

        nomeMoeda.innerHTML = "Dólar";
        imgMoeda.src = "assets/icons8-circular-dos-eua-50.png";
    }

    if (moedaPara.value === "EUR") {
        resultado = valor / euro;
        resultadoFinal.innerHTML = new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "EUR"
        }).format(resultado);

        nomeMoeda.innerHTML = "Euro";
        imgMoeda.src = "assets/euro.png";
    }

    if (moedaPara.value === "GBP") {
        resultado = valor / libra;
        resultadoFinal.innerHTML = new Intl.NumberFormat("en-GB", {
            style: "currency",
            currency: "GBP"
        }).format(resultado);

        nomeMoeda.innerHTML = "Libra";
        imgMoeda.src = "assets/libra.png";
    }
}

botaoConverter.addEventListener("click", converterMoeda);
moedaPara.addEventListener("change", converterMoeda);
