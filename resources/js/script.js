const subscribeBtn = document.getElementById('btn__subscribe');
const dismissBtn = document.getElementById('btn__dismiss');
const form = document.querySelector('.subscribe__form');
const subscribeInput = document.getElementById('email');

function onFormSubmit(e) {
  e.preventDefault();

  if (validateEmail(subscribeInput.value)) {
    success(subscribeInput.value);
  } else {
    incorrectMail();
  }
}

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  return String(email).toLowerCase().match(re);
}

function success(email) {
  document.querySelector('.subscribe').setAttribute('id', 'hidden');
  document.querySelector('.success').removeAttribute('id');

  document.querySelector('.success__email').textContent = email;
}

function incorrectMail() {
  const subscribeLabelContainer = document.querySelector(
    '.subscribe__label-container'
  );
  if (
    subscribeLabelContainer.lastElementChild.classList.contains(
      'subscribe__label--warning'
    )
  ) {
    return;
  } else {
    const warningText = document.createElement('p');
    warningText.classList = 'subscribe__label subscribe__label--warning';
    warningText.textContent = 'Valid email required';

    subscribeLabelContainer.appendChild(warningText);
    subscribeInput.classList.add('incorrect');
  }
}

function dismissMessage() {
  document.querySelector('.success').setAttribute('id', 'hidden');
  document.querySelector('.subscribe').removeAttribute('id');
  resetForm();
}

function resetForm() {
  subscribeInput.value = '';

  const subscribeLabelContainer = document.querySelector(
    '.subscribe__label-container'
  );
  if (
    subscribeLabelContainer.lastElementChild.classList.contains(
      'subscribe__label--warning'
    )
  ) {
    subscribeLabelContainer.lastElementChild.remove();
  }
  if (subscribeInput.classList.contains('incorrect')) {
    subscribeInput.classList.remove('incorrect');
  }
}

form.addEventListener('submit', onFormSubmit);
dismissBtn.addEventListener('click', dismissMessage);
