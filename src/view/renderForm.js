/* global document */
import i18next from 'i18next';

export default function renderForm(state) {
  const formControl = document.querySelector('.form-control');
  const feedback = document.querySelector('.feedback');
    
  if (state.formState.isValid) {
    formControl.classList.remove('is-invalid')
    feedback.textContent = i18next.t('form.success');
    feedback.classList.remove('text-danger');
    feedback.classList.add('text-success');
  } else if (state.formState.errorType === 'form.notUnique') {
    formControl.classList.add('is-invalid')
    feedback.textContent = i18next.t('form.notUnique');
    feedback.classList.remove('text-success');
    feedback.classList.add('text-danger');
  } else if (state.formState.errorType === 'form.invalid') {
    formControl.classList.add('is-invalid')
    feedback.textContent = i18next.t('form.invalid');
    feedback.classList.remove('text-success');
    feedback.classList.add('text-danger');
  }
};