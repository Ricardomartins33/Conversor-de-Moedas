const botaoConverter = document.querySelector('.botao-converter')
const currenceSelecionarMoeda = document.querySelector('.currence-selecionar-moeda')

function convertValues() {


    const inputValorDigitadoValue = document.querySelector('.input-valor-digitado')

    console.log("Elemento inteiro:", inputValorDigitadoValue)
    console.log("Só o valor digitado:", inputValorDigitadoValue.value)

    const currenceValorSerConverter = document.querySelector('.currence-valor-ser-converter')

    const currenceValorConvertido = document.querySelector('.currence-valor-convertido')

    const valor = Number(inputValorDigitadoValue.value)

    const dolar = valor / 5.25
    const euro = valor / 5.90
    const libra = valor / 6.90

    if (currenceSelecionarMoeda.value == 'Dolar') {
        currenceValorConvertido.innerHTML = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(dolar)

    }

    if (currenceSelecionarMoeda.value == 'Euro') {
        currenceValorConvertido.innerHTML = new Intl.NumberFormat('de-DE', {
            style: 'currency',
            currency: 'EUR'
        }).format(euro)
    }
    if (currenceSelecionarMoeda.value == 'Libra') {
        currenceValorConvertido.innerHTML = new Intl.NumberFormat('en-GB', {
            style: 'currency',
            currency: 'GBP'
        }).format(libra)

    }

    currenceValorSerConverter.innerHTML = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(valor)


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


currenceSelecionarMoeda.addEventListener('change', changeCurrence)

botaoConverter.addEventListener('click', convertValues)
