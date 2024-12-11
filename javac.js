document.addEventListener('DOMContentLoaded', () => {
    let numQuestions, operations, correctResponses = 0, incorrectResponses = 0, currentQuestion = 0, timer;
    let startTime = new Date();

    
    document.getElementById('start-game').addEventListener('click', () => {
        numQuestions = parseInt(document.getElementById('num-questions').value);
        operations = [];
        if (document.getElementById('add').checked) operations.push('+');
        if (document.getElementById('sub').checked) operations.push('-');
        if (document.getElementById('mul').checked) operations.push('*');
        if (document.getElementById('div').checked) operations.push('/');

        if (operations.length === 0) {
            alert('Please select at least one operation');
            return;
        }

        document.getElementById('settings').style.display = 'none';
        document.getElementById('game').style.display = 'block';
        generateProblem();
        startTimer();
    });

    
    function generateProblem() {
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        const operation = operations[Math.floor(Math.random() * operations.length)];
        document.getElementById('question').textContent = `${num1} ${operation} ${num2} = `;
        document.getElementById('result').textContent = '';
        document.getElementById('userAnswer').value = '';
        document.getElementById('checkAnswer').disabled = false;
    }

    
    document.getElementById('checkAnswer').addEventListener('click', () => {
        const num1 = parseInt(document.getElementById('question').textContent.split(' ')[0]);
        const num2 = parseInt(document.getElementById('question').textContent.split(' ')[2]);
        const operation = document.getElementById('question').textContent.split(' ')[1];
        const userAnswer = parseInt(document.getElementById('userAnswer').value);
        let correctAnswer;

        switch (operation) {
            case '+': correctAnswer = num1 + num2; break;
            case '-': correctAnswer = num1 - num2; break;
            case '*': correctAnswer = num1 * num2; break;
            case '/': correctAnswer = num1 / num2; break;
        }

        if (userAnswer === correctAnswer) {
            correctResponses++;
            document.getElementById('result').textContent = 'Correct!';
        } else {
            incorrectResponses++;
            document.getElementById('result').textContent = `Incorrect! Correct answer is ${correctAnswer}`;
        }

        document.getElementById('checkAnswer').disabled = true;
        document.getElementById('nextProblem').style.display = 'inline-block';
    });

    
    document.getElementById('nextProblem').addEventListener('click', () => {
        currentQuestion++;
        if (currentQuestion < numQuestions) {
            generateProblem();
            document.getElementById('nextProblem').style.display = 'none';
        } else {
            endGame();
        }
    });

    
    function startTimer() {
        let timeLeft = 60;  // 1 minute timer
        const timerElement = document.getElementById('timer');
        const timerInterval = setInterval(() => {
            timeLeft--;
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            timerElement.textContent = `Time: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                endGame();
            }
        }, 1000);
    }

    
    function endGame() {
        clearInterval(timer);
        document.getElementById('game').style.display = 'none';
        document.getElementById('results').style.display = 'block';
        document.getElementById('correctResponses').textContent = correctResponses;
        document.getElementById('incorrectResponses').textContent = incorrectResponses;
        const timeTaken = new Date() - startTime;
        const minutes = Math.floor(timeTaken / 60000);
        const seconds = Math.floor((timeTaken % 60000) / 1000);
        document.getElementById('timeTaken').textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
});
