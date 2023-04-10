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


const spoilerBlocks = document.querySelectorAll('.spoiler__block');

spoilerBlocks.forEach((spoilerBlock) => {
  const spoilerBtn = spoilerBlock.querySelector('.spoiler__head');
  const arrow = spoilerBlock.querySelector('.spoiler__btn');
  const spoilerContent = spoilerBlock.querySelector('.spoiler__content');

  spoilerBtn.addEventListener('click', () => {
    spoilerContent.classList.toggle('hide');
    spoilerBtn.classList.toggle('open');
    arrow.classList.toggle('open');
  });
});