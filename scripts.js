const botaoConverter = document.querySelector('.botao-converter');
const currenceSelecionarMoeda = document.querySelector('.currence-selecionar-moeda');

async function convertValues() {
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

    try {
        currenceValorConvertido.innerHTML = "Carregando...";

        
        const response = await fetch(
            `https://api.frankfurter.app/latest?from=BRL`
        );

        const data = await response.json();

        const taxa = data.rates[moeda];

        if (!taxa) {
            throw new Error("Moeda não encontrada na API");
        }

        const valorConvertido = valor * taxa;

        let locale = 'en-US';
        if (moeda === 'EUR') locale = 'de-DE';
        if (moeda === 'GBP') locale = 'en-GB';
        if (moeda === 'USD') locale = 'en-US';

        currenceValorConvertido.innerHTML = new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: moeda
        }).format(valorConvertido);

    } catch (erro) {
        currenceValorConvertido.innerHTML = "Erro ao converter.";
        console.error("Erro:", erro);
    }
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

currenceSelecionarMoeda.addEventListener('change', changeCurrence);
botaoConverter.addEventListener('click', convertValues);
