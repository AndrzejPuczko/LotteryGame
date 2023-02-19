import '../scss/style.scss'

const btnNumbers = document.querySelectorAll('.coupon__numbers button')
const history = document.querySelector('.history')
const historyOl = document.querySelector('.history ol')
const startLottery = document.querySelector('.play')
const ballNumbers = document.querySelector('.balls')
const receipt = document.querySelector('.receipt')
const receiptNumbers = document.querySelector('.user__numbers')
const receiptDate = document.querySelector('.receipt__main-date p')
const congrats = document.querySelector('.congrats')
const couponTitle = document.querySelector('.title__text')
const coupon = document.querySelector('.coupon')
const btnAgain = document.querySelector('.again')
const error = document.querySelector('.error')
const errorInfo = document.querySelector('.error__box-info')
const errorBtnClose = document.querySelector('.error__box-close')
const balls = document.querySelectorAll('.balls p')
let score = 0
let userNumbers = []

const labels = {
	firstErrorMsg: 'Nie można skreślić dwa razy tej samej liczby',
	secondErrorMsg: 'Maksymalnie 6 liczb',
	otherErrorMsg: [
		'Proszę skreślić 6 liczb',
		'Proszę skreślić jeszcze 5 liczb',
		'Proszę skreślić jeszcze 4 liczby',
		'Proszę skreślić jeszcze 3 liczby',
		'Proszę skreślić jeszcze 2 liczby',
		'Proszę skreślić ostatnią liczbę',
	],
	yellowColorBall: 'radial-gradient(circle at 65% 15%, white 1px, #fff30f 3%, #e6b100 60%, #a37f06 100%)',
	greenColorBall: 'radial-gradient(circle at 65% 15%, white 1px, #8ef362 3%, #06bc0b 60%, rgb(25 49 10) 100%)',
}

const chooseYourNumber = ({ target }) => {
	const yourChoice = +target.innerHTML
	if (userNumbers.includes(yourChoice)) {
		errorInfo.textContent = labels.firstErrorMsg
		error.style.display = 'flex'
		return
	}

	if (userNumbers.length < 6) {
		userNumbers.push(yourChoice)
		target.classList.add('cross')
		return
	}

	errorInfo.textContent = labels.secondErrorMsg
	error.style.display = 'flex'
}

const checkYourNumbers = () => {
	if (userNumbers.length == 6) {
		return playGame()
	}
	errorInfo.textContent = labels.otherErrorMsg[userNumbers.length]
	error.style.display = 'flex'
}

const closeErrorInfo = () => {
	error.style.display = 'none'
}

const playAgain = () => {
	;[coupon, couponTitle, startLottery].forEach(item => (item.style.display = 'flex'))
	;[ballNumbers, receipt, btnAgain].forEach(item => (item.style.display = 'none'))
}

const loadFinalContent = () => {
	receiptDate.textContent = new Date().toLocaleString('pl-PL')

	const historyItem = document.createElement('li')
	if (score === 0) {
		historyItem.textContent = userNumbers.join(' | ') + ' - Brak trafień'
		congrats.innerHTML = `Nie trafiłeś żadnej liczby <br> Daj sobie jeszcze jedną szansę`
	} else if (score < 2) {
		historyItem.textContent = userNumbers.join(' | ') + ` - ${score} trafienie`
		congrats.innerHTML = `Trafiłeś ${score} raz <br> gratulacje`
	} else if (score >= 5) {
		historyItem.textContent = userNumbers.join(' | ') + ` - ${score} trafień`
		congrats.innerHTML = `Trafiłeś ${score} razy <br> gratulacje`
	} else {
		historyItem.textContent = userNumbers.join(' | ') + ` - ${score} trafienia`
		congrats.innerHTML = `Trafiłeś ${score} razy <br> gratulacje`
	}

	historyOl.append(historyItem)
	;[coupon, couponTitle, startLottery].forEach(item => (item.style.display = 'none'))
	;[ballNumbers, receipt, btnAgain, history].forEach(item => (item.style.display = 'flex'))

	if (score === 6) {
		setTimeout(() => {
			errorInfo.textContent = 'Trafiłeś szóstkę szczęściarzu'
			error.classList.add('display-flex')
		}, 2800)
	}

	btnNumbers.forEach(item => item.setAttribute('class', ''))
	userNumbers = []
}

const playGame = () => {
	balls.forEach(ball => (ball.style.background = labels.yellowColorBall))
	const greenColorBall = labels.greenColorBall

	const randomNumbers = Array.from(Array(15), (_, index) => index + 1)
	balls.forEach(ball => (ball.textContent = randomNumbers.splice(Math.floor(Math.random() * randomNumbers.length), 1)))

	const ballsArray = Array.from(balls)
	const ballsHit = ballsArray.filter(({ textContent }) => userNumbers.includes(+textContent))
	ballsHit.forEach(ball => (ball.style.background = greenColorBall))

	score = ballsHit.length
	receiptNumbers.textContent = userNumbers.join(' ')
	loadFinalContent()
}

btnNumbers.forEach(item => item.addEventListener('click', chooseYourNumber))
startLottery.addEventListener('click', checkYourNumbers)
btnAgain.addEventListener('click', playAgain)
errorBtnClose.addEventListener('click', closeErrorInfo)
