import '../scss/style.scss'

let lotteryNumbers = []
let userNumbers = []
let btnNumbers
let history
let historyOl
let startLottery
let btnAgain
let score = 0
let ballNumber
let ballNumberOne
let ballNumberTwo
let ballNumberThree
let ballNumberFour
let ballNumberFive
let ballNumberSix
let receipt
let receiptNumbers
let receiptDate
let reset
let congrats
let title
let coupon
let error
let errorInfo
let errorBtnClose

const main = () => {
	prepareDOMElements()
	prepareDOMEvents()
}

const prepareDOMElements = () => {
	btnNumbers = document.querySelectorAll('.coupon__numbers button')
	history = document.querySelector('.history')
	historyOl = document.querySelector('.history ol')
	startLottery = document.querySelector('.play')
	ballNumber = document.querySelector('.ball__number')
	ballNumberOne = document.querySelector('.ball__number--1')
	ballNumberTwo = document.querySelector('.ball__number--2')
	ballNumberThree = document.querySelector('.ball__number--3')
	ballNumberFour = document.querySelector('.ball__number--4')
	ballNumberFive = document.querySelector('.ball__number--5')
	ballNumberSix = document.querySelector('.ball__number--6')
	receipt = document.querySelector('.receipt')
	receiptNumbers = document.querySelector('.user__numbers')
	receiptDate = document.querySelector('.receipt__main-date p')
	reset = document.querySelectorAll('.reset')
	congrats = document.querySelector('.congrats')
	title = document.querySelector('.title__text')
	coupon = document.querySelector('.coupon')
	btnAgain = document.querySelector('.again')
	error = document.querySelector('.error')
	errorInfo = document.querySelector('.error__box-info')
	errorBtnClose = document.querySelector('.error__box-close')
}

const prepareDOMEvents = () => {
	btnNumbers.forEach(item => item.addEventListener('click', choseYourNumber))
	startLottery.addEventListener('click', checkYourNumbers)
	btnAgain.addEventListener('click', playAgain)
	errorBtnClose.addEventListener('click', closeErrorInfo)
}

const choseYourNumber = e => {
	const numbers = parseInt(e.target.innerHTML)
	if (userNumbers.includes(numbers)) {
		errorInfo.textContent = 'Nie można skreślić dwa razy tej samej liczby'
		error.classList.add('display-flex')
	} else {
		if (userNumbers.length < 6) {
			switch (numbers) {
				case numbers:
					userNumbers.push(numbers)
					e.target.setAttribute('class', 'cross')
					break
			}
		} else {
			errorInfo.textContent = 'Maksymalnie 6 liczb'
			error.classList.add('display-flex')
		}
	}

	console.log(userNumbers)
}

const currentData = () => {
	const data = new Date()
	const addZero = value => {
		return String(value).padStart(2, 0)
	}
	receiptDate.textContent = `${data.getDate()}.${addZero(data.getMonth() + 1)}.${data.getFullYear()} ${addZero(data.getHours())}:${addZero(data.getMinutes())}:${addZero(
		data.getSeconds()
	)}`
}

const resetColor = () => {
	let i
	for (i = 0; i < reset.length; i++) {
		reset[i].style.background = 'radial-gradient(circle at 65% 15%, white 1px, #fff30f 3%, #e6b100 60%, #a37f06 100%)'
	}
}

const congratsText = () => {
	if (score === 0) {
		congrats.innerHTML = `Nie trafiłeś żadnej liczby <br> Daj sobie jeszcze jedną szansę`
	} else if (score < 2) {
		congrats.innerHTML = `Trafiłeś ${score} raz <br> gratulacje`
	} else {
		congrats.innerHTML = `Trafiłeś ${score} razy <br> gratulacje`
	}
}

const historyText = () => {
	const historyItem = document.createElement('li')
	if (score === 0) {
		historyItem.textContent = userNumbers.join(' | ') + ' - Brak trafień'
	} else if (score < 2) {
		historyItem.textContent = userNumbers.join(' | ') + ` - ${score} trafienie`
	} else if (score >= 5) {
		historyItem.textContent = userNumbers.join(' | ') + ` - ${score} trafień`
	} else {
		historyItem.textContent = userNumbers.join(' | ') + ` - ${score} trafienia`
	}

	historyOl.append(historyItem)
}

