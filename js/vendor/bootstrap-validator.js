!function($) {

	"use strict";

	var Validator = function(element, options) {
		this.$element = $(element);
		this.options = $.extend({}, $.fn.validate.defaults, options);
	};

	Validator.prototype.validate = function() {
		this.$element.find('.control-group').removeClass('error');
		this.$element.find('p, span').filter(function() {
			return $(this).hasClass('help-inline') || $(this).hasClass('help-block');
		}).hide();

		var isValid = true
			, elements = this.$element.find('input, select, textarea').filter(function() {
				var val = $(this).attr('data-validate');
				return val != null && val.length > 0;
			});

		var options = this.options;
		elements.each(function(index, item) {

			if ($(item).attr('type') !== 'submit') {
				var argsList = $(item).attr('data-validate').split(',');

				$.each(argsList, function(i, arg) {

					switch ($.trim(arg).toLowerCase()) {
						case 'required':
							if (!validateRequired($(item))) {
								var message = $(item).attr('data-required-message');
								if (message == null || message.length === 0) message = options.requiredMessage;
								styleErrors(item, message);
								isValid = false;
								return false;
							}
							break;

						case 'date':
							var format = $(item).attr('data-date-format');

							if (format != null && format.length > 0) {
								format = format.toLowerCase();
							} else {
								format = options.dateFormat;
							}

							if (!validateDate($(item), format)) {
								var message = $(item).attr('data-date-message');
								if (message == null || message.length === 0) message = options.dateMessage;								
								styleErrors(item, message);
								isValid = false;
								return false;
							}
							break;

						case 'email':
							if (!validateEmail($(item))) {
								var message = $(item).attr('data-email-message');
								if (message == null || message.length === 0) message = options.emailMessage;
								styleErrors(item, message);
								isValid = false;
								return false;
							}
							break;

						case 'length':						
							var length = $.trim($(item).attr('data-length'))
								, mode = length.match(/^(<|=|>)/);

							if (length != null && length.length > 0) {
								length = length.match(/(\d+)/);
								length = parseInt(length[1], 10);
							} else {
								break;
							}

							if (!validateLength($(item), length, mode[1])) {
								var message = $(item).attr('data-length-message');
								if (message == null || message.length === 0) message = options.lengthMessage;
								styleErrors(item, message);
								isValid = false;
								return false;
							}
							break;
					}
				});
			}
		});
		return isValid;
	}

	function validateRequired(item) {
		if (item.attr('type') === "checkbox" || item.attr('type') === "radio") {
			return item.is(':checked');
		} else {
			return item.val() != null && item.val().length > 0;
		}
	}

	function validateDate(item, format) {
		var regex = new RegExp('^([myd]+)([-/.]{1})([myd]+)([-/.]{1})([myd]+)$', 'i')
			, match = format.match(regex)
			, isValid = true
			, val = item.val();

		if (match != null) {
			var test = '^'			
				, seperator = match[2]
				, item
				, letter;

			for (var i = 1; i < match.length; i++) {
				item = match[i];
				letter = item.charAt(0);

				switch (letter) {

					case 'm':
					case 'd':
						if (item.length === 1) {
							test += '\\d{1,2}';
						} else if (item.length > 1) {
							test += "\\d{2}";
						}
						break;
					case 'y':
						test += '\\d{' + item.length + '}';
						break;
					default:
						test += '\\' + seperator + '{1}';
				}				
			}

			test += '$';
			var formatRegex = new RegExp(test, 'i');

			if (formatRegex.exec(val) != null) {
				var datePieces = val.split(seperator)
					, formatPieces = format.split(seperator)
					, month
					, day;

				$.each(formatPieces, function(index, item) {

					switch (item) {
						case 'm':
							month = parseInt(datePieces[index], 10);

							if (month < 10 && datePieces[index].length === 2) {
								isValid = false;
								return false;
							} else {
								if (month <= 0 || month > 12) {
									isValid = false;
									return false;
								}
							}
							break;
						case 'd':
							day = parseInt(datePieces[index], 10);

							if (day < 10 && datePieces[index].length === 2) {
								isValid = false;
								return false;
							} else {
								if (day <= 0 || day > 31) {
									isValid = false;
									return false;
								}
							}
							break;
						case 'mm':
							month = parseInt(datePieces[index], 10);

							if (month <= 0 || month > 12) {
								isValid = false;
								return false;
							}
							break;
						case 'dd':
							day = parseInt(datePieces[index], 10);

							if (day <= 0 || day > 31) {
								isValid = false;
								return false;
							}
							break;
					}
				});
			} else {
				isValid = false;
			}
		} else {
			try {
				throw new Error('The format string is invalid');
			} catch(e) {
				isValid = false;
			}
		}

		return isValid;
	}

	function validateEmail(item) {
		var regex = new RegExp('^[A-Za-z0-9$._%+\\-#]+@{1}\\S+\\.{1}\\w{2,5}$', 'i')
			, val = item.val();

		return regex.exec(val) != null;
	}

	function validateLength(item, length, mode) {
		if (mode == null) {
			return item.val().length === length;
		} else {
			switch (mode) {
				case '<':
					return item.val().length < length;
				case '>':
					return item.val().length > length;
				case '=':
					return item.val().length === length;
			}
		}
	}

	function styleErrors(field, msg) {
		var parent, help;
		parent = $(field).parents('.control-group');
		parent.addClass('error');
		help = parent.find('p, span').filter(function() {
			return $(this).hasClass('help-inline') || $(this).hasClass('help-block');
		});
		help.text(msg);
		help.show();
	}

	$.fn.validate = function(options) {
		var isValid = true;
		this.each(function() {
			var obj = new Validator($(this), {});
			isValid = obj.validate();
		});
		return isValid;
	}

	$.fn.validate.defaults = {
		dateFormat: 'mm/dd/yyyy',
		requiredMessage: 'This is required',
		dateMessage: 'This is not a valid date',
		emailMessage: 'This is not a valid email',
		lengthMessage: 'Does not have the correct amount of characters'
	};

	$.fn.validate.Constructor = Validator;

	$(function() {
		$('body').on('submit.validator.data-api', 'form[data-provide="validator"]', function(e) {			
			return $(this).validate({});
		});
	}); 

}(window.jQuery);