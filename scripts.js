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

    const resposta = await fetch(
        "https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,GBP-BRL"
    );

    const data = await resposta.json();

    const dolar = Number(data.USDBRL.high);
    const euro = Number(data.EURBRL.high);
    const libra = Number(data.GBPBRL.high);

    const moeda = moedaPara.value;

    const moedas = {
        USD: {
            nome: "Dólar americano",
            img: "assets/icons8-circular-dos-eua-50.png",
            taxa: dolar
        },
        EUR: {
            nome: "Euro",
            img: "assets/logo-euro.png",
            taxa: euro
        },
        GBP: {
            nome: "Libra Esterlina",
            img: "assets/icons8-moeda-de-libra-53.png",
            taxa: libra
        }
    };

    const moedaSelecionada = moedas[moeda];

    // segurança contra erro
    if (!moedaSelecionada) {
        console.log("Moeda inválida:", moeda);
        return;
    }

    // mostra valor em BRL
    resultadoBRL.innerHTML = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
    }).format(valor);

    // conversão
    const convertido = valor / moedaSelecionada.taxa;

    resultadoFinal.innerHTML = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: moeda
    }).format(convertido);

    // nome da moeda
    nomeMoeda.innerHTML = moedaSelecionada.nome;

    // imagem da moeda
    imgMoeda.src = moedaSelecionada.img;

    // fallback se imagem falhar
    imgMoeda.onerror = () => {
        imgMoeda.src = "assets/icons8-circular-dos-eua-50.png";
    };
}

// evento do botão
botaoConverter.addEventListener("click", converterMoeda);
