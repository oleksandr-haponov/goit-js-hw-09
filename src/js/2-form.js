import debounce from 'lodash.debounce';

const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

let formData = {
  email: '',
  message: '',
};

// Відновлення збережених даних
const savedData = localStorage.getItem(STORAGE_KEY);
if (savedData) {
  try {
    formData = JSON.parse(savedData);
    form.email.value = formData.email || '';
    form.message.value = formData.message || '';
  } catch (e) {
    console.error('Помилка при читанні з localStorage', e);
  }
}

// Збереження даних з debounce і trim
const saveToStorage = debounce(event => {
  const { name, value } = event.target;
  formData[name] = value.trimStart();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}, 300);

form.addEventListener('input', saveToStorage);

// Сабміт форми
form.addEventListener('submit', event => {
  event.preventDefault();

  const email = form.email.value.trim();
  const message = form.message.value.trim();

  if (!email || !message) {
    alert('Fill please all fields');
    return;
  }

  const result = { email, message };
  console.log(result);

  localStorage.removeItem(STORAGE_KEY);
  form.reset();
  formData = { email: '', message: '' };
});
