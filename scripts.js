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

    currenceValorSerConverter.innerHTML = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(valor);

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
