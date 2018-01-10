"use strict"

/**
 * инициализация всех инициализаций
 */
 $(document).ready(function()
 {
 	o2.init();

 	$(window).resize(function() {
 		window_width = $(window).width();
 		if (window_width < 1024) {
 			$(".support-collumn-margin, .parse-content").trigger("sticky_kit:detach");
 		} else {
 			o2.documentationStickyKit();
 		}
 	});
 });

/**
 * основной объект
 * @type {object}
 */
 var o2 = 
 {
	/**
	 * вызов функций, которые должны запускаться при загрузке страницы
	 */
	 init: function()
	 {
	 	this.makePhoneMask();
	 	this.editButton();
	 	this.documentationStickyKit();
	 	this.articleMenuScrollSpy();
	 },
	 popups:
	 {
	 	showPopup: function(popup)
	 	{
	 		$('._overlay').addClass('_show');
	 		$('._standartPopup').addClass('_show');
	 	},
	 	closePopup: function(popup)
	 	{
	 		$('._overlay').removeClass('_show');
	 		$('.popup').removeClass('_show');
	 	},
	 },
	 makePhoneMask: function()  
	 {
	 	$('._phone-mask').inputmask({"mask": "+7 (999) 999-99-99"});
	 },
	 showMobileMenu: function()
	 {
	 	$('.header-nav-mobile').toggleClass('active');
	 },
	 toggleState: function(instance,event) 
	 {
	 	event.stopPropagation();
	 	if($(instance).hasClass("opened"))
	 	{
	 		$(instance).removeClass("opened");
	 		$(instance).find('.nav-item__list').slideUp(200);
	 		return false;
	 	}
	 	$(".nav-item").removeClass("opened");
	 	$(".nav-item__list").slideUp(200);
	 	$(instance).toggleClass("opened");
	 	$(instance).find('.nav-item__list').slideToggle(200);
	 },
	 toggleAllTopic: function(instance,event)
	 {
	 	$(".topics-section").find('.hidden-topic').slideToggle(200);
	 },
	 toggleAllTopicSidebar: function(instance, event)
	 {
	 	$(".topic-categories").find('.topic-categories__all-topic').slideToggle(200);
	 }, 
	 editButton:function()
	 {
	 	var link = $('.article-content-edit-link').attr('href');
	 	var text = $('.article-content-edit-link').html();
	 	var editButton = '<a href=' + link + '><img src="/images/edit_pencil.svg" class="edit-pencil edit-pencil-h1" alt="' + text + '"/></a>';
	 	$( ".article-content h1" ).each(function() {
	 		$(this).after(editButton);
	 	});
	 	$(".article-content h2").each(function() {
	 		if(link.indexOf('crowdin') != -1){
	 			var editButton = '<a href=' + link + '><img src="/images/edit_pencil.svg" class="edit-pencil edit-pencil-h2" alt="' + text + '"/></a>';
	 		} else {
	 			var h2id = $(this).text().toLowerCase();
	 			var elemId = h2id.replace(/[^\w 0-9]/ug, "").replace(/\s/g, "-");
	 			$(this).attr('id', elemId);
	 			var editButton = '<a href=' + link + '/#' + elemId + '><img src="/images/edit_pencil.svg" class="edit-pencil edit-pencil-h2" alt="Edit ' + $(this).text() + ' on GitHub"/></a>';
	 		}
	 		$(this).after(editButton);
	 	});
	 },
	 topicsAccordeon: function(instance, event)
	 {
	 	event.stopPropagation();
	 	if($(instance).next("ul").css('display') == 'none')
	 	{
	 		$(".header-nav-mobile ul").slideUp(300);
	 	}
	 	$(instance).next("ul").slideToggle(300);
	 },
	 documentationStickyKit: function()
	 {
	 	var window_width = $(window).width();

	 	if (window_width < 1024) {
	 		$(".support-collumn-margin, .parse-content").trigger("sticky_kit:detach");
	 	} else {
	 		$(".support-collumn-margin, .parse-content").stick_in_parent()
	 		.on("sticky_kit:bottom", function(e) {
	 			$(this).parent().css('position', 'static');
	 		})
	 		.on('sticky_kit:unbottom', function(e) { 
	 			$(this).parent().css('position', 'relative');
	 		});
	 	}
	 },
	 articleMenuScrollSpy: function()
	 {
	 	var lastName, 
	 	menuItems = $(".parse-content").find("a[name]"),
	 	scrollItems = menuItems.map(function(){
	 		var item = $("a[name='"+$(this).attr("name")+"']");
	 		if (item.length) { return item; }
	 	});

	 	$(window).scroll(function() {
	 		var fromTop = $(this).scrollTop()+15;
	 		var cur = scrollItems.map(function(){
	 			if ($(this).offset().top < fromTop)
	 				return this; 
	 		});
	 		cur = cur[cur.length-1];
	 		var name = cur && cur.length ? cur[0].name : "";

	 		if (lastName !== name) {
	 			lastName = name;
	 			$(".article-menu a").removeClass("active")
	 			$("a[href='#"+name+"']").addClass("active");
	 		}                   
	 	});
	 },
	 allNavSlideUp: function()
	 {
	 	$(".nav-item__list").slideUp(300);
	 	$(".header-nav-mobile ul").slideUp(300);
	 }
	}