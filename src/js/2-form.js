import debounce from 'lodash.debounce';

const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

let formData = {
  email: '',
  message: '',
};

// Завантаження даних
const savedData = localStorage.getItem(STORAGE_KEY);
if (savedData) {
  formData = JSON.parse(savedData);
  form.email.value = formData.email || '';
  form.message.value = formData.message || '';
}

// Input подія з debounce
form.addEventListener(
  'input',
  debounce(event => {
    const { name, value } = event.target;
    formData[name] = value.trimStart();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }, 500)
);

// Submit подія
form.addEventListener('submit', event => {
  event.preventDefault();

  const email = form.email.value.trim();
  const message = form.message.value.trim();

  if (!email || !message) {
    alert('Fill please all fields');
    return;
  }

  console.log({ email, message });

  form.reset();
  localStorage.removeItem(STORAGE_KEY);
  formData = { email: '', message: '' };
});
