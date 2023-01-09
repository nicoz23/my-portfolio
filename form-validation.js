const form = document.getElementById('contact')
const inputs = document.querySelectorAll('#contact input')
const textArea = document.getElementById('textarea')

const expressions = {
    fullname: /^[a-zA-ZÀ-ÿ\s]{4,40}$/,
	mail: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    affair: /^[a-zA-Z0-9\_\-\s]{3,16}$/
}

const fields = {
    fullname: false,
    email: false,
    affair: false,
    textarea: false
}

const formValidation = (e) => {
    switch (e.target.name) {
        case "fullname":
            validationField(expressions.fullname, e.target, 'fullname')
        break;
        case "email":
            validationField(expressions.mail, e.target, 'email')
        break;
        case "affair":
            validationField(expressions.affair, e.target, 'affair')
        break;
        case "textarea":
            textareaValidation()
        break;
    }
}

function textareaValidation() {
    if (textArea.value == "" || textArea.length == 0) {
        textArea.classList.add('formInvalid')
        textArea.classList.remove('formValid')
        
        document.querySelector('.textareaError').classList.add('showError')

        fields['textarea'] = false
    } else {
        textArea.classList.remove('formInvalid')
        textArea.classList.add('formValid')
        
        document.querySelector('.textareaError').classList.remove('showError')
        
        fields['textarea'] = true
    }
  }

const validationField = (expression, input, field) => {
    if(expression.test(input.value)) {
        document.getElementById(field).classList.remove('formInvalid')
        document.getElementById(field).classList.add('formValid')

        document.querySelector(`.${field}Error`).classList.remove('showError')

        fields[field] = true
    } else {
        document.getElementById(field).classList.add('formInvalid')
        document.getElementById(field).classList.remove('formValid')
        
        document.querySelector(`.${field}Error`).classList.add('showError')

        fields[field] = false
    }
}

textArea.addEventListener('keyup', formValidation)
textArea.addEventListener('blur', formValidation)

inputs.forEach((input) =>{
    input.addEventListener('keyup', formValidation)
    input.addEventListener('blur', formValidation)
})

form.addEventListener('submit', (e) => {
    // e.preventDefault();

    if(fields.fullname && fields.email && fields.affair && fields.textarea){
        document.querySelector('.submitSuccess').classList.add('submitShow')
        setTimeout(() => {
            document.querySelector('.submitSuccess').classList.remove('submitShow')
        }, 5000);
    }
});
