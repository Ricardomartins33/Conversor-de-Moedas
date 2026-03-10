const botaoConverter = document.querySelector('.botao-converter')
const currenceSelecionarMoeda = document.querySelector('.currence-selecionar-moeda')

async function convertValues() {
    const inputValorDigitadoValue = document.querySelector('.input-valor-digitado')
    const currenceValorSerConverter = document.querySelector('.currence-valor-ser-converter')
    const currenceValorConvertido = document.querySelector('.currence-valor-convertido')
    const valor = Number(inputValorDigitadoValue.value)
    const moedaSelecionada = currenceSelecionarMoeda.value


    currenceValorSerConverter.innerHTML = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(valor)

    
    const moedaMap = {
        Dolar: 'USD',
        Euro: 'EUR',
        Libra: 'GBP'
    }

    const url = `https://api.exchangerate.host/convert?from=BRL&to=${moedaMap[moedaSelecionada]}&amount=${valor}`

    try {
        const response = await fetch(url)
        const data = await response.json()

        // Atualiza valor convertido
        currenceValorConvertido.innerHTML = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: moedaMap[moedaSelecionada]
        }).format(data.result)

    } catch (error) {
        console.error("Erro ao buscar cotação:", error)
        currenceValorConvertido.innerHTML = "Erro"
    }
}

function changeCurrence() {
    const currenceNome = document.getElementById('currence-nome')
    const currenceImagem = document.querySelector('.currence-img')

    if (currenceSelecionarMoeda.value == 'Dolar') {
        currenceNome.innerHTML = 'Dólar'
        currenceImagem.src = './assets/icons8-circular-dos-eua-50.png'
    }
    if (currenceSelecionarMoeda.value == 'Euro') {
        currenceNome.innerHTML = 'Euro'
        currenceImagem.src = './assets/logo-euro.png'
    }
    if (currenceSelecionarMoeda.value == 'Libra') {
        currenceNome.innerHTML = 'Libra'
        currenceImagem.src = './assets/icons8-moeda-de-libra-53.png'
    }


    convertValues()
}

// Eventos
currenceSelecionarMoeda.addEventListener('change', changeCurrence)
botaoConverter.addEventListener('click', convertValues)
