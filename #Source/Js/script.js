function ibg(){
	$.each($('.ibg'), function(index, val) {
		if($(this).find('img').length>0){
			$(this).css('background-image','url("'+$(this).find('img').attr('src')+'")');
		}
	});
}
ibg();

// ====== Бургер ====== 

const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__body');

if(iconMenu){
	iconMenu.addEventListener('click', function(e){
		document.body.classList.toggle('_lock');
		iconMenu.classList.toggle('_active');
		menuBody.classList.toggle('_active');
	});
}

// ====== Скролл при клике ====== 

// Определяет padding в зависимости от ширины экрана
function getPaddingHeader(){
	let windowInnerWidth = window.innerWidth;
    let headerPad = 0;

	if (windowInnerWidth > 800){
		headerPad = 40;
	} else {
		headerPad = 20;
	}

	return headerPad;
}
// Устанавливает значение padding
function setPaddingHeader(){
    let headerPad = getPaddingHeader();

	document.querySelector('.header__body').style.paddingTop = headerPad + 'px';
	document.querySelector('.header__body').style.paddingBottom = headerPad + 'px';
}
setPaddingHeader();

// Базовое значение padding
let headerPadDown = getPaddingHeader();
document.addEventListener("DOMContentLoaded", function(event)
{
    window.onresize = function() {
		setPaddingHeader();
		headerPadDown = getPaddingHeader();
    };
});

// До какого размера изменится при скролле
let headerPadUp = 10;

// Текущее значение padding шапки
let nowPad = headerPadDown;

// scroll-button - класс блоков, в которых есть кнопка, приводящая к скроллу
const menuLinks = Array.prototype.slice.call(document.querySelectorAll('.menu__list, .scroll-button'));

let allLinks = [];
menuLinks.forEach(menuLink => {
	menuLink.querySelectorAll('a').forEach(linksItem=> {
		allLinks.push(linksItem);
	});
});

if (menuLinks.length > 0){
	menuLinks.forEach(menuLink => {
		menuLink.addEventListener("click", onMenuLinkClick);
	});

	function onMenuLinkClick(e) {
		let menuLink = e.target;
		if (!menuLink.getAttribute('href')){
			menuLink = menuLink.parentNode;
		}
		e.preventDefault();

		let gotoName = menuLink.getAttribute('href').replace('#', '.')
		if(gotoName && document.querySelector(gotoName)){
			const gotoBlock = document.querySelector(menuLink.getAttribute('href').replace('#', '.'));
			const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset + ( nowPad * 2 ) - document.querySelector('.header__body').offsetHeight;

			window.scrollTo({
				top: gotoBlockValue,
				behavior: "smooth"
			});

			// Закрываем меню бургер при переходе на блок
			if(iconMenu.classList.contains('_active')){
				document.body.classList.remove('_lock');
				iconMenu.classList.toggle('_active');
				menuBody.classList.toggle('_active');
			}
		}
	}
}

// ====== Анимации при скролле ====== 

const animItems = document.querySelectorAll('.animItems');
const hoverItems = document.querySelectorAll('.noHover');
const header = document.querySelector('.header__body');
let scrollPos = 0;

//if (animItems.length > 0){
	window.addEventListener('scroll', animOnScroll);
	function animOnScroll(params){
		for (let i = 0; i < animItems.length; i++) {
			const animItem = animItems[i];
			const animItemHeight = animItem.offsetHeight;
			const animItemOffset = offset(animItem).top;
			const animStart = 4;

			let animItemPoint = window.innerHeight - animItemHeight / animStart;

			if (animItemHeight > window.innerHeight){
				animItemPoint = window.innerHeight - window.innerHeight / animStart;
			}

			if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)){
				animItem.classList.add('animActive');

				if (animItem.classList.contains('disableHover')){
					setTimeout(() => {
						animItem.classList.remove('disableHover');
						animItem.classList.add('activeHover');
					}, 900);
				}

				if (animItem.classList.contains('hoverAnim')){
					setTimeout(() => {
						animItem.classList.remove('animActive');
					}, 1000);
				}
			}
		}

		// Анимация хедера
		let headerHeight = header.offsetHeight;
		if (pageYOffset > scrollPos && pageYOffset > 90){
			// Down
			document.querySelector('.header__body').style.paddingTop = headerPadUp + 'px';
			document.querySelector('.header__body').style.paddingBottom = headerPadUp + 'px';
			document.querySelector('.header__container').classList.add('styleActive');
			nowPad = headerPadUp;

			// mod. Добавляю класс для уменьшения лого
			document.querySelector('.header__logo').classList.add('_diff-size');
			document.querySelector('.menu__list').classList.add('_active');
		} else {
			// Up
			if (pageYOffset < 90){
				document.querySelector('.header__body').style.paddingTop = headerPadDown + 'px';
				document.querySelector('.header__body').style.paddingBottom = headerPadDown + 'px';
				document.querySelector('.header__container').classList.remove('styleActive');
				nowPad = headerPadDown;

				// mod. Удаляю класс
				document.querySelector('.header__logo').classList.remove('_diff-size');
				document.querySelector('.menu__list').classList.remove('_active');
			}
		}
		scrollPos = pageYOffset;
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
//}


// ====== Адаптивная максимальная высота ====== 

const adaptItems = document.querySelectorAll('.amh');
let newAdaptItems = [];

// Удаляю дубликаты
adaptItems.forEach(adaptItem => {
	if(!newAdaptItems.includes(adaptItem.classList[0])){
		newAdaptItems.push(adaptItem.classList[0]);
	}
});

function amh(newAdaptItems){
	let maxHeight = 0;
	newAdaptItems.forEach(newAdaptItem => {
		let items = document.querySelectorAll('.' + newAdaptItem);

		if( Number(items[0].classList[2]) < window.innerWidth){
			items.forEach(item => {
				item.style.minHeight = 'auto';
				if (item.offsetHeight > maxHeight){
					maxHeight = item.offsetHeight;
				}
			});

			items.forEach(item => {
				item.style.minHeight = maxHeight + 'px';
			});
		} else {
			items.forEach(item => {
				item.style.minHeight = 'auto';
			});
		}

	});
};
amh(newAdaptItems);

document.addEventListener("DOMContentLoaded", function(event)
{
    window.onresize = function() {
        amh(newAdaptItems);
        adaptivElementsHeight();
    };
});

// Ширина блоков по размеру текста
function adaptivElementsHeight(){
	const root = document.querySelector(':root');

	let menuHeight = document.querySelector('.our-menu__list').clientHeight;
	let menuFooterHeight = document.querySelector('.our-menu__footer').clientHeight;

	root.style.setProperty('--base-menu-height', menuHeight);
	root.style.setProperty('--base-menu-footer-height', menuFooterHeight);
}

adaptivElementsHeight();