const firstName = document.getElementById('first-name');
const firstNameError = document.getElementById('first-name-error');
const lastName = document.getElementById('last-name');
const lastNameError = document.getElementById('last-name-error');
const emailAddress = document.getElementById('email-address');
const emailAddressError = document.getElementById('email-address-error');
const queryType = document.getElementsByName('radio');
const radioError = document.getElementById('radio-error');
const textareaMessage = document.getElementById('textarea-message');
const textareaMessageError = document.getElementById('textarea-message-error');
const consentCheckbox = document.getElementById('consent-checkbox');
const consentCheckboxError = document.getElementById('consent-checkbox-error');


document.querySelector('form').onsubmit = function (event) {
    event.preventDefault();
    const first_name = validateInput(firstName, firstNameError);
    const last_name = validateInput(lastName, lastNameError);
    const email_address = validateEmailInput(emailAddress, emailAddressError);
    const query_type = validateRadioInput(queryType, radioError);
    const message = validateInput(textareaMessage, textareaMessageError);
    const consent = validateCheckbox(consentCheckbox, consentCheckboxError);
    if (first_name && last_name && email_address && query_type && message && consent) {
        console.log('Form submitted successfully');
        this.reset();
        showToast(this);
        console.log('first name: ', first_name, 'last name: ', last_name);
    }
}

function validateInput(inputEle, errorEle, message) {
    const value = inputEle.value;
    if (value.trim() === '') {
        showError(errorEle, message);
        return;
    }
    hideError(errorEle);
    return value;
}


function validateEmailInput(inputEle, errorEle) {
    // first we validate our field is not empty
    const value = validateInput(inputEle, errorEle);
    if (!value) {
        return;
    }

    // Here we check to see if we have a valid email
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(value)) {
        showError(errorEle, 'Please enter a valid email address');
        return;
    }

    return value;
}

function validateRadioInput(inputEles, errorEle) {
    for (radio of inputEles) {
        if (radio.checked) {
            hideError(errorEle);
            return radio.value;
        }
    }

    showError(errorEle);
    return;
}

function validateCheckbox(checkboxEles, errorEle) {
    if (!checkboxEles.checked) {
        showError(errorEle, 'To submit this form, please consent to being contacted');
        return false;
    }
    hideError(errorEle);
    return true;
}


function showError(element, message = '* This field is required') {
    element.innerText = message;
    element.style.visibility = 'visible';
    element.classList.remove('warrning');
    void element.offsetWidth;
    element.classList.add('warrning');
}

function hideError(element) {
    element.style.visibility = 'hidden';
}

function showToast(obj) {
    const toast = document.getElementById('toast');
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
        obj.submit();
    }, 3000);
}

controlFocusing();

function controlFocusing() {
    const fields = document.querySelectorAll('.focusing');
    fields.forEach((field, index) => {
        field.addEventListener('keydown', (event) => {
            const key = event.key;

            if (key === 'Enter' && (index === 3 || index === 4 || index === 6 || index === 7)) {
                fields[index].click();
            }

            if (index === 5) {
                const cursorPosition = fields[index].selectionStart;
                const isFirstLine = fields[index].value.lastIndexOf('\n', cursorPosition - 1) === -1;
                const isLastLine = fields[index].value.indexOf('\n', cursorPosition) === -1;

                if (key === 'ArrowUp' && isFirstLine) {
                    fields[index - 1].focus();
                }
                if (key === 'ArrowDown' && isLastLine) {
                    fields[index + 1].focus();
                }
                return;
            }

            if (key === 'Enter' || key === 'ArrowDown') {
                if (index < fields.length - 1) {
                    fields[index + 1].focus();
                }
            }
            if (key === 'ArrowUp') {
                if (index > 0) {
                    fields[index - 1].focus();
                }
            }

            if (key === 'Enter') {
                event.preventDefault();
            }
        })

    });

}