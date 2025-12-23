const generatedPassword = document.querySelector(".password-output");
const copyInfo = document.querySelector(".copy-info");
const copyButton = document.querySelector(".copy-button");

const charLengthNumber = document.querySelector(".length-number");
const charLengthSlider = document.getElementById("length-slider");

const allCheckboxes = document.querySelectorAll(".checkbox");

const strengthContainer = document.querySelector(".strength-level");
const strengthInfo = document.querySelector(".level-info");
const generateButton = document.querySelector(".generate-button");

// Store all checkbox elements and their character sets in a single array.
const passwordOptions = [
  {
    element: document.getElementById("check-uppercase"),
    chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  },
  {
    element: document.getElementById("check-lowercase"),
    chars: "abcdefghijklmnopqrstuvwxyz",
  },
  { element: document.getElementById("check-numbers"), chars: "0123456789" },
  {
    element: document.getElementById("check-symbols"),
    chars: "!@#$%^&*()_+?=",
  },
];

const calculateStrength = function () {
  const charLength = parseInt(charLengthSlider.value);

  // Calculate the number of checked options using 'filter' instead of repeating 'if' statements.
  let countStrength = passwordOptions.filter(
    (option) => option.element.checked
  ).length;

  strengthContainer.classList.remove("too-weak", "weak", "medium", "strong");
  strengthInfo.textContent = "";

  if (charLength < 6 && countStrength > 0) {
    countStrength = 1;
  }

  if (countStrength === 0) return;

  const strengthClasses = ["", "too-weak", "weak", "medium", "strong"];
  const strengthTexts = ["", "TOO WEAK", "WEAK", "MEDIUM", "STRONG"];

  strengthContainer.classList.add(strengthClasses[countStrength]);
  strengthInfo.textContent = strengthTexts[countStrength];
};

charLengthSlider.addEventListener("input", function (e) {
  const currentValue = e.target.value;

  const minValue = e.target.min;
  const maxValue = e.target.max;

  // Percentage = (CurrentValue - MinValue) / (MaxValue - MinValue) * 100
  const currentPercentage =
    ((currentValue - minValue) / (maxValue - minValue)) * 100;

  charLengthNumber.textContent = currentValue;

  charLengthSlider.style.background = `linear-gradient(to right, var(--green-200) 0%, var(--green-200) ${currentPercentage}%, var(--black) ${currentPercentage}%, var(--black) 100%)`;
});

generateButton.addEventListener("click", function () {
  let password = "";

  // Create the character pool string dynamically using 'map' and 'join' based on selected options.
  const characterPool = passwordOptions
    .filter((option) => option.element.checked)
    .map((option) => option.chars)
    .join("");

  if (characterPool === "") {
    alert("Please select at least one option!");
    return;
  }

  for (let i = 0; i < charLengthSlider.value; i++) {
    const characterIndex = Math.floor(Math.random() * characterPool.length);
    // Think of Math.random() as the slider handle position (0% to 100%). Multiplying by length gives us the exact spot in the pool.
    password += characterPool[characterIndex];
  }

  generatedPassword.textContent = password;
  generatedPassword.classList.add("active");
});

allCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", calculateStrength);
});
charLengthSlider.addEventListener("input", calculateStrength);

copyButton.addEventListener("click", function () {
  const password = generatedPassword.textContent;

  if (password === "" || password === "P4$5W0rD!") return;

  navigator.clipboard.writeText(password);

  copyInfo.style.display = "block";

  setTimeout(() => {
    copyInfo.style.display = "none";
  }, 2000);
});

calculateStrength();

// Trigger 'input' event to update slider background color on page load.
const e = new Event("input");
charLengthSlider.dispatchEvent(e);
