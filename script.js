document.addEventListener('DOMContentLoaded', () => {
    const wordCards = document.querySelectorAll('.word-card');

    wordCards.forEach(card => {
        const russianWord = card.dataset.russian;
        const englishTranslation = card.dataset.english;
        const pronunciation = card.dataset.pronunciation;
        const imagePath = card.dataset.image;
        const audioPath = card.dataset.audio;

        const translationElement = card.querySelector('.translation');
        const imageElement = card.querySelector('.word-image');
        const audioElement = card.querySelector('.word-audio');
        const audioButton = card.querySelector('.audio-button');

        imageElement.src = imagePath;
        audioElement.src = audioPath;

        card.addEventListener('click', () => {
            if (translationElement.style.opacity === '1') {
                translationElement.style.opacity = '0';
                imageElement.style.opacity = '0';
                translationElement.style.height = '0';
                imageElement.style.height = '0';
                imageElement.classList.remove('active');
            } else {
                translationElement.innerHTML = `${englishTranslation} <br> <i>(${pronunciation})</i>`;
                translationElement.style.opacity = '1';
                imageElement.style.opacity = '1';
                translationElement.style.height = 'auto';
                imageElement.style.height = 'auto';
                imageElement.classList.add('active');
            }
        });

        audioButton.addEventListener('click', (event) => {
            event.stopPropagation();
            audioElement.play();
        });
    });
});
