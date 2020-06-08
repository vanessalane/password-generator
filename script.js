// assignment code here
var chooseCharacterLength = function(){
  // prompt users for the length that they need
  var length = window.prompt("Specify a character length between 8 and 128:");
  length = parseInt(length);
  // confirm that the user provided a length. If not, reprompt.
  if (!length) {
    window.alert("You need to provide a valid answer! Please try again.");
    return chooseCharacterLength();
  }
  // confirm that the user provided a length between 8 and 128 (inclusive). If not, reprompt.
  if (length < 8 | length > 128) {
    // confirm that the user provided a length. If not, reprompt.
    window.alert("The password can be between 8 and 128 characters long. Please try again.");
    return chooseCharacterLength();
  }
  // if the length is valid, return.
  return length;
};

var getCharacterTypePreference = function(characterType) {
  // ask the user if they want to include a specific type
  var includeType = window.prompt("Would you like to include " + characterType + " in your password? Y/N");
  includeType = includeType.toLowerCase();
  // check that the response was valid
  var validResponses = ["y", "n"]
  if (!includeType | !validResponses.includes(includeType)) {
    // if not, prompt again 
    window.alert("You need to provide a valid answer! Please try again.");
    getCharacterTypePreference(characterType);
  }
  return includeType;
}

var chooseCharacterTypes = function(){
  var characterTypes = ["uppercase letters", "lowercase letters", "numbers", "special characters"];

  // iterate through character types and determine whether they should be included
  for (var i=0; i < characterTypes.length; i++) {
      // get the user's character type preferences
      var characterTypePreference = getCharacterTypePreference(characterTypes[i]);
      // if that preference is to include the char type, do nothing (default is to include all characters)
      // if that preference is to exclude the char type, do something
  }
  // return the character codes that can be chosen
  return characterTypes;
};


function generatePassword() {
  var passwordLength = chooseCharacterLength();
  var characterTypes = chooseCharacterTypes();
  var password = "";
  debugger;

  for (i = 0; i < passwordLength; i++) {
    // randomly choose a character from the possible characters
    // Math.floor(Math.random() * (charMax - charMin + 1)) + charMin;
    var characterCode = Math.floor(Math.random() * 95) + 32;
    // add the new character to the password
    password += String.fromCharCode(characterCode);
  }
  return password;
}

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
