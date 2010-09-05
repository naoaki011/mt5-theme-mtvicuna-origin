/**
 * jQuery Form Notifier Plugin
 *   http://code.google.com/p/jquery-formnotifier/
 *
 * Copyright (c) 2009 Yusuke Horie
 *
 * Released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Since  : 0.01 - 06/20/2009
 * Version: 0.20 - 07/20/2009
 */
(function(jQuery) {

  var _inc = 0;

  var _id = function(e) {
    var id;
    if (e.id) {
      id = e.id;
    } else if(e.fnid) {
      id = e.fnid;
    } else {
      _inc++;
      e.fnid = _inc;
      id = e.fnid;
    }
    return 'formnotifier_' + id;
  };

  jQuery.fn.formNotifier =function (options) {
    var options = jQuery.extend({}, $.fn.formNotifier.defaults, options);

    return this.each(function(i, e) {
      jQuery(e)
        .bind('add.fn', function () {
          var $t = jQuery(this);

          if (jQuery.trim($t.val()) != '') {
            $t.trigger('remove.fn');
            return false;
          }

          var o = $t.offset();
          var w = $t.outerWidth();
          var h = $t.outerHeight();
          options.width = w + 'px';
          options.height = h + 'px';
          options.lineHeight = h + 'px';
          options.left = o.left;
          options.top = o.top;

          jQuery('<div />')
            .attr('id', _id(this))
            .attr('class', options.className)
            .text($t.attr('title'))
            .css(options)
            .appendTo('body')
            .click(function () { $t.trigger('remove.fn').focus(); })
            .ajaxSend(function () { $t.trigger('remove.fn'); })
            .ajaxComplete(function () { $t.trigger('add.fn'); });
        })
        .trigger('add.fn')
        .bind('remove.fn', function () {
           jQuery('#' + _id(this)).remove();
        })
        .bind('focus.fn', function () {
          jQuery(this).trigger('remove.fn');
        })
        .bind('blur.fn', function () {
          jQuery(this).trigger('add.fn');
        })
    });
  };

  jQuery.fn.formNotifier.defaults = {
    //padding: (jQuery.browser.msie) ? '0 5px': '0 5px',
    opacity: 0.8,
    padding: '0 5px',
    position: 'absolute',
    zIndex: 100,
    className: 'formnotifier'
  };

})(jQuery);
