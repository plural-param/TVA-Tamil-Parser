function appendCheckBox(targetNode) {
  const newCheckBox = document.createElement("input");
  newCheckBox.type = "checkbox";
  newCheckBox.name = "Correct-Example";
  newCheckBox.id = "checkbox";

  if (correct_examples.includes(parseInt(current_selected_idx))) {
    newCheckBox.checked = true;
  } else {
    newCheckBox.checked = false;
  }

  // checkbox

  const labelForCheckBox = document.createElement("label");
  labelForCheckBox.id = "checkBoxLabel";
  labelForCheckBox.appendChild(newCheckBox);
  labelForCheckBox.appendChild(document.createTextNode("Mark as Correct"));

  newCheckBox.addEventListener("change", function () {
    const val = current_selected_idx;

    if (newCheckBox.checked) {
      correct_examples.push(val);
    } else {
      correct_examples.removeElement(val);
    }
  });

  targetNode.parentNode.insertBefore(labelForCheckBox, targetNode.nextSibling);
}

function handleMarker(mutationsList, observer) {
  const selectedId = document.querySelector("._2fP21");
  if (selectedId) {
    let spanElement = selectedId.querySelector("span");
    if (spanElement) {
      let textInsideSpan = spanElement.textContent || spanElement.innerText;
      current_selected_idx = parseInt(textInsideSpan);
    }
  }
  console.log("current_idx", current_selected_idx);
  console.log("correct_idx", correct_examples);
  correctMarker(correct_examples);

  const paginationDiv = document.querySelector("._3iZkq");
  const checkBox = document.getElementById("checkbox");
  if (!checkBox) {
    if (paginationDiv) appendCheckBox(paginationDiv);
  } else {
    if (correct_examples.includes(parseInt(current_selected_idx))) {
      checkBox.checked = true;
    } else checkBox.checked = false;
  }
}

const observer1 = new MutationObserver(handleMarker);
const config1 = { childList: true, subtree: true };
observer1.observe(document, config1);
