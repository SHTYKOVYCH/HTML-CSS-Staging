document.addEventListener('DOMContentLoaded', () => {
    let advert = Array.from(document.querySelectorAll('.advert'));

    window.addEventListener('scroll', function onScroll() {
        onScroll.executing = onScroll.executing ?? false;

        if (onScroll.executing) {
            return;
        }

        onScroll.executing = true;

        advert = advert.map(el => {
            if (window.scrollY - el.getBoundingClientRect().top >= document.documentElement.clientHeight / 2) {
                el.style.opacity = '1';
                return null;
            }

            return el;
        }).filter(el => el !== null);

        if (advert.length == 0) {
            window.removeEventListener("scroll", onScroll);
        }

        setTimeout(() => onScroll.executing = false, 250);
    })
})