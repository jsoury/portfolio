//require("dotenv").config();
//const key = new Key(process.env.PUBLIC_KEY);
//console.log(process.env.PUBLIC_KEY);

const submitBtn = document.querySelector(".btn-submit");
const form = document.forms.formContact;

//turn the NodeList to an array instead
let allElement = Array.prototype.slice.call(document.querySelectorAll("input"));
allElement.pop();
let request = Array.prototype.slice.call(document.querySelectorAll("textarea"));
allElement.push.apply(allElement, request);

const showToast = () => {
  const toast = document.querySelector(".toast");
  toast.style.display = "block";
  toast.textContent =
    "Demande de contact envoyée nous vous recontacterons dans les plus brefs délais";
};

/*
 * call the validate function to check all the form fields
 * if there is an error return false
 * else return true
 */
const validateSubmit = () => {
  let isValid = 0;
  const validations = {
    first: false,
    last: false,
    email: false,
    phone: false,
    request: false,
  };
  for (let validation in validations) {
    validations[validation] = validate(validation);
    if (validations[validation] === true) isValid += 1;
  }
  if (isValid === 1) {
    showToast();
  }
  return false;
};

//switch fonction for valide values input
const validate = (inputId) => {
  switch (inputId) {
    case "first":
      return validateFirstAndLast(inputId);
    case "last":
      return validateFirstAndLast(inputId);
    case "email":
      return validateEmail();
    case "phone":
      return validatePhone();
    case "request":
      return validateRequest();
    default:
      console.log(`${inputId} n'existe pas`);
  }
};

//The first name and the last name field has a minimum of 2 characters / is not empty.
const validateFirstAndLast = (inputId) => {
  const element = form.elements[inputId];

  if (element.value.length >= 2) {
    toggleErrorMessages(element, false);
    return true;
  } else {
    toggleErrorMessages(element, true);
    return false;
  }
};

//validate adding email by regex.
const validateEmail = () => {
  const email = form.elements.email;
  const isEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  return isEmail.test(email.value)
    ? (toggleErrorMessages(email, false), true)
    : (toggleErrorMessages(email, true), false);
};

//validate quantity by regex
const validatePhone = () => {
  const phone = form.elements.phone;
  const isPhone = /(0|\+33)[1-9]( *[0-9]{2}){4}/;

  return isPhone.test(phone.value)
    ? (toggleErrorMessages(phone, false), true)
    : (toggleErrorMessages(phone, true), false);
};

const validateRequest = () => {
  const request = form.elements.request;

  if (request.value.length >= 5) {
    toggleErrorMessages(request, false);
    return true;
  } else {
    toggleErrorMessages(request, true);
    return false;
  }
};

//add class name error insert message after input parameters
const toggleErrorMessages = (element, etat) => {
  element.parentNode.dataset.visible = etat;
};

//wait for the document to load
document.addEventListener("DOMContentLoaded", (e) => {
  //add blur, focus and click on all input elements
  allElement.forEach((input) => {
    input.addEventListener(
      "blur",
      (e) => {
        validate(e.currentTarget.id);
      },
      false
    );
    input.addEventListener(
      "focus",
      () => {
        toggleErrorMessages(input, false);
      },
      false
    );
  });
});

// let params = {
//   user_id: process.PUBLIC_KEY,
//   service_id: process.env.SERVICE_ID,
//   template_id: process.env.TEMPLATE_ID,
//   template_params: {
//     last: form.elements.last,
//     first: form.elements.last,
//   },
// };

// let headers = {
//   "Content-type": "application/json",
// };

// let options = {
//   method: "POST",
//   headers: headers,
//   body: JSON.stringify(params),
// };

// fetch("https://api.emailjs.com/api/v1.0/email/send", options)
//   .then((httpResponse) => {
//     if (httpResponse.ok) {
//       console.log("Your mail is sent!");
//     } else {
//       return httpResponse.text().then((text) => Promise.reject(text));
//     }
//   })
//   .catch((error) => {
//     console.log("Oops... " + error);
//   });
