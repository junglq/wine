$(document).ready(function () {
    // Burger menu
    $('.header__burger').on('click', function () {
        $('.header__burger,.header__menu').toggleClass('active');
        $('body').toggleClass('lock');
    })

    // Fixed Header
    let scrollOffset = $(window).scrollTop();
    checkscroll(scrollOffset);

    $(window).on('scroll resize', function () {
        scrollOffset = $(this).scrollTop();
        checkscroll(scrollOffset);
    })

    function checkscroll(scrollOffset) {
        if (scrollOffset > 0) {
            $('.header').addClass('fixed');
        } else {
            $('.header').removeClass('fixed');
        }
    }

    // Smooth scroll
    let headerH = $('.header').innerHeight();
    $("[data-scroll]").on("click", function (event) {
        event.preventDefault();

        let elementId = $(this).data("scroll");
        let elementOffset = $(elementId).offset().top;

        $('.nav__link').not($(this)).removeClass('active');
        $(this).addClass('active');

        $("html,body").animate({
            scrollTop: elementOffset - headerH
        }, 1000)

    })

    // Filter =======================================
    let filter = $("[data-filter]");
    filter.on("click", function (event) {
        event.preventDefault();

        let cat = $(this).data("filter");

        if (cat == 'all') {
            $("[data-cat]").removeClass('hide');
        } else {
            $("[data-cat]").each(function () {
                let workCat = $(this).data("cat");
                if (workCat != cat) {
                    $(this).addClass("hide");
                } else {
                    $(this).removeClass("hide");
                }
            })
        }
    })

    // Accordion
    $('.block__title').click(function () {
        if ($('.block').hasClass('one')) {
            $('.block__title').not($(this)).removeClass('active');
            $('.block__text').not($(this).next()).slideUp(300);
        }
        $(this).toggleClass('active').next().slideToggle(300);
    })

    // Animation items
    const animItems = document.querySelectorAll('.anim-items'); // Массив анимируемых элементов

    if (animItems.length > 0) { // Проверка на наличие анимируемых элементов
        window.addEventListener('scroll', animOnScroll); // Событие "скролл"
        function animOnScroll() { // Функция анимации при скролле
            for (let index = 0; index < animItems.length; index++) { // Цикл на выборку анимируемых элементов
                const animItem = animItems[index]; // Анимируемый элемент
                const animItemHeight = animItem.offsetHeight; // Высота анимируемого элемента
                const animItemOffset = offset(animItem).top; // Расстояние анимируемого элемента к верху документа
                const animStart = 4; // Старт анимации

                let animItemPoint = window.innerHeight - animItemHeight / animStart; // Точка начала анимации
                if (animItemHeight > window.innerHeight) { // Если высота элемента больше высоты окна
                    animItemPoint = window.innerHeight - window.innerHeight / animStart;
                }
                console.log(pageYOffset);
                console.log(animItemOffset);

                console.log(animItemOffset + animItemHeight);
                // прокрутили больше чем позиция элемента минус точка старта и прокрутили меньше чем позиция элемента плюс его высота
                if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
                    animItem.classList.add('active');
                } else {
                    if (!animItem.classList.contains('anim-no-hide')) {
                        animItem.classList.remove('active');
                    }
                }
            }
        }
        function offset(el) {
            const rect = el.getBoundingClientRect(),
                scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
                scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
        }
        setTimeout(() => {
            animOnScroll();
        }, 300);
    }
})