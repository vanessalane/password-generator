// load DOM elements
var resultContainer = document.querySelector("#result-container");
var generateBtn = document.querySelector("#generate-button");
var copyBtn = document.querySelector("#copy-button");
var passwordLengthSlider = document.querySelector("#character-count");
var characterCheckboxes = document.querySelector("#character-types");

// characterType object model
var characterType = function(name, min, max) {
  this.name = name,
  this.min = min,
  this.max = max
};

var getCharacterLength = function(){
  // get the length from the slider element
  var slider = document.querySelector("#character-count");
  var length = slider.value;
  return parseInt(length);
};

var getCharacterTypePreferences = function() {
  // define the potential character types
  var characterTypes = ["number", "uppercase", "lowercase", "special"];

  // get the selected character types from the DOM
  var typesToInclude = [];
  for (var i = 0; i < characterTypes.length; i++) {
    var preference = document.querySelector("#" + characterTypes[i]).checked;
    if (preference) {
      typesToInclude.push(characterTypes[i]);
    }
  }

  // return the types that are selected
  return typesToInclude
}

var getCharacterTypes = function(){
  // iterate through character types and record whether they should be included
  var typesToInclude = getCharacterTypePreferences();
  var characterOptions = [];

  // create the result element
  var resultElement = document.createElement("p");

  // if no character types were specified, send a message to the user
  if (typesToInclude.length === 0) {
    resultElement.textContent = "You must choose a character type to include!";
    resultElement.className = "message";
    resultContainer.appendChild(resultElement);
    return;
  } else {
    resultElement.className = "generated-password";
    resultElement.id = "generated-password";
    resultElement.setAttribute("content-editable", true);
    resultContainer.appendChild(resultElement);
  }

  // define characterType objects that will be used to write the password
  for (var i = 0; i < typesToInclude.length; i++) {
    switch (typesToInclude[i]) {
      case "number":
        let numbers = new characterType("number", 48, 57);
        characterOptions.push(numbers);
        break;
      case "uppercase":
        let uppercase = new characterType("uppercase letters", 65, 90);
        characterOptions.push(uppercase);
        break;
      case "lowercase":
        let lowercase = new characterType("lowercase letters", 97, 122);
        characterOptions.push(lowercase);
        break;
      case "special":
        var special1 = new characterType("special characters", 32, 47);
        var special2 = new characterType("special characters", 58, 64);
        var special3 = new characterType("special characters", 91, 96);
        var special4 = new characterType("special characters", 123, 126);
        characterOptions.push(special1, special2, special3, special4);
        break;
      default:
        break;
    }
  }

  // return the characters that should be included in the password.
  return characterOptions;
};

function generateCharacterCode(characterTypes) {

    // randomly choose the character type
    var typeIndex = Math.floor(Math.random() * characterTypes.length);
    var characterType = characterTypes[typeIndex];
    return Math.floor(Math.random() * (characterType.max - characterType.min + 1)) + characterType.min;
};

function generatePassword() {

  // define the length and character types to include
  var passwordLength = getCharacterLength();
  var typesToInclude = getCharacterTypes();

  if (!typesToInclude) {
    console.error("No character types were selected. Aborting password generation.");
    return;
  }

  // write the password
  var password = "";
  for (i = 0; i < passwordLength; i++) {
    // figure out a character code of the specified types
    var characterCode = generateCharacterCode(typesToInclude);
    // add the new character to the password
    password += String.fromCharCode(characterCode);
  }
  return password;
}

// event handlers
function writePassword() {
  resultContainer.innerHTML = "";
  var password = generatePassword();
  if (password){
    var passwordElement = document.querySelector("#generated-password");
    passwordElement.textContent = password;
  }
}

function copyBtnHandler() {
  var copyText = document.querySelector("#generated-password");
  copyText.select();
  document.execCommand("copy");
  copyText.blur();
}

function lengthSliderHandler(event){
  document.querySelector("#password-length").textContent = event.target.value;
}

// Add event listeners
generateBtn.addEventListener("click", writePassword);
copyBtn.addEventListener("click", copyBtnHandler);
passwordLengthSlider.addEventListener("input", lengthSliderHandler);
passwordLengthSlider.addEventListener("change", writePassword);
characterCheckboxes.addEventListener('change', writePassword);

// write a password on load
writePassword();