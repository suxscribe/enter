import Inputmask from 'inputmask';

export const validateForms = () => {
  Inputmask({ mask: '+7 999 999 99 99', placeholder: ' ' }).mask(
    document.querySelectorAll('.form__phone')
  );
  // validate forms
  var contactForm = document.querySelectorAll('.form');

  if (contactForm) {
    contactForm.forEach((form) => {
      // check inputs on focusout
      form.querySelectorAll('.validate--empty').forEach((input) => {
        input.addEventListener('focusout', () => {
          if (checkIfEmpty(input)) return;
          return true;
        });
      });

      //check email on focusout
      const inputEmail = form.querySelector('.validate--email');
      if (inputEmail) {
        inputEmail.addEventListener('focusout', () => {
          if (checkIfEmpty(inputEmail)) return;
          if (checkIfEmail(inputEmail)) return;
          return true;
        });
      }

      // check phone on foucsout
      const inputPhone = form.querySelector('.validate--phone');
      if (inputPhone) {
        inputPhone.addEventListener('input', () => {
          console.log('input');

          if (checkIfEmpty(inputPhone)) return;
          if (checkIfOnlyDigits(inputPhone)) return;
          return true;
        });

        inputPhone.addEventListener('focusout', () => {
          if (checkIfEmpty(inputPhone)) return;
          if (checkIfOnlyDigits(inputPhone)) return;
          return true;
        });
      }
    });

    document.addEventListener(
      'invalid',
      (function() {
        console.log('invalid');

        return function(e) {
          console.log(e);

          //prevent the browser from showing default error bubble / hint
          e.preventDefault();
          // optionally fire off some custom validation handler
          checkAllFields(e.target.form);
        };
      })(),
      true
    );

    const checkAllFields = (form) => {
      form.querySelectorAll('.validate--empty').forEach((input) => {
        if (checkIfEmpty(input)) return;
        return true;
      });

      const inputEmail = form.querySelector('.validate--email');
      if (inputEmail) {
        if (checkIfEmpty(inputEmail)) return;
        if (checkIfEmail(inputEmail)) return;
        return true;
      }

      const inputPhone = form.querySelector('.validate--phone');
      if (inputPhone) {
        if (checkIfEmpty(inputPhone)) return;
        if (checkIfOnlyDigits(inputPhone)) return;
        return true;
      }
    };

    const checkIfEmpty = (field) => {
      if (isEmpty(field.value.trim())) {
        setInvalid(field, 'Обязательное поле');
        return true;
      } else {
        setValid(field);
        return false;
      }
    };

    const isEmpty = (value) => {
      if (value === '') return true;
      return false;
    };

    const setInvalid = (field, message) => {
      // toggle invalid class and show invalid message
      field.classList.add('invalid');
      if (field.nextElementSibling) {
        // field.nextElementSibling.innerHTML = message; // dont show message
        field.nextElementSibling.className = 'form__note form__note--red';
      }
    };
    const setValid = (field) => {
      field.classList.remove('invalid');
      if (field.nextElementSibling) {
        field.nextElementSibling.innerHTML = '';

        field.nextElementSibling.className = 'form__note';
      }
    };

    const checkIfOnlyLetters = (field) => {
      if (/^[a-zA-Z ]+$/.test(field.value)) {
        setValid(field);
        return true;
      } else {
        setInvalid(field, 'Должно содержать только буквы');
      }
    };
    const checkIfOnlyDigits = (field) => {
      // check for phone number format match
      if (/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g.test(field.value)) {
        setValid(field);

        return true;
      } else {
        setInvalid(
          field,
          'Пожалуйста введите номер телефона в формате +7 XXX XXX XX XX'
        );
      }
    };
    const checkIfEmail = (field) => {
      if (
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          field.value
        )
      ) {
        setValid(field);
        return true;
      } else {
        setInvalid(field, 'Должно быть в формате email@domain.dom');
      }
    };
  }
};
