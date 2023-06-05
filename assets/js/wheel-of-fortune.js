
class wheelOfFortune {
  deg = 0;
  attempts = 2;
  optionCount = 12;
  winnerNumbers = [];

  events = {
    winnerNumberEvent: (N) => console.log(N),
    gameOverEvent: (won) => console.log(won),
  };

  elements = {
    wheel: undefined,
    startButton: undefined,
    winnerNumberContainer: undefined,
    attemptNumberContainer: undefined,
    messageContainer: undefined,
  };

  constructor(
    elements,
    events
  ) {
    this.elements = elements;
    this.events = events;
  }

  init() {
    this.buttonEvent();
    this.transitionEvent()
    this.generateWinnerNumbers();
    this.updateAttemps();
  }

  updateAttemps = () => this.elements.attemptNumberContainer.innerHTML = this.attempts;

  generateWinnerNumbers() {
    let options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    options = options.sort(() => Math.random() - 0.5);
    this.winnerNumbers = options.slice(0, 4);
    if (this.elements.winnerNumberContainer) {
      this.elements.winnerNumberContainer.innerHTML = '';
      for (let index = 0; index < this.winnerNumbers.length; index++) {
        const element = this.winnerNumbers[index];
        this.elements.winnerNumberContainer.innerHTML
          = this.elements.winnerNumberContainer.innerHTML +
          `<div class="winner_option">
            <span class="number">${element}</span>
          </div>`;
      }

    }
  }

  buttonEvent() {
    if (!this.elements.wheel) {
      console.error('No wheel element found');
      return;
    }

    this.elements.startButton.addEventListener('click', () => {
      if (this.attempts) {

        this.attempts = this.attempts - 1;
        this.updateAttemps();

        // Disable button during spin
        if (this.attempts) this.elements.startButton.style.pointerEvents = 'none';

        // Generate the randon rotation value for the wheel
        this.deg = Math.floor(1000 + Math.random() * 5000);

        // Set the transition
        this.elements.wheel.style.transition = 'all 5s ease-out';

        // Rotate the wheel
        this.elements.wheel.style.transform = `rotate(${this.deg}deg)`;
        // Apply the blur
        this.elements.wheel.classList.add('blur');
      }

    });
  }

  transitionEvent() {
    if (!this.elements.startButton) {
      console.error('No start Button found');
      return;
    }
    this.elements.wheel.addEventListener('transitionend', () => {

      this.elements.wheel.classList.remove('blur');

      this.elements.startButton.style.pointerEvents = 'auto';

      this.elements.wheel.style.transition = 'none';


      const finalPosition = this.deg % 360;

      this.elements.wheel.style.transform = `rotate(${finalPosition}deg)`;

      // based on the rotation I calculate the winning number
      const N = Math.ceil(12 - (finalPosition * this.optionCount / 360));

      this.checkGameResult(N);

    });
  }

  checkGameResult(N) {
    if (this.winnerNumbers.includes(N)) {
      this.elements.messageContainer.innerHTML = 'You won!';
      this.elements.messageContainer.classList.add('message--green');
      this.elements.startButton.style.display = 'none';
      this.events.gameOverEvent(true);
      return;
    } else if (!this.attempts) {
      this.elements.messageContainer.innerHTML = 'Game over';
      this.elements.messageContainer.classList.add('message--red');
      this.elements.startButton.style.display = 'none';
      this.events.gameOverEvent(false);
      return;
    } else {
      this.elements.messageContainer.innerHTML = 'Try Again';
      this.elements.messageContainer.classList.add('message--red');
    }


    if (this.events.winnerNumberEvent && typeof this.events.winnerNumberEvent === 'function') {
      // get the winner number and emit an event
      this.events.winnerNumberEvent(N);
    }
  }
}