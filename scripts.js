async function convertValues() {
    const inputValorDigitadoValue = document.querySelector('.input-valor-digitado');
    const currenceValorSerConverter = document.querySelector('.currence-valor-ser-converter');
    const currenceValorConvertido = document.querySelector('.currence-valor-convertido');

    const valor = Number(inputValorDigitadoValue.value);

    if (!valor || valor <= 0) {
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
            `https://api.frankfurter.app/latest?from=BRL&to=${moeda}`
        );

        const data = await response.json();

        const taxa = data.rates?.[moeda];

        if (!taxa) {
            throw new Error("Taxa não encontrada para " + moeda);
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
        console.error(erro);
    }
}
