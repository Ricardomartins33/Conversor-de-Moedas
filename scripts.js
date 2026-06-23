const botaoConverter = document.querySelector('.botao-converter');

const moedaDe = document.querySelector('.currence-valor-ser-converter');
const moedaPara = document.querySelector('.currence-selecionar-moeda');

const inputValor = document.querySelector('.input-valor-digitado');

const resultadoFinal = document.querySelector('.currence-valor-convertido');

async function converterMoeda() {
    try {
        const valor = Number(inputValor.value);

        if (!valor) {
            resultadoFinal.innerHTML = "Digite um valor válido";
            return;
        }

        const url = `https://api.exchangerate-api.com/v4/latest/${moedaDe.value}`;

        const response = await fetch(url);
        const data = await response.json();

        const taxa = data.rates[moedaPara.value];

        if (!taxa) {
            resultadoFinal.innerHTML = "Moeda não encontrada";
            return;
        }

        const resultado = valor * taxa;

        resultadoFinal.innerHTML = resultado.toFixed(2);

    } catch (error) {
        console.log(error);
        resultadoFinal.innerHTML = "Erro na conversão";
    }
}

botaoConverter.addEventListener('click', converterMoeda);
