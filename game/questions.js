function generateQuestion() {
    let a = Math.floor(Math.random() * 10) + 1;
    let b = Math.floor(Math.random() * 10) + 1;

    let correct = a + b;

    let answers = [correct, correct + 1, correct - 1, correct + 2];

    answers = answers.sort(() => Math.random() - 0.5);

    return {

        question: `${a} + ${b} = ?`,
        answers: answers,
        correct: answers.indexOf(correct)

    };
}
