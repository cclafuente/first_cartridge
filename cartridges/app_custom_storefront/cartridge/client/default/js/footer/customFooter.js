'use strict';

/**
 * appends params to a url
 * @param {string} data - data returned from the server's ajax call
 * @param {Object} button - button that was clicked for email sign-up
 */
function displayMessage2(data, button) {
    alert(" displayMessage ");
    $.spinner().stop();
    var status;
    if (data.success) {
        status = 'alert-success';
    } else {
        status = 'alert-danger';
    }

    if ($('.email-signup-message').length === 0) {
        $('body').append(
           '<div class="email-signup-message2"></div>'
        );
    }
    $('.email-signup-message')
        .append('<div class="email-signup-alert text-center ' + status + '">' + data.msg + '</div>');

    setTimeout(function () {
        $('.email-signup-message').remove();
        button.removeAttr('disabled');
    }, 3000);
}

module.exports = function () {
    $('.back-to-top').click(function () {
       alert(" Pressing back to top ");
    });

    $('.fa-arrow-up').click(function(){
        alert(" Pressing back to top ");
    });

    $('.subscribe-email3').on('click', function (e) {
        alert(' click on subscribe email3');
        e.preventDefault();
        var url = $(this).data('href');
        var button = $(this);
        var emailId = $('input[name=hpEmailSignUp]').val();
        var grecaptcharesponse = grecaptcha.getResponse();
        $.spinner().start();
        $(this).attr('disabled', true);
        $.ajax({
            url: url,
            type: 'post',
            dataType: 'json',
            data: {
                emailId: emailId,
                captcha: grecaptcharesponse
            },
            success: function (data) {
                displayMessage2(data, button);
            },
            error: function (err) {
                displayMessage2(err, button);
            }
        });
    });
};
