function appendNewButton(targetNode) {
  const newButton = document.createElement("button");
  newButton.id = "save_tree_png";
  newButton.className = "btn btn-success form-control";
  newButton.type = "submit";
  newButton.style = "margin-top:10px";
  newButton.innerHTML = '<span class="fa fa-download"></span> Save Tree as PNG';

  newButton.addEventListener("click", () => {
    const svgElement = document.querySelector("svg");
    console.log(svgElement);
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const svgBlob = new Blob([svgData], { type: "image/svg+xml" });
    const svgUrl = URL.createObjectURL(svgBlob);

    const img = new Image();

    img.src = svgUrl;

    img.onload = function () {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      const pngDataUrl = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.href = pngDataUrl;
      downloadLink.download = "mySvg.png";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(svgUrl);
    };
  });

  targetNode.parentNode.insertBefore(newButton, targetNode.nextSibling);
}

function handleMutations(mutationsList, observer) {
  const save_tree = document.querySelector("#save_tree");
  const save_tree_png = document.getElementById("save_tree_png");
  if (!save_tree_png && save_tree) {
    appendNewButton(save_tree);
  }
}

const observer = new MutationObserver(handleMutations);
const config = { childList: true, subtree: true };
observer.observe(document, config);
