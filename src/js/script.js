 (function burgerMenu() {
	 let burgerBtn = document.getElementById('burgerMenuBtn');
	 burgerBtn.addEventListener('click', function () {
		 this.classList.toggle('header__burger-menu_opened');
	 })
})(); 