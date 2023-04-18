//// получаем все блоки с классом "spoiler__unit--video"
let videoBlocks = document.querySelectorAll('.spoiler__unit--video');

// для каждого блока добавляем обработчик клика
videoBlocks.forEach(function (block) {
  // получаем ID видео
  let videoId = block.getAttribute('data-embed');

  // создаем ссылку на страницу с видео
  let videoLink = 'https://www.youtube.com/watch?v=' + videoId;

  // добавляем обработчик клика
  block.addEventListener('click', function () {
    // создаем ссылку на видео в плеере YouTube
    let videoEmbed = 'https://www.youtube.com/embed/' + videoId + '?autoplay=1';

    // создаем окно с плеером YouTube
    window.open(videoLink, '_blank');

    // создаем iframe с плеером YouTube
    let iframe = document.createElement('iframe');
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('allowfullscreen', '');
    iframe.setAttribute('allow', 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture');
    iframe.setAttribute('src', videoEmbed);

    // заменяем блок с превью на iframe с плеером YouTube
    block.innerHTML = '';
    block.appendChild(iframe);
  });
});

// выпадающей аккордеон

const spoilerBlocks = document.querySelectorAll('.spoiler__block');

if (spoilerBlocks.length > 0) {
  spoilerBlocks.forEach((spoilerBlock) => {
    const spoilerBtn = spoilerBlock.querySelector('.spoiler__head');
    const arrow = spoilerBlock.querySelector('.spoiler__btn');
    const spoilerContent = spoilerBlock.querySelector('.spoiler__content');

    spoilerBtn.addEventListener('click', () => {
      document.querySelectorAll('.spoiler__content').forEach((content) => {
        if (!content.classList.contains('hide') && content !== spoilerContent) {
          content.classList.add('hide');
          content.parentElement.querySelector('.spoiler__head').classList.remove('open');
          content.parentElement.querySelector('.spoiler__btn').classList.remove('open');
        }
      });
      spoilerContent.classList.toggle('hide');
      spoilerBtn.classList.toggle('open');
      arrow.classList.toggle('open');
    });
  });
}

// счетчик назад

function updateTimer(endDate, daysElement, hoursElement, minutesElement, secondsElement) {
  const remainingTime = endDate - new Date();
  const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
  const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

  if (daysElement) {
    daysElement.textContent = days.toString().padStart(2, '0');
  }
  if (hoursElement) {
    hoursElement.textContent = hours.toString().padStart(2, '0');
  }
  if (minutesElement) {
    minutesElement.textContent = minutes.toString().padStart(2, '0');
  }
  if (secondsElement) {
    secondsElement.textContent = seconds.toString().padStart(2, '0');
  }
}

function startTimer(endDate, timerId) {
  const daysElement = document.querySelector(`#${timerId} .days`);
  const hoursElement = document.querySelector(`#${timerId} .hours`);
  const minutesElement = document.querySelector(`#${timerId} .minutes`);
  const secondsElement = document.querySelector(`#${timerId} .seconds`);

  if (daysElement && hoursElement && minutesElement && secondsElement) {
    updateTimer(endDate, daysElement, hoursElement, minutesElement, secondsElement);
    setInterval(() => updateTimer(endDate, daysElement, hoursElement, minutesElement, secondsElement), 1000);
  } else {
    console.warn(`Элементы счетчика для id '${timerId}' не найдены на странице`);
  }
}

const endDate1 = new Date('2023-05-01T00:00:00.000Z');
startTimer(endDate1, 'timer-price-1');

const endDate2 = new Date('2023-06-01T00:00:00.000Z');
startTimer(endDate2, 'timer-price-2');

const endDate3 = new Date('2023-07-01T00:00:00.000Z');
startTimer(endDate3, 'timer-price-3');