define(['jquery'], function ($) {
    function Notify (options) {
        this.message = options.message;
        this.duration = options.duration;
        this.containerId = 'jk-notifications';
        this.animation = 'slide';
        this.autoDisplay = true;
        this.autoHide = true;

        this.init();
    }

    Notify.prototype.init = function () {
        var _this = this;

        //build required DOM elements
        if ( !$('#' + this.containerId).length ) {
            $('<div></div>', {id: _this.containerId}).appendTo('body');
        }
        this.wrapper = $('<div></div>', {class: 'jk-notification-wrapper'}).
            appendTo('#' + this.containerId);
        this.elem = $('<div></div>', {class: 'jk-notification'}).
            html(this.message).
            appendTo(this.wrapper);

        //show
        if (this.autoDisplay) {
            this.display();
        }

        //hide
        if (this.autoHide) {
            setTimeout(function () {
                _this.dismiss();
            }, this.duration);
        }

        this.registerEvents();
    };

    Notify.prototype.display = function () {
        this.wrapper.
        css({opacity: 0, height: 0}).
        animate(
            { opacity: 1, height: '50px'},
            { queue: false, duration: 500 }
        )
    };

    Notify.prototype.dismiss = function () {
        var _this = this;
        this.wrapper.fadeOut(function () {
            _this.remove();
        });
    };

    Notify.prototype.registerEvents = function () {
        var _this = this;
        $(this.wrapper).delegate(this.elem, 'click', function () {
           _this.dismiss();
        });
    };

    return Notify;
});