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
  var includeType = window.prompt("Would you like to include " + name + " characters in your password? Y/N");
  includeType = includeType.toLowerCase();

  // check that the response was valid
  var validResponses = ["y", "n"]
  if (!includeType | !validResponses.includes(includeType)) {

    // if not, prompt again 
    window.alert("You need to provide a valid answer! Please try again.");
    return getCharacterTypePreference(name);
  }  // return false if they don't want to include the character type
  else if (includeType === "n") {
    return false;
  } // return true if they want to include the character type
  else {
    return true;
  }
}

var characterType = function(name, min, max) {
  this.name = name,
  this.min = min,
  this.max = max
};

var getCharacterTypes = function(){
  // iterate through character types and record whether they should be included
  var characterTypes = ["numerical", "uppercase", "lowercase", "special"];
  var typesToInclude = [];
  for (var i = 0; i < characterTypes.length; i++) {
      // set the user's "include" preference for the character type
      var includeType = getCharacterTypePreference(characterTypes[i]);
      // if they want to include the character type, add it to the typesToInclude array.
      if (includeType) {
        // figure out which characterType object to instantiate and include in the password
        switch (characterTypes[i]) {
          case "numerical":
            let numbers = new characterType("numbers", 48, 57);
            typesToInclude.push(numbers);
            break;
          case "uppercase":
            let uppercase = new characterType("uppercase letters", 65, 90);
            typesToInclude.push(uppercase);
            break;
          case "lowercase":
            let lowercase = new characterType("lowercase letters", 97, 122);
            typesToInclude.push(lowercase);
            break;
          case "special":
            var special1 = new characterType("special characters", 32, 47);
            var special2 = new characterType("special characters", 58, 64);
            var special3 = new characterType("special characters", 91, 96);
            var special4 = new characterType("special characters", 123, 126);
            typesToInclude.push(special1, special2, special3, special4);
            break;
          default:
            break;
        }
      }
    }
  // return the character types that should be included in the password.
  if (typesToInclude.length === 0) {
    window.alert("You must include uppercase, lowercase, numerical, and/or special characters to generate a password. Please try again.")
    return getCharacterTypes();
  } else {
    return typesToInclude;
  }
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
