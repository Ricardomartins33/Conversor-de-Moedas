const botaoConverter = document.querySelector('.botao-converter');

const moedaPara = document.querySelector('.currence-selecionar-moeda');
const inputValor = document.querySelector('.input-valor-digitado');

const resultadoBRL = document.querySelector('.currence-valor-ser-converter');
const resultadoFinal = document.querySelector('.currence-valor-convertido');

const nomeMoeda = document.getElementById('currence-nome');
const imgMoeda = document.querySelector('.currence-img');

async function converterMoeda() {

    const valor = Number(inputValor.value);

    if (!valor || valor <= 0) return;

    const data = await fetch(
        "https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,GBP-BRL"
    ).then(r => r.json());

    const dolar = Number(data.USDBRL.high);
    const euro = Number(data.EURBRL.high);
    const libra = Number(data.GBPBRL.high);

    const moeda = moedaPara.value;

    const moedas = {
        USD: {
            nome: "Dólar americano",
            img: "./assets/icons8-circular-dos-eua-50.png",
            taxa: dolar
        },
        EUR: {
            nome: "Euro",
            img: "./assets/euro.png",
            taxa: euro
        },
        GBP: {
            nome: "Libra Esterlina",
            img: "./assets/libra.png",
            taxa: libra
        }
    };

    const moedaSelecionada = moedas[moeda];

    
    resultadoBRL.innerHTML = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
    }).format(valor);

    
    const convertido = valor / moedaSelecionada.taxa;

    resultadoFinal.innerHTML = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: moeda
    }).format(convertido);

    
    nomeMoeda.innerHTML = moedaSelecionada.nome;

    
    imgMoeda.src = moedaSelecionada.img;

    imgMoeda.onerror = function () {
        imgMoeda.src = "./assets/icons8-circular-dos-eua-50.png";
    };
}

botaoConverter.addEventListener("click", converterMoeda);
