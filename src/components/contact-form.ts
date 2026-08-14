/**
 * Contact Form Component
 * Wires the contact page's form (src/pages/contact/index.html) to
 * Formspree via @formspree/ajax. Styling is fully custom — see
 * src/styles/contact-form.css — since useDefaultStyles is off below;
 * this file only handles behavior.
 */

import { initForm } from '@formspree/ajax';

const FORMSPREE_FORM_ID = 'xykrdvjd';

export function initContactForm(): void {
  const form = document.getElementById('contact-form');
  if (!(form instanceof HTMLFormElement)) return;

  const submitBtn = form.querySelector<HTMLButtonElement>('[data-fs-submit-btn]');
  const submitBtnIdleHTML = submitBtn?.innerHTML ?? '';
  const submitBtnLoadingHTML = `
    <svg class="w-4 h-4 mr-2 animate-spin" viewBox="0 0 24 24" fill="none">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
    </svg>
    Sending...`;

  const successPanel = document.querySelector<HTMLElement>('[data-fs-success]');
  const subjectField = form.querySelector<HTMLSelectElement>('#contact-subject');

  function resetSubmitButton(): void {
    if (submitBtn) submitBtn.innerHTML = submitBtnIdleHTML;
  }

  initForm({
    formElement: form,
    formId: FORMSPREE_FORM_ID,
    useDefaultStyles: false,

    // Tags the notification email's subject line with the topic the
    // person picked, so replies land in an organized inbox rather than
    // a stack of identically-titled "New submission" emails.
    data: {
      _subject: () => {
        const label = subjectField?.selectedOptions[0]?.text;
        return label ? `LBR Website Contact — ${label}` : 'LBR Website Contact Form';
      },
    },

    onSubmit: () => {
      if (submitBtn) submitBtn.innerHTML = submitBtnLoadingHTML;
    },

    onSuccess: () => {
      form.reset();
      form.classList.add('hidden');
      resetSubmitButton();

      if (successPanel) {
        successPanel.setAttribute('tabindex', '-1');
        successPanel.focus({ preventScroll: true });
        successPanel.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    },

    onError: resetSubmitButton,
    onFailure: resetSubmitButton,
  });
}
