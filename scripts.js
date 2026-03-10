const botaoConverter = document.querySelector('.botao-converter');
const currenceSelecionarMoeda = document.querySelector('.currence-selecionar-moeda');

async function convertValues() {
    const inputValorDigitadoValue = document.querySelector('.input-valor-digitado');
    const currenceValorSerConverter = document.querySelector('.currence-valor-ser-converter');
    const currenceValorConvertido = document.querySelector('.currence-valor-convertido');
    const valor = Number(inputValorDigitadoValue.value);
    const moedaSelecionada = currenceSelecionarMoeda.value;

    if (!valor) {
        alert("Digite um valor válido");
        return;
    }

    // Atualiza valor original
    currenceValorSerConverter.innerHTML = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(valor);

    // Mapeia moeda
    const moedaMap = {
        Dolar: 'USD',
        Euro: 'EUR',
        Libra: 'GBP'
    };

    try {
        const response = await fetch(`https://api.exchangerate.host/latest?base=BRL&symbols=${moedaMap[moedaSelecionada]}`);
        const data = await response.json();
        const taxa = data.rates[moedaMap[moedaSelecionada]];

        if (taxa) {
            currenceValorConvertido.innerHTML = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: moedaMap[moedaSelecionada]
            }).format(valor * taxa);
        } else {
            currenceValorConvertido.innerHTML = "Erro";
        }

    } catch (error) {
        console.error("Erro ao buscar cotação:", error);
        currenceValorConvertido.innerHTML = "Erro";
    }
}

function changeCurrence() {
    const currenceNome = document.getElementById('currence-nome');
    const currenceImagem = document.querySelector('.currence-img');

    if (currenceSelecionarMoeda.value === 'Dolar') {
        currenceNome.innerHTML = 'Dólar';
        currenceImagem.src = './assets/icons8-circular-dos-eua-50.png';
    } else if (currenceSelecionarMoeda.value === 'Euro') {
        currenceNome.innerHTML = 'Euro';
        currenceImagem.src = './assets/logo-euro.png';
    } else if (currenceSelecionarMoeda.value === 'Libra') {
        currenceNome.innerHTML = 'Libra';
        currenceImagem.src = './assets/icons8-moeda-de-libra-53.png';
    }

    // Chama a conversão sempre que mudar a moeda
    convertValues();
}

// Eventos
currenceSelecionarMoeda.addEventListener('change', changeCurrence);
botaoConverter.addEventListener('click', convertValues);
