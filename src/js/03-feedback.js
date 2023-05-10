import throttle from 'lodash.throttle';
const KEY = 'feedback-form-state';
const formEl = document.querySelector('.feedback-form');
formEl.addEventListener('input', throttle(saveValue, 500));
formEl.addEventListener('submit', sendData);
let savedData = {};
function addData() {
  try {
    const data = localStorage.getItem(KEY);
    if (!data) return;
    savedData = JSON.parse(data);
    Object.entries(savedData).forEach(([key, value]) => {
      formEl.elements[key].value = value;
    });
  } catch (error) {}
}
addData();
function saveValue(evt) {
  savedData[evt.target.name] = evt.target.value.trim();
  localStorage.setItem(KEY, JSON.stringify(savedData));
}
function sendData(evt) {
  evt.preventDefault();
  if (savedData.email === '' || savedData.message === '') {
    alert('Fill all fields');
    return;
  }
  console.log(savedData);
  localStorage.removeItem(KEY);
  savedData = {};
  evt.target.reset();
}
