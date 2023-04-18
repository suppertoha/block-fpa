jQuery.extend(jQuery.fn, {
    /*
     * функция проверки, что длина поля не меньше 3х символов 
     */
    checka: function () {
        if (jQuery(this).val().length < 3) {jQuery(this).addClass('error');return false} else {jQuery(this).removeClass('error');return true}
    },
    /*
     * функция проверки правильности введенного email
     */
     /*
    checke: function () {
        var emailReg = /^([w-.]+@([w-]+.)+[w-]{2,4})?$/;
        var emailaddressVal = jQuery(this).val();
        if (!emailReg.test(emailaddressVal) || emailaddressVal == "") {
            jQuery(this).addClass('error');return false
        } else {
            jQuery(this).removeClass('error');return true
        }
    },
    */
});
 
jQuery(function($){
    jQuery(".item-comment .like").on('click', function(e) { 
        if (jQuery(this).hasClass('active')) {
            jQuery(this).removeClass('active');
            var current_count = jQuery(this).find('span').html();
            jQuery(this).find('span').html(parseInt(current_count) - 1);
        } else {
            jQuery(this).addClass('active');
            var current_count = jQuery(this).find('span').html();
            jQuery(this).find('span').html(parseInt(current_count) + 1);
        }
    });
    
    
    
    
    jQuery("#new-comment-form").on('submit', function(e) { 
        if(jQuery(this).find("input[name=author]").length) {
            var author = jQuery(this).find("input[name=author]").checka();
            if (!author) {
                jQuery(this).find("input[name=author]").closest('.form-element').find('.error-message').html('Поле слишком короткое.');
            } else {
                jQuery(this).find("input[name=author]").closest('.form-element').find('.error-message').html('');
            }
        }
        if(jQuery(this).find("textarea[name=comment]").length) {
            var comment = jQuery(this).find("textarea[name=comment]").checka();
            if (!comment) {
                jQuery(this).find("textarea[name=comment]").closest('.form-element').find('.error-message').html('Поле слишком короткое.');
            } else {
                jQuery(this).find("textarea[name=comment]").closest('.form-element').find('.error-message').html('');
            }
        }
        if(jQuery(this).find("input[name=email]").length) {
            var email = jQuery(this).find("input[name=email]").checka();
            if (!email) {
                jQuery(this).find("input[name=email]").closest('.form-element').find('.error-message').html('Поле слишком короткое.');
            } else {
                jQuery(this).find("input[name=email]").closest('.form-element').find('.error-message').html('');
            }
        }
        
        // небольшое условие для того, чтобы исключить двойные нажатия на кнопку отправки
        // в это условие также входит валидация полей
        if (!jQuery('#submit').hasClass('loadingform') && author && email && comment){
            jQuery.ajax({
                type : 'POST',
                url : '/wp-admin/admin-ajax.php',
                data: $(this).serialize() + '&action=ajaxcomments',
                beforeSend: function(xhr){
                    // действие при отправке формы, сразу после нажатия на кнопку #submit 
                    $('#submit').addClass('loadingform').val('Загрузка');
                },
                error: function (request, status, error) {
                    if(status==500){
                        alert('Ошибка при добавлении комментария');
                    } else if(status=='timeout'){
                        alert('Ошибка: Сервер не отвечает, попробуй ещё.');
                    } else {
                        // ворпдрессовские ошибочки, не уверен, что это самый оптимальный вариант
                        // если знаете способ получше - поделитесь
                        var errormsg = request.responseText;
                        var string1 = errormsg.split("<p>");
                        var string2 = string1[1].split("</p>");
                        alert(string2[0]);
                    }
                },
                success: function (newComment) {
                    // Если уже есть какие-то комментарии
                    console.log(newComment);
                    
                    if (newComment != '') {
                        jQuery(".comments-form__cnt #respond").addClass('hidden');
                        jQuery(".comments-form__cnt .thank-you-comment").removeClass('hidden');
                    }
                                  
                    /*
                    if(jQuery('.commentlist').length > 0){
                        // Если текущий комментарий является ответом
                        if($('#respond').parent().hasClass('comment')){
                            // Если уже есть какие-то ответы
                            if($('#respond').parent().children('.children').length){   
                                $('#respond').parent().children('.children').append(newComment);
                            } else {
                                // Если нет, то добавляем  <ul class="children">
                                newComment = '<ul class="children">'+newComment+'</ul>';
                                $('#respond').parent().append(newComment);
                            }
                            // закрываем форму ответа
                            $("#cancel-comment-reply-link").trigger("click");
                        } else {
                            // обычный коммент
                            $('.commentlist').append(newComment);
                        }
                    }else{
                        // если комментов пока ещё нет, тогда
                        newComment = '<ul class="commentlist">'+newComment+'</ol>';
                        $('#respond').before($(newComment));
                    }
                    // очищаем поле textarea
                    $('#comment').val('');
                    */
                },
                complete: function(){
                    // действие, после того, как комментарий был добавлен
                    $('#submit').removeClass('loadingform').val('Отправить');
                }
            });
        }
        
              
      
      
        e.preventDefault();
    });
});