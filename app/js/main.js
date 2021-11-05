// ===============================//
// ============= Libs ===========//
// ==============================//
@@include('libs/jquery.js')
@@include('libs/jquery.fancybox.min.js')
@@include('libs/owl.carousel.min.js')
@@include('libs/mask.js')
@@include('libs/mask-phone.js')
@@include('libs/headhesive.js')
@@include('libs/parallax.min.js')
@@include('libs/validate.js')
@@include('libs/scroll.js')
// ==============================//
// =========== Libs ===============//
// ==============================//
 
$(document).ready(function(){
    $('.products__item__footer__label__question__icon').click(function(){
        $(this).closest('.products__item__footer__label__question').find('.products__item__footer__label__question__hint').toggleClass('active');
        $(this).toggleClass('active');
    });

    $('body').click(function(){
        if ($(event.target).closest(".products__item__footer__label__question__icon").length) return;
        if ($(event.target).closest(".products__item__footer__label__question__hint").length) return;
        if ($(event.target).closest(".modal").length) return;
        if ($(event.target).closest("[data-modal-show]").length) return;
        $('.products__item__footer__label__question__hint').removeClass('active');
        $('.products__item__footer__label__question__icon').removeClass('active');
        $('[data-modal]').removeClass('active');
        setTimeout(function(){
            $('body').css('padding-right', '0');
            $('body').removeClass('overflowhidden');
            $('[data-modal]').find('.modal').removeClass('success');
            $('[data-modal]').find('form input').val('');
        }, 300);
    });

    // Получаем ширину скроллбара
    function get_scrollbar_width(){
        let div = document.createElement('div');

        div.style.overflowY = 'scroll';
        div.style.width = '50px';
        div.style.height = '50px';
        
        // мы должны вставить элемент в документ, иначе размеры будут равны 0
        document.body.append(div);
        let scrollWidth = div.offsetWidth - div.clientWidth;
        
        div.remove();
        console.log(scrollWidth);
        
        return scrollWidth;
    }
    // END Получаем ширину скроллбара

    $('[data-modal-show]').click(function(){
        var id = $(this).attr('data-modal-show');
        $('[data-modal="'+id+'"]').addClass('active');
        var scrollbar_width = get_scrollbar_width();
        $('body').css('padding-right', scrollbar_width+'px');
        $('body').addClass('overflowhidden');
    });
    $('[data-modal-close]').click(function(){
        var id = $(this).attr('data-modal-close');
        $('[data-modal="'+id+'"]').closest('.modal__wrapper').removeClass('active');
        setTimeout(function(){
            $('body').css('padding-right', '0');
            $('body').removeClass('overflowhidden');
            $('[data-modal="'+id+'"]').find('.modal').removeClass('success');
            $('[data-modal="'+id+'"]').find('form input').val('');
        }, 300);
    });


    $('[data-mask="phone"]').each(function(i, el){
        $(el).mask("+7 (999) 999-99-99");
    });


    $.validator.addMethod(
        "phone",
        function (value) {
            return value.replace(/\D+/g, "").length >= 11;
        },
        "Введите номер телефона полностью"
    );


    $("[data-scroll]").mPageScroll2id({
        scrollSpeed: 900,
        keepHighlightUntilNext: true,
    });



    
    $('.products__items').each(function(i, el){
        var items = $(el).find('.products__item');
        if(items.length <= 3) {
            $(el).closest('.products').find('.products__load__more').hide();
        }
        items.each(function(i,el){
            if (i > 2) {
                $(el).hide();
            }
        });
    });

    $('.products__load__more').each(function(i,el){
        $(el).find('.btn__black').click(function(){
            var items = $(this).closest('.products').find('.products__item');
            items.each(function(i,el){
                $(el).show();
            });
            $(this).hide();
        });
    }); 
    // $('.products__load__more .btn__black').click(function(){
    //     $(this).closest('.products__items').find('.products__item').show();
    // });

});