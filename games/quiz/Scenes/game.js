  let questions = [{
            question: "who is the best?",
            answers: ["ella", "len", "dara", "james"],
            correct: 0
  },
{ question: 'who smells like beef',
answers:["the pope", "donald trump", "elon musk", "kanye"],
correct: 1
}, 
{ question: 'who is more likely to to be found stranded on desert island after all these years',
    answers: ["micheal Jackson", "the OG avril laveine", "madeline McCann", "princess Diana"],
    correct: 3
 },
 {question: 'what is ellas most favourite food in the whole wide world',
    answers: ["chicken", "pasta", "beans", "potatoes"],
    correct: 2
 },
 {question: 'who is ellas celebrity crush',
    answers: ["ed westwick", "young matt LeBlanc", "nate from gossip girl", "ian somerhalder"],
    correct:2
},
{question: 'what is Ellas favourite TV show', 
    answers: ["the vampire diaries", "brooklyn 99", "Gossip Girl", "boy meets world"],
    correct: 0
},
{question: 'What day is ella born',
    answers: ["April 21st", "March 4th", "august 26th", "february 28th"],
    correct: 1
},
{question: "what is ellas biggest flaw",
    answers: ["adhd", "being perfect", "she has none","looking like boo from monsters inc"],
    correct: 3
},
{question: "what is the name of ellas dead goldfish. RIP",
    answers: ["Alex jr", "carbonara", "dory", "max"],
    correct:0
},
{question: "for how many years was ella walking around blind",
    answers:["12", "3", "6", "17"],
    correct: 3
},
{question: "Whats is Ellas favourite drink",
    answers:["orange juice", "7up", "blackcurrent", "white monster"],
    correct: 2
},
{question: "Ella is illergic to what ingredient",
    answers:["dairy", "almond", "coconut", "aspartame"],
    correct: 2
},
{question: 'what is the name of Ellas best friend',
    answers: ["emma", "riley", "david", "joe"],
    correct: 3
}
]
let currentQuestionIndex = 0;
let score = 0;
let nextButton

export default class quizGame extends Phaser.Scene {
    //giving the game a key to be called
    constructor() {
        super('quizgame')
    }
       create() {
            this.showQuestions();
        }
    
        showQuestions() {
            this.children.removeAll(); // Clear previous question
    
            const question = questions[currentQuestionIndex];
    
            // Display question text
            let questionText = this.add.text(this.scale.width/2, 100, question.question, { fontSize: '24px', fill: '#fff' });
          //keeping text within screen by shifting words to new lines passed a certain parameter 
            //https://phaser.io/examples/v3.85.0/game-objects/text/view/word-wrap-by-width
            questionText.setWordWrapWidth(700)
            questionText.setOrigin(0.5)
    
            // Display answers
            question.answers.forEach((answer, index) => {
                const answerText = this.add.text(100, 200 + index * 50, answer, { fontSize: '20px', fill: '#fff' });
                answerText.setInteractive();
                answerText.on('pointerdown', () => this.checkAnswer(index));
            });
    
            // Re-create the next button
            this.nextButton = this.add.rectangle(400, 550, 200, 50, 0x6666ff).setInteractive();
            this.buttonText = this.add.text(400, 550, "Next Question", { fontSize: '24px', fill: '#fff' }).setOrigin(0.5);
    
            this.nextButton.setVisible(false);
            this.buttonText.setVisible(false);
    
            this.nextButton.on('pointerdown', () => {
                currentQuestionIndex++;
                if (currentQuestionIndex < questions.length) {
                    this.showQuestions();
                } else {
                    this.endQuiz();
                }
            });
        }
    
        checkAnswer(selectedIndex) {
            const question = questions[currentQuestionIndex];
    
            if (selectedIndex === question.correct) {
                score++;
                this.add.text(100, 500, "Correct!", { fontSize: '24px', fill: '#0f0' });
            } else {
                this.add.text(100, 500, "Wrong! \nThe correct answer is: " + question.answers[question.correct], { fontSize: '24px', fill: '#f00' });
            }
    
            // Show next button after answer is clicked
            this.nextButton.setVisible(true);
            this.buttonText.setVisible(true);
        }
    
        endQuiz() {
            this.children.removeAll();
            this.add.text(100, 100, "Quiz Over! Your score: " + score + "/" + questions.length, { fontSize: '32px', fill: '#fff' });
    
            let restartButton = this.add.rectangle(400, 300, 200, 50, 0xff4444).setInteractive();
            this.add.text(400, 300, "Restart Quiz", { fontSize: '24px', fill: '#fff' }).setOrigin(0.5);
    
            restartButton.on('pointerdown', () => this.restartQuiz());
        }
    
        restartQuiz() {
            currentQuestionIndex = 0;
            score = 0;
            this.showQuestions();
        }
    }