const checkYourNumbers = () => {
	if (userNumbers.length < 6) {
		switch (userNumbers.length) {
			case 0:
				errorInfo.textContent = 'Proszę skreślić 6 liczb'
				error.classList.add('display-flex')
				break
			case 1:
				errorInfo.textContent = 'Proszę skreślić jeszcze 5 liczb'
				error.classList.add('display-flex')
				break
			case 2:
				errorInfo.textContent = 'Proszę skreślić jeszcze 4 liczby'
				error.classList.add('display-flex')
				break
			case 3:
				errorInfo.textContent = 'Proszę skreślić jeszcze 3 liczby'
				error.classList.add('display-flex')
				break
			case 4:
				errorInfo.textContent = 'Proszę skreślić jeszcze 2 liczby'
				error.classList.add('display-flex')
				break
			case 5:
				errorInfo.textContent = 'Proszę skreślić ostatnią liczbę'
				error.classList.add('display-flex')
				break
		}
	} else {
		playGame()
	}
}

const closeErrorInfo = () => {
	error.classList.remove('display-flex')
}

const hideCoupon = () => {
	coupon.setAttribute('style', 'display:none;')
	title.setAttribute('style', 'display:none;')
	startLottery.setAttribute('style', 'display:none;')
}

const showResult = () => {
	ballNumber.setAttribute('style', 'display:flex;')
	receipt.setAttribute('style', 'display:flex;')
	history.setAttribute('style', 'display:flex;')
	btnAgain.setAttribute('style', 'display:flex;')
}

const playAgain = () => {
	coupon.setAttribute('style', 'display:flex;')
	title.setAttribute('style', 'display:flex;')
	startLottery.setAttribute('style', 'display:flex;')
	ballNumber.setAttribute('style', 'display:none;')
	receipt.setAttribute('style', 'display:none;')
	btnAgain.setAttribute('style', 'display:none;')
}

const playGame = () => {
	while (lotteryNumbers.length < 6) {
		const randomNumber = Math.round(Math.random() * 14) + 1

		if (!lotteryNumbers.includes(randomNumber)) {
			lotteryNumbers.push(randomNumber)
		}
	}

	ballNumberOne.textContent = lotteryNumbers[0]
	ballNumberTwo.textContent = lotteryNumbers[1]
	ballNumberThree.textContent = lotteryNumbers[2]
	ballNumberFour.textContent = lotteryNumbers[3]
	ballNumberFive.textContent = lotteryNumbers[4]
	ballNumberSix.textContent = lotteryNumbers[5]

	resetColor()

	const backgroundColor = 'radial-gradient(circle at 65% 15%, white 1px, #8ef362 3%, #06bc0b 60%, rgb(25 49 10) 100%)'

	if (userNumbers.includes(lotteryNumbers[0])) {
		ballNumberOne.style.background = backgroundColor
		score++
	}
	if (userNumbers.includes(lotteryNumbers[1])) {
		ballNumberTwo.style.background = backgroundColor
		score++
	}
	if (userNumbers.includes(lotteryNumbers[2])) {
		ballNumberThree.style.background = backgroundColor
		score++
	}
	if (userNumbers.includes(lotteryNumbers[3])) {
		ballNumberFour.style.background = backgroundColor
		score++
	}
	if (userNumbers.includes(lotteryNumbers[4])) {
		ballNumberFive.style.background = backgroundColor
		score++
	}
	if (userNumbers.includes(lotteryNumbers[5])) {
		ballNumberSix.style.background = backgroundColor
		score++
	}

	receiptNumbers.textContent = userNumbers.join(' ')

	currentData()
	congratsText()
	historyText()
	hideCoupon()
	showResult()

	if (score === 6) {
		setTimeout(() => {
			errorInfo.textContent = 'Trafiłeś szóstkę szczęściarzu'
			error.classList.add('display-flex')
		}, 2800)
	}

	btnNumbers.forEach(item => item.setAttribute('class', ''))
	userNumbers = []
	lotteryNumbers = []
	score = 0
}

document.addEventListener('DOMContentLoaded', main)

// info na temat 6 cufr i tych samych oraz scss @media querys
// poustawiać JS ładnie
// ustaiwenia scss ładnie
