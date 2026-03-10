const botaoConverter = document.querySelector('.botao-converter')
const currenceSelecionarMoeda = document.querySelector('.currence-selecionar-moeda')

async function convertValues() {
    const inputValorDigitadoValue = document.querySelector('.input-valor-digitado')
    const currenceValorSerConverter = document.querySelector('.currence-valor-ser-converter')
    const currenceValorConvertido = document.querySelector('.currence-valor-convertido')
    const valor = Number(inputValorDigitadoValue.value)
    const moedaSelecionada = currenceSelecionarMoeda.value

    // Mostra valor original em BRL
    currenceValorSerConverter.innerHTML = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(valor)

    const moedaMap = {
        Dolar: 'USD',
        Euro: 'EUR',
        Libra: 'GBP'
    }

    // URL da API com sua chave
    const url = `https://api.apilayer.com/fixer/convert?apikey=a74200e6e60785c01d5fe431efe78c00&from=BRL&to=${moedaMap[moedaSelecionada]}&amount=${valor}`

    try {
        const response = await fetch(url)
        const data = await response.json()

        if (data.result) {
            // Atualiza valor convertido
            currenceValorConvertido.innerHTML = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: moedaMap[moedaSelecionada]
            }).format(data.result)
        } else {
            console.error("Erro na API:", data)
            currenceValorConvertido.innerHTML = "Erro"
        }

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
