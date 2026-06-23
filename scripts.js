const botaoConverter = document.querySelector('.botao-converter');

const moedaOrigem = document.querySelector('.currence-valor-ser-converter');
const moedaDestino = document.querySelector('.currence-valor-convertido');

const inputValor = document.querySelector('.input-valor-digitado');

async function converter() {
    const valor = Number(inputValor.value);

    if (!valor || valor <= 0) {
        alert("Digite um valor válido");
        return;
    }

    const moedaDe = moedaOrigem.value;
    const moedaPara = moedaDestino.value;

    try {
        const response = await fetch(
            `https://api.exchangerate.host/convert?from=${moedaDe}&to=${moedaPara}&amount=${valor}`
        );

        const data = await response.json();

        const resultado = data.result;

        document.querySelector('.valor-convertido-final').innerHTML =
            resultado.toFixed(2);

        document.querySelector('.valor-moeda-origem').innerHTML = valor.toFixed(2);

    } catch (error) {
        console.log(error);
        alert("Erro ao buscar conversão");
    }
}


botaoConverter.addEventListener('click', converter);


moedaOrigem.addEventListener('change', converter);
moedaDestino.addEventListener('change', converter);
