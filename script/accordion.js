var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    for (let y = 0; y < acc.length; y++) {
      if (acc[y] != this) {
        acc[y].classList.remove("active");
        acc[y].nextElementSibling.style.maxHeight = null;
      }
    }
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}
