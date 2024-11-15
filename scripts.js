document.addEventListener("DOMContentLoaded", () => {
  const mainWrapper = document.getElementById("main-wrapper");
  const buttons = {
    andBtn: "AND",
    orBtn: "OR",
    notBtn: "NOT",
    nandBtn: "NAND",
    norBtn: "NOR",
    xorBtn: "XOR",
  };

  let currentOperation = "AND";

  function createInputFields(operation) {
    mainWrapper.innerHTML = `
            <h2 class="sub-header">${operation} Operation</h2>
            <div class="main-input-wrapper">
                <form id="input-form" class="form-input">
                    <input type="text" class="num-input" id="input1" maxlength="1" />
                    ${
                      operation !== "NOT"
                        ? '<input type="text" class="num-input" id="input2" maxlength="1" />'
                        : ""
                    }
                </form>
                <button id="calculateBtn" class="calculate-btn">Calculate</button>
            </div>
            <div id="output" class="result-header"></div>
            <div class="error"></div>
        `;

    document.getElementById("calculateBtn").addEventListener("click", () => {
      const input1 = document.getElementById("input1").value;
      const input2 =
        operation !== "NOT" ? document.getElementById("input2").value : null;
      calculateResult(input1, input2, operation);
    });
  }

  function calculateResult(input1, input2, operation) {
    const errorElement = document.querySelector(".error");
    const outputElement = document.getElementById("output");

    errorElement.textContent = "";
    outputElement.textContent = "";

    const value1 = parseInt(input1, 10);
    const value2 = input2 !== null ? parseInt(input2, 10) : null;

    if (
      isNaN(value1) ||
      (input2 !== null && isNaN(value2)) ||
      value1 < 0 ||
      value1 > 9 ||
      (value2 !== null && (value2 < 0 || value2 > 9))
    ) {
      errorElement.textContent = "Input tidak valid";
      return;
    }

    const bool1 = value1 !== 0;
    const bool2 = value2 !== null ? value2 !== 0 : null;

    let result;
    switch (operation) {
      case "AND":
        result = bool1 && bool2;
        break;
      case "OR":
        result = bool1 || bool2;
        break;
      case "NOT":
        result = !bool1;
        break;
      case "NAND":
        result = !(bool1 && bool2);
        break;
      case "NOR":
        result = !(bool1 || bool2);
        break;
      case "XOR":
        result = bool1 !== bool2;
        break;
      default:
        errorElement.textContent = "Operasi tidak valid";
        return;
    }

    outputElement.textContent = `Output: ${result ? "True" : "False"}`;
  }

  Object.keys(buttons).forEach((buttonId) => {
    document.getElementById(buttonId).addEventListener("click", () => {
      currentOperation = buttons[buttonId];
      setActiveButton(buttonId);
      createInputFields(currentOperation);
    });
  });

  function setActiveButton(activeButtonId) {
    Object.keys(buttons).forEach((buttonId) => {
      document.getElementById(buttonId).classList.remove("active");
    });
    document.getElementById(activeButtonId).classList.add("active");
  }

  setActiveButton("andBtn");
  createInputFields("AND");
});
