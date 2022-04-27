
// V A L I D A T E

const validation = new window.JustValidate('.contacts-grid__form', {
  errorFieldCssClass: 'is-invalid',
  errorFieldStyle: {
    border: '1px solid #FF5C00',
  },
  errorLabelCssClass: 'is-label-invalid',
  errorLabelStyle: {
    color: '#FF5C00',
  },
  focusInvalidField: true,
  lockForm: true,
});

validation
.addField('.input-name', [
  {
    rule: 'minLength',
    value: 3,
    errorMessage: 'Имя должно содержать хотя бы 3 буквы'
  },
  {
    rule: 'maxLength',
    value: 30,
    errorMessage: 'Имя не может содержать более 30 символов'
  },
  {
    rule: 'required',
    errorMessage: 'Как вас зовут?'
  }
])
.addField('.input-mail', [
  {
    rule: 'required',
    errorMessage: 'Поле обязательное для заполнения',
  },
  {
    rule: 'email',
    errorMessage: 'Укажите ваш e-mail',
  },
]);

// B U  R G E R
// здесь мы определяем функцию, которая отвеает за работу меню, в ней не нужно ничего менять
function setBurger(params) {
  const btn = document.querySelector(`.${params.btnClass}`);
  const menu = document.querySelector(`.${params.menuClass}`);

  menu.addEventListener("animationend", function () {
    if (this.classList.contains(params.hiddenClass)) {
      this.classList.remove(params.activeClass);
      this.classList.remove(params.hiddenClass);
    }
  });

  btn.addEventListener("click", function () {
    this.classList.toggle(params.activeClass);

    if (
      !menu.classList.contains(params.activeClass) &&
      !menu.classList.contains(params.hiddenClass)
    ) {
      menu.classList.add(params.activeClass);
      document.body.style.overflow = 'hidden';
    } else {
      menu.classList.add(params.hiddenClass);
      document.body.removeAttribute('style');
    }
  });
}

// здесь мы вызываем функцию и передаем в нее классы наших элементов
setBurger({
  btnClass: "burger", // класс бургера
  menuClass: "menu-wrap", // класс меню
  activeClass: "is-opened", // класс открытого состояния
  hiddenClass: "is-closed" // класс закрывающегося состояния (удаляется сразу после закрытия)
});

// S E A R C H

function setSearch(params) {
  const openBtn = document.querySelector(`.${params.openBtnClass}`);
  const search = document.querySelector(`.${params.searchClass}`);
  const closeBtn = search.querySelector(`.${params.closeBtnClass}`);

  search.addEventListener("animationend", function (evt) {
    if (this._isOpened) {
      this.classList.remove(params.activeClass);
      this.classList.remove(params.hiddenClass);
      this._isOpened = false;
    } else {
      this._isOpened = true;
    }
  });

  search.addEventListener('click', function(evt) {
    evt._isSearch = true;
  });

  openBtn.addEventListener("click", function (evt) {
    this.disabled = true;

    if (
      !search.classList.contains(params.activeClass) &&
      !search.classList.contains(params.hiddenClass)
    ) {
      search.classList.add(params.activeClass);
    }
  });

  closeBtn.addEventListener('click', function () {
    openBtn.disabled = false;
    search.classList.add(params.hiddenClass);
  });

  document.body.addEventListener('click', function (evt) {
    if (!evt._isSearch && search._isOpened) {
      openBtn.disabled = false;
      search.classList.add(params.hiddenClass);
    }
  });
}

setSearch({
  openBtnClass: "js-open-search", // класс кнопки открытия
  closeBtnClass: "js-close", // класс кнопки закрытия
  searchClass: "js-form", // класс формы поиска
  activeClass: "is-opened", // класс открытого состояния
  hiddenClass: "is-closed" // класс закрывающегося состояния (удаляется сразу после закрытия)
})


// M O D A L  CLOSE
let contactsModalClose = document.querySelector('.contacts-modal__close');
let contactsModal = document.querySelector('.contacts-modal');

contactsModalClose.addEventListener('click', function(){
	contactsModalClose.classList.toggle('active');
	contactsModal.classList.toggle('active');
})


// M A P

ymaps.ready(init);
function init() {
	const mapElem = document.querySelector('#map');
	const myMap = new ymaps.Map(
		"map",
		{
			center: [55.769535, 37.639985],
			zoom: 14,
			controls: []
		},
		{
			suppressMapOpenBlock: true,
			geolocationControlSize: "large",
			geolocationControlPosition:  { top: "200px", right: "20px" },
			geolocationControlFloat: 'none',
			zoomControlSize: "small",
			zoomControlFloat: "none",
			zoomControlPosition: { top: "120px", right: "20px" }
		}
	);

	myMap.behaviors.disable('scrollZoom');

	const myPlacemark = new ymaps.Placemark(
		[55.769535, 37.639985],
		{},
		{
			iconLayout: "default#image",
			iconImageHref: "../img/geo.png",
			iconImageSize: [12, 12],
			iconImageOffset: [-20, -40],
		}
	);

	myMap.geoObjects.add(myPlacemark);

	setTimeout(() => {
		myMap.container.fitToViewport();
	}, 5000);
}
