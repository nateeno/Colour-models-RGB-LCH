const sliders = {
  rgb: {
    red: document.getElementById("red"),
    green: document.getElementById("green"),
    blue: document.getElementById("blue"),
  },
  lch: {
    lightness: document.getElementById("lightness"),
    chroma: document.getElementById("chroma"),
    hue: document.getElementById("hue"),
  },
};

const displays = {
  rgb: document.getElementById("rgbColor"),
  lch: document.getElementById("lchColor"),
};

const values = {
  r: document.getElementById("rValue"),
  g: document.getElementById("gValue"),
  b: document.getElementById("bValue"),
  h: document.getElementById("hValue"),
  c: document.getElementById("cValue"),
  l: document.getElementById("lValue"),
};

function updateColor(type) {
  const { sliders: sliderGroup, display, valueGroup } = type;
  const { red, green, blue } = sliderGroup.rgb;
  const { lightness, chroma, hue } = sliderGroup.lch;

  const rgbColor = `rgb(${red.value},${green.value},${blue.value})`;


  const cValue = Math.round((chroma.value / 100) * 132);
  const clampedChroma = Math.min(132, Math.max(0, cValue));


  const lchColor = `lch(${lightness.value},${Math.floor(clampedChroma)},${hue.value}deg)`;

  display.rgb.style.backgroundColor = rgbColor;
  display.lch.style.backgroundColor = lightness.value === "0" ? "black" : lightness.value === "100" ? "white" : lchColor;

  valueGroup.r.textContent = red.value;
  valueGroup.g.textContent = green.value;
  valueGroup.b.textContent = blue.value;
  valueGroup.h.textContent = hue.value;
  valueGroup.c.textContent = clampedChroma;
  valueGroup.l.textContent = lightness.value;
}


function addSlidersListeners(sliderGroup, updateFunction) {
  Object.values(sliderGroup).forEach((slider) => slider.addEventListener("input", updateFunction));
}

addSlidersListeners(sliders.rgb, () => updateColor({ sliders, display: displays, valueGroup: values }));
addSlidersListeners(sliders.lch, () => updateColor({ sliders, display: displays, valueGroup: values }));

updateColor({ sliders, display: displays, valueGroup: values });