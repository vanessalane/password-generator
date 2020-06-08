// assignment code here
var getCharacterLength = function(){
  // prompt users for the length that they need
  var length = window.prompt("Specify a character length between 8 and 128:");
  length = parseInt(length);
  // confirm that the user provided a length. If not, reprompt.
  if (!length | length < 8 | length > 128) {
    window.alert("You need to provide a password length between 8 and 128! Please try again.");
    return getCharacterLength();
  }
  // if it's a valid length, return.
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
    // return true if they want to include the character type
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
  var special1 = new characterType("special characters", 32, 47);  // need to update this to include the other ranges.
  var special2 = new characterType("special characters", 58, 64);  // need to update this to include the other ranges.
  var special3 = new characterType("special characters", 91, 96);  // need to update this to include the other ranges.
  var special4 = new characterType("special characters", 123, 126);  // need to update this to include the other ranges.
  var characterTypes = [numbers, uppercase, lowercase, special1];

  // iterate through character types and record whether they should be included
  var typesToInclude = [];
  for (var i = 0; i < characterTypes.length; i++) {
      // set the user's "include" preference for the character type
      var includeType = getCharacterTypePreference(characterTypes[i].name);
      // if they want to include the character type, add it to the typesToInclude array.
      if (includeType) {
        typesToInclude.push(characterTypes[i]);
        // if the user wants to include special characters, add all special characters to the list.
        if (characterTypes[i].name === "special characters") {
          typesToInclude.push(special2);
          typesToInclude.push(special3);
          typesToInclude.push(special4);
        }
      }
    }
  // return the character types that should be included in the password.
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
  var passwordLength = getCharacterLength();  // should be an integer
  var typesToInclude = getCharacterTypes();  // array of characterType objects
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
