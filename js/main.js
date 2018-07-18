/*
 * Main JS
 */
var brasserie = {

	init: function() {
		this.cacheDom(),
		this.bindEvents();
	},

	cacheDom: function() {
		this.$body 			= $("body"),
		this.$bodyCls 		= $(".homepage"),
		this.$doc 			= $(document),
		this.$win			= $(window),
		this.$headCart 		= this.$body.find(".header-cart"),
		this.$searchCls		= this.$body.find(".js--toggle-search-mode"),
		this.$mainNav 		= this.$body.find(".main-nav"),
		this.$numOnly 		= this.$body.find(".number-only"),

		// modals
		this.$siteAccess    = this.$body.find("#ageModal"),
		this.$accessBtn	 	= this.$siteAccess.find(".btn"),

		//slider
		this.$homeSlider	= this.$body.find(".home-slider"),
		this.$testiSlider	= this.$body.find(".testimonial-slider"),
		this.$calSlider		= this.$body.find(".calendar-slider");
	},

	bindEvents: function() {
		this.$headCart.on("mouseover mouseout", this.mouseOverOutHeaderCart.bind(this)),
		this.$searchCls.on("click", this.toggleSearch.bind(this)),
		this.$doc.ready(this.docReady.bind(this)),
		this.$numOnly.on("keydown", this.acceptNumOnly.bind(this)),
		this.$accessBtn.on("click", this.btnPrevDefault.bind(this));
	},

	mouseOverOutHeaderCart: function(event) {
		var eventType = event.type;

		this.$bodyCls.toggleClass('cart-mode');
	},

	toggleSearch: function(event) {
		event.preventDefault();

		this.$bodyCls.toggleClass('search-mode');
	},

	docReady: function() {
		var self = this,
			owl = this.$calSlider;

		this.$homeSlider.owlCarousel({
			lazyLoad: true,
	        items: 1,
	        smartSpeed: 1500,
	        loop: true,
	        autoplay: true,
	        autoplayTimeout: 8000,
	        dots: true,
	        nav: true,
	        navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]
		});
		this.$testiSlider.owlCarousel({
			lazyLoad: true,
	        items: 1,
	        smartSpeed: 1500,
	        loop: true,
	        autoplay: true,
	        autoplayTimeout: 8000,
	        dots: false,
	        nav: true,
	        navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]
		});
		this.$siteAccess.modal({
			backdrop: 'static'
		});

		// calendar carousel / slider
		owl.owlCarousel({
			lazyLoad: true,
			responsiveClass: true,
			responsive: {
				0: {
					items: 1
				},
				600: {
					items: 2
				},
				767: {
					items: 3
				},
				991: {
					items: 5
				}
			},
			nav: true,
	        margin: 45,
	        smartSpeed: 1500,
	        autoplayTimeout: 8000,
	        navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]
		});

		var angleDoubleLeft 	= "<button type='button' role='presentation' class='owl-prev-prev'><i class='fa fa-angle-double-left'></i></button>",
			angleDoubleRight 	= "<button type='button' role='presentation' class='owl-next-next'><i class='fa fa-angle-double-right'></i></button>";

		if( owl.find(".owl-nav .owl-prev") ) {
			owl.find(".owl-nav .owl-prev").before(angleDoubleLeft);
		}

		if( owl.find(".owl-nav .owl-next") ) {
			owl.find(".owl-nav .owl-next").after(angleDoubleRight);
		}

		var csDblNext 	= owl.find(".owl-next-next"),
			csDblPrev	= owl.find(".owl-prev-prev"),
			calItem 	= owl.find(".owl-item .item"),
			calTable	= owl.next(".table-calendar");

		csDblNext.on("click", function() {
			var lastItem = owl.find('.owl-item').length;	

			owl.trigger('to.owl.carousel', [lastItem, 0, true]);
		});

		csDblPrev.on("click", function() {
			owl.trigger('to.owl.carousel', [0, 0, true]);
		});

		calItem.on("click", function(e) {
			var $this 	= $(this),
				owlItem = $(this).not('.disabled').closest('.owl-item');

			e.preventDefault();

			calTable.toggleClass('hidden');
			$this.not('.disabled').toggleClass('active');
			owlItem.toggleClass('clicked');
		});
	},

	btnPrevDefault: function(e) {
		e.preventDefault();
	},

	acceptNumOnly: function(e) { // for contact form input that accepts number only
		// Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
             // Allow: Ctrl+A, Command+A
            (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) || 
             // Allow: home, end, left, right, down, up
            (e.keyCode >= 35 && e.keyCode <= 40)) {
                 // let it happen, don't do anything
                 return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
	}
};

$(function() {
	// init
	brasserie.init();
	$('[data-toggle="tooltip"]').tooltip();
});
