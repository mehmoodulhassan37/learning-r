const emotions = [
    {
        name: 'Happy',
        emoji: '😊',
        effect: 'You might smile, laugh, and want to share your joy with friends.'
    },
    {
        name: 'Sad',
        emoji: '😢',
        effect: 'You may feel like crying or wanting a comforting hug.'
    },
    {
        name: 'Angry',
        emoji: '😡',
        effect: 'You might clench your fists or want to yell, but taking deep breaths can help.'
    },
    {
        name: 'Surprised',
        emoji: '😲',
        effect: 'Your eyes might open wide when something unexpected happens.'
    },
    {
        name: 'Calm',
        emoji: '😌',
        effect: 'You feel relaxed, maybe taking deep breaths or sitting quietly.'
    }
];

let currentIndex = 0;
let score = 0;
let shuffled = [];

const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const gameDiv = document.getElementById('game');
const emojiDiv = document.getElementById('emoji');
const optionsDiv = document.getElementById('options');
const feedbackP = document.getElementById('feedback');
const scoreP = document.getElementById('score');

startBtn.addEventListener('click', startGame);
nextBtn.addEventListener('click', showNext);

function startGame() {
    startBtn.classList.add('hidden');
    shuffled = emotions.sort(() => 0.5 - Math.random());
    currentIndex = 0;
    score = 0;
    gameDiv.classList.remove('hidden');
    scoreP.textContent = '';
    showQuestion();
}

function showQuestion() {
    const current = shuffled[currentIndex];
    emojiDiv.textContent = current.emoji;
    feedbackP.textContent = '';
    nextBtn.classList.add('hidden');
    optionsDiv.innerHTML = '';

    const options = shuffle([
        current.name,
        ...emotions.filter(e => e.name !== current.name).slice(0, 3).map(e => e.name)
    ]);

    options.forEach(option => {
        const btn = document.createElement('button');
        btn.textContent = option;
        btn.addEventListener('click', () => selectOption(option, current));
        optionsDiv.appendChild(btn);
    });
}

function selectOption(option, current) {
    const correct = option === current.name;
    if (correct) {
        score++;
        feedbackP.textContent = `Correct! ${current.effect}`;
    } else {
        feedbackP.textContent = `Oops! That was ${option}. It was actually ${current.name}. ${current.effect}`;
    }
    Array.from(optionsDiv.children).forEach(btn => {
        btn.disabled = true;
    });
    nextBtn.classList.remove('hidden');
}

function showNext() {
    currentIndex++;
    if (currentIndex < shuffled.length) {
        showQuestion();
    } else {
        endGame();
    }
}

function endGame() {
    emojiDiv.textContent = '';
    optionsDiv.innerHTML = '';
    feedbackP.textContent = 'Great job!';
    scoreP.textContent = `You guessed ${score} out of ${shuffled.length} correctly.`;
    startBtn.textContent = 'Play Again';
    startBtn.classList.remove('hidden');
    nextBtn.classList.add('hidden');
}

function shuffle(array) {
    return array.sort(() => 0.5 - Math.random());
}
