const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

let formData = {
  email: '',
  message: '',
};

// Відновлення даних з localStorage
const savedData = localStorage.getItem(STORAGE_KEY);
if (savedData) {
  formData = JSON.parse(savedData);
  form.email.value = formData.email || '';
  form.message.value = formData.message || '';
}

// Слухач input — делегування + trim
form.addEventListener('input', event => {
  const { name, value } = event.target;
  formData[name] = value.trimStart(); // очищує пробіли з початку
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
});

// Сабміт форми з повним trim + перевірка
form.addEventListener('submit', event => {
  event.preventDefault();

  const email = form.email.value.trim();
  const message = form.message.value.trim();

  if (!email || !message) {
    alert('Fill please all fields');
    return;
  }

  formData = { email, message };
  console.log(formData);

  form.reset();
  localStorage.removeItem(STORAGE_KEY);
  formData = { email: '', message: '' };
});