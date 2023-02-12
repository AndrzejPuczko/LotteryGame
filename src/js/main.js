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
}

const prepareDOMEvents = () => {
	btnNumbers.forEach(item => item.addEventListener('click', choseYourNumber))
	startLottery.addEventListener('click', checkYourNumbers)
	btnAgain.addEventListener('click', playAgain)
}

const choseYourNumber = e => {
	const numbers = parseInt(e.target.innerHTML)
	if (userNumbers.includes(numbers)) {
		alert('ten sam numer')
	} else {
		if (userNumbers.length < 6) {
			switch (numbers) {
				case numbers:
					userNumbers.push(numbers)
					e.target.setAttribute("class", "cross");
					break
			}
		} else {
			alert('Maksymalnie 6 cyfr')
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
		alert('Za mało cyfr musi być 6')
	} else {
		playGame()
	}
}

const hideCoupon = () => {
	coupon.setAttribute('style' ,'display:none;')
	title.setAttribute('style' ,'display:none;')
	startLottery.setAttribute('style' ,'display:none;')


}

const showResult = () => {
	ballNumber.setAttribute('style' ,'display:flex;')
	receipt.setAttribute('style' ,'display:flex;')
	history.setAttribute('style' ,'display:flex;')
	btnAgain.setAttribute('style' ,'display:flex;')
	
}

const playAgain = () => {
	coupon.setAttribute('style' ,'display:flex;')
	title.setAttribute('style' ,'display:flex;')
	startLottery.setAttribute('style' ,'display:flex;')
	ballNumber.setAttribute('style' ,'display:none;')
	receipt.setAttribute('style' ,'display:none;')
	btnAgain.setAttribute('style' ,'display:none;')
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
	console.log(`Wynik to${score}`)
	console.log(`Wynik loterii ` + lotteryNumbers)
	console.log(`Twoje numery` + userNumbers)

	currentData()
	congratsText()
	historyText()
	receiptNumbers.textContent = userNumbers.join(' ')

	hideCoupon()
	showResult()

	
	btnNumbers.forEach(item => item.setAttribute("class", ""))
	userNumbers = []
	lotteryNumbers = []
	score = 0
}

document.addEventListener('DOMContentLoaded', main)
