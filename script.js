// assignment code here
var getCharacterLength = function(){
  // prompt users for the length that they need
  var length = window.prompt("Specify a character length between 8 and 128:");
  length = parseInt(length);
  // confirm that the user provided a length. If not, reprompt.
  if (!length) {
    window.alert("You need to provide a valid answer! Please try again.");
    return getCharacterLength();
  }
  // confirm that the user provided a length between 8 and 128 (inclusive). If not, reprompt.
  if (length < 8 | length > 128) {
    // confirm that the user provided a length. If not, reprompt.
    window.alert("The password can be between 8 and 128 characters long. Please try again.");
    return getCharacterLength();
  }
  // if the length is valid, return.
  return length;
};

var getCharacterTypePreference = function(name) {
  // ask the user if they want to include a specific type
  var includeType = window.prompt("Would you like to include " + name + " in your password? Y/N");
  includeType = includeType.toLowerCase();
  // check that the response was valid
  var validResponses = ["y", "n"]
  if (!includeType | !validResponses.includes(includeType)) {
    // if not, prompt again 
    window.alert("You need to provide a valid answer! Please try again.");
    return getCharacterTypePreference(name);
  } else if (includeType === "n") {
    // return false if they don't want to include the character type
    return false;
  } else {
    return true;
  }
}

var characterType = function(name, min, max) {
  this.name = name,
  this.min = min,
  this.max = max
};

var getCharacterTypes = function(){
  // define the character types
  var numbers = new characterType("numbers", 48, 57);
  var uppercase = new characterType("uppercase letters", 65, 90);
  var lowercase = new characterType("lowercase letters", 97, 122);
  var special = new characterType("special characters", 32, 47);  // need to update this to include the other ranges.
  var characterTypes = [numbers, uppercase, lowercase, special];
  var typesToInclude = [];

  // iterate through character types and determine whether they should be included
  for (var i=0; i < characterTypes.length; i++) {
      // set the user's "include" preference for the character type
      var includeType = getCharacterTypePreference(characterTypes[i].name);
      // if that preference is to exclude the char type, do something
      if (includeType) {
        typesToInclude.push(characterTypes[i])
      }
    }
  // return the character codes that should be included
  return typesToInclude;
};

function generateCharacterCode(characterTypes) {
    // randomly choose the character type
    var typeIndex = Math.floor(Math.random() * characterTypes.length);
    var characterType = characterTypes[typeIndex];
    // randomly choose a character from the possible characters
    return Math.floor(Math.random() * (characterType.max - characterType.min + 1)) + characterType.min;
};

function generatePassword() {
  // define the length and character types to include
  var passwordLength = getCharacterLength();
  var typesToInclude = getCharacterTypes();
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
