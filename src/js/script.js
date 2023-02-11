let lotteryNumbers = []
let userNumbers = []
let btnNumbers
let history
let startLottery
let score = 0
let ballNumberOne
let ballNumberTwo
let ballNumberThree
let ballNumberFour
let ballNumberFive
let ballNumberSix
let reciptNumbers
let reciptDate
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
	history = document.querySelector('.history ol')
	startLottery = document.querySelector('.play')
	ballNumberOne = document.querySelector('.ball__number--1')
	ballNumberTwo = document.querySelector('.ball__number--2')
	ballNumberThree = document.querySelector('.ball__number--3')
	ballNumberFour = document.querySelector('.ball__number--4')
	ballNumberFive = document.querySelector('.ball__number--5')
	ballNumberSix = document.querySelector('.ball__number--6')
	reciptNumbers = document.querySelector('.user__numbers')
	reciptDate = document.querySelector('.receipt__main-date p')
	reset = document.querySelectorAll('.reset')
	congrats = document.querySelector('.congrats')
	title = document.querySelector('.title__text')
	coupon = document.querySelector('.coupon')
}

const prepareDOMEvents = () => {
	btnNumbers.forEach(item => item.addEventListener('click', choseYourNumber))
	startLottery.addEventListener('click', checkYourNumbers)
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
	reciptDate.textContent = `${data.getDate()}.${addZero(data.getMonth() + 1)}.${data.getFullYear()} ${addZero(data.getHours())}:${addZero(data.getMinutes())}:${addZero(
		data.getSeconds()
	)}`
}

const resetColor = () => {
	let i
	for (i = 0; i < reset.length; i++) {
		reset[i].style.backgroundColor = 'yellow'
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

	history.append(historyItem)
}

const checkYourNumbers = () => {
	if (userNumbers.length < 6) {
		alert('Za mało cyfr musi być 6')
	} else {
		playGame()
	}
}

const hideCoupon = () => {
	title.classList.add('hide')
	coupon.classList.add('hide')

}

function playGame() {
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

	if (userNumbers.includes(lotteryNumbers[0])) {
		ballNumberOne.style.backgroundColor = 'green'
		score++
	}

	if (userNumbers.includes(lotteryNumbers[1])) {
		ballNumberTwo.style.backgroundColor = 'green'
		score++
	}
	if (userNumbers.includes(lotteryNumbers[2])) {
		ballNumberThree.style.backgroundColor = 'green'
		score++
	}
	if (userNumbers.includes(lotteryNumbers[3])) {
		ballNumberFour.style.backgroundColor = 'green'
		score++
	}
	if (userNumbers.includes(lotteryNumbers[4])) {
		ballNumberFive.style.backgroundColor = 'green'
		score++
	}
	if (userNumbers.includes(lotteryNumbers[5])) {
		ballNumberSix.style.backgroundColor = 'green'
		score++
	}
	console.log(`Wynik to${score}`)
	console.log(`Wynik loterii ` + lotteryNumbers)
	console.log(`Twoje numery` + userNumbers)

	currentData()
	congratsText()
	historyText()
	reciptNumbers.textContent = userNumbers.join(' ')
	hideCoupon()



	
	btnNumbers.forEach(item => item.setAttribute("class", ""))
	userNumbers = []
	lotteryNumbers = []
	score = 0
}

document.addEventListener('DOMContentLoaded', main)
