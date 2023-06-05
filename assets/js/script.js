
const gameInit = () => {
  const events = {
    winnerNumberEvent: (N) => console.log(N),
    gameOverEvent: (won) => {
      if (won) {
        getResponse()
          .then(response => alert(response.message))
          .then(() => window.location.href = getPathFromUrl(window.location.href));
      } else {
        setTimeout(() => {
          window.location.href = getPathFromUrl(window.location.href), 5000
        }, 5000);
      }
    },
  };

  const elements = {
    wheel: document.querySelector('.wheel'),
    startButton: document.querySelector('.button'),
    winnerNumberContainer: document.querySelector('.winner'),
    attemptNumberContainer: document.querySelector('.attemp_number'),
    messageContainer: document.querySelector('.message'),
  };

  const game = new wheelOfFortune(elements, events);

  game.init();
}

const GAME = document.querySelector('.game');
const FORM = document.querySelector('.form');

const formValues = getQueryParams();

if (formValues) {
  document.querySelector('#email').value = formValues.email;
  document.querySelector('#name').value = formValues.name;
  document.querySelector('#surname').value = formValues.surname;
  if (validateForm(formValues, document.querySelector('.validation-message'))) {
    gameInit();
    GAME.style.display = 'block';
    FORM.style.display = 'none';
  } else {
    GAME.style.display = 'none';
    FORM.style.display = 'block';

  }
}

