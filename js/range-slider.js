const EFFECTS = [
  {
    name: 'none',
    style: '',
    min: 0,
    max: 100,
    step: 1,
    unit: ''
  },
  {
    name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  {
    name: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  {
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%'
  },
  {
    name: 'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px'
  },
  {
    name: 'heat',
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: ''
  }
];
const DEFAULT_EFFECT = EFFECTS[0];
const MAX_PHOTO_SIZE = 100;
const MIN_PHOTO_SIZE = 25;
const STEP_SCALE = 25;
let currentEffect = DEFAULT_EFFECT;

const rangesSliderContainer = document.querySelector('.effect-level');
const rangesSlider = document.querySelector('.effect-level__slider');
const rangesSliderInput = document.querySelector('.effect-level__value');
const effectsList = document.querySelector('.effects');

const smallerInControl = document.querySelector('.scale__control--smaller');
const biggerOutControl = document.querySelector('.scale__control--bigger');
const valueScale = document.querySelector('.scale__control--value');

const image = document.querySelector('.img-upload__preview img');

export const resetDefault = () => {
  rangesSliderContainer.classList.add('hidden');
  valueScale.value = '100%';
  image.style.cssText = 'transform: scale(1); filter: none';
};

smallerInControl.addEventListener('click', () => {
  const value = parseInt(valueScale.value, 10);
  if (value > MIN_PHOTO_SIZE) {
    valueScale.value = `${value - STEP_SCALE}%`;
    image.style.cssText += `transform: scale(${parseInt(valueScale.value, 10) / 100})`;
  }
});

biggerOutControl.addEventListener('click', () => {
  const value = parseInt(valueScale.value, 10);
  if (value < MAX_PHOTO_SIZE) {
    valueScale.value = `${value + STEP_SCALE}%`;
    image.style.cssText += `transform: scale(${parseInt(valueScale.value, 10) / 100})`;
  }
});

const showRangeSlider = () => {
  rangesSliderContainer.classList.remove('hidden');
};

const hideRangeSlider = () => {
  rangesSliderContainer.classList.add('hidden');
};
hideRangeSlider ();

const updateSlider = () => {
  rangesSlider.noUiSlider.updateOptions({
    range: {
      min: currentEffect.min,
      max: currentEffect.max,
    },
    step: currentEffect.step,
    start: currentEffect.max
  });
};

const onEffectsListClick = (evt) => {
  if (evt.target.classList.contains('effects__radio')) {
    currentEffect = EFFECTS.find((effect) =>effect.name === evt.target.value);
    image.className = `img-upload__preview effects__preview--${currentEffect.name}`;

    updateSlider ();

    if (currentEffect.name === 'none') {
      hideRangeSlider();
    } else {
      showRangeSlider();
    }
  }
};

const onRangeSliderUpdate = () => {
  const rangesSliderValue = rangesSlider.noUiSlider.get();
  rangesSliderInput.value = rangesSliderValue;
  image.style.filter = `${currentEffect.style}(${rangesSliderValue}${currentEffect.unit})`;

  if (currentEffect.name === 'none') {
    image.style.filter = DEFAULT_EFFECT.style;
  }
};

noUiSlider.create(rangesSlider, {
  range: {
    min: DEFAULT_EFFECT.min,
    max: DEFAULT_EFFECT.max,
  },
  step: DEFAULT_EFFECT.step,
  start: DEFAULT_EFFECT.min
});

effectsList.addEventListener ('click', onEffectsListClick);
rangesSlider.noUiSlider.on('update', onRangeSliderUpdate);
