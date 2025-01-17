var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

(function($) {
  var BooleanController, Controller, GaugeController, LEDController, NumericController, ReadoutController, StringController, TankController;
  Controller = (function() {

    function Controller(element, options) {
      this.options = options;
      this.$element = $(element);
      this.value = this.options.default_value;
    }

    Controller.prototype.setValue = function(val) {
      return this.value = val;
    };

    Controller.prototype.getValue = function() {
      return this.value;
    };

    return Controller;

  })();
  BooleanController = (function(_super) {

    __extends(BooleanController, _super);

    function BooleanController(element, options) {
      BooleanController.__super__.constructor.apply(this, arguments);
      this.value = Boolean(this.value);
    }

    return BooleanController;

  })(Controller);
  NumericController = (function(_super) {

    __extends(NumericController, _super);

    function NumericController(element, options) {
      NumericController.__super__.constructor.apply(this, arguments);
      this.value = Number(this.value);
      this.scale_hi = this.options.high;
      this.scale_low = this.options.low;
      this.tick_amt = this.options.tick_amount;
      this.tick_scale_frequency = this.options.tick_scale_frequency;
      this.tick_scale = this.options.tick_scale;
    }

    NumericController.prototype.calcDist = function(amt, height) {
      var aspect;
      aspect = this.$element.children(".ticks").height() / this.$element.children(".ticks").width();
      return ((100 - height * (amt - 1)) / (amt - 1)) * aspect;
    };

    return NumericController;

  })(Controller);
  StringController = (function(_super) {

    __extends(StringController, _super);

    function StringController(element, options) {
      StringController.__super__.constructor.apply(this, arguments);
      this.value = String(this.value);
    }

    return StringController;

  })(Controller);
  LEDController = (function(_super) {

    __extends(LEDController, _super);

    function LEDController() {
      return LEDController.__super__.constructor.apply(this, arguments);
    }

    LEDController.prototype.setValue = function(val) {
      LEDController.__super__.setValue.apply(this, arguments);
      this.$element.children(".meter").toggleClass("off", !val);
      return this;
    };

    return LEDController;

  })(BooleanController);
  TankController = (function(_super) {

    __extends(TankController, _super);

    function TankController(element, options) {
      var $ticks, dist, generateScales, generateTicks, i, inc, scaleFrequency, tickAmt, tickHeight, ticks, _i, _j, _ref, _ref1, _ref2, _ref3;
      TankController.__super__.constructor.apply(this, arguments);
      this.tick_height = this.options.tick_height;
      $ticks = this.$element.children(".ticks");
      if ($ticks.length <= 0) {
        return;
      }
      tickHeight = 3;
      generateTicks = true;
      generateScales = true;
      tickAmt = 0;
      if (this.tick_height !== void 0) {
        tickHeight = this.tick_height;
      } else if ($ticks.data('height') !== void 0) {
        tickHeight = $ticks.data('height');
      }
      if ($ticks.children(".tick").length >= 2) {
        generateTicks = false;
      } else if ((_ref = this.tick_amt) !== (void 0) && _ref !== 0 && _ref !== 1) {
        tickAmt = this.tick_amt;
      } else if ((_ref1 = $ticks.data('amount')) !== (void 0) && _ref1 !== 0 && _ref1 !== 1) {
        tickAmt = $ticks.data('amount');
      } else {
        return;
      }
      if ((_ref2 = $ticks.data('scale-freq')) !== (void 0) && _ref2 !== 0) {
        scaleFrequency = $ticks.data('scale-freq');
      } else if (((_ref3 = this.tick_scale_frequency) !== (void 0) && _ref3 !== 0) && this.tick_scale === true) {
        scaleFrequency = this.tick_scale_frequency;
      } else {
        generateScales = false;
      }
      if (generateTicks) {
        for (i = _i = 1; _i <= tickAmt; i = _i += 1) {
          $ticks.append('<div class="tick"></div>');
        }
      }
      ticks = $ticks.children(".tick");
      ticks.css("height", tickHeight + "%");
      dist = this.calcDist(ticks.length, tickHeight);
      ticks.css("margin-bottom", dist + "%");
      if (generateScales) {
        inc = (this.scale_hi - this.scale_low) / (tickAmt - 1);
        for (i = _j = 0; 0 <= tickAmt ? _j <= tickAmt : _j >= tickAmt; i = _j += scaleFrequency) {
          $(ticks[i]).append('<span class="scale">' + Math.floor((tickAmt - i - 1) * inc) + '</span>');
        }
      }
    }

    TankController.prototype.setValue = function(val) {
      var adjusted;
      TankController.__super__.setValue.apply(this, arguments);
      adjusted = 100 - (val / (this.scale_hi - this.scale_low)) * 100;
      return this.$element.children(".space").css("height", adjusted + "%");
    };

    return TankController;

  })(NumericController);
  GaugeController = (function(_super) {

    __extends(GaugeController, _super);

    function GaugeController(element, options) {
      var $ticks, angle, generateScales, generateTicks, i, inc, scaleFrequency, tickAmt, tickHeight, ticks, _i, _j, _k, _ref, _ref1, _ref2, _ref3, _ref4, _ref5;
      GaugeController.__super__.constructor.apply(this, arguments);
      this.tick_height = this.options.tick_height;
      $ticks = this.$element.children(".ticks");
      if ($ticks.length <= 0) {
        return;
      }
      tickHeight = 2.5;
      generateTicks = true;
      scaleFrequency = 1;
      generateScales = true;
      tickAmt = 0;
      if ($ticks.data('height') !== void 0) {
        tickHeight = $ticks.data('height');
      } else if (this.tick_height !== void 0) {
        tickHeight = this.tick_height;
      }
      if ($ticks.children(".tick").length >= 2) {
        generateTicks = false;
      } else if ((_ref = $ticks.data('amount')) !== (void 0) && _ref !== 0 && _ref !== 1) {
        tickAmt = $ticks.data('amount');
      } else if ((_ref1 = this.tick_amt) !== (void 0) && _ref1 !== 0 && _ref1 !== 1) {
        tickAmt = this.tick_amt;
      } else {
        return;
      }
      if ((_ref2 = $ticks.data('scale-freq')) !== (void 0) && _ref2 !== 0) {
        scaleFrequency = $ticks.data('scale-freq');
      } else if (((_ref3 = this.tick_scale_frequency) !== (void 0) && _ref3 !== 0) && this.tick_scale === true) {
        scaleFrequency = this.tick_scale_frequency;
      } else {
        generateScales = false;
      }
      if (generateTicks) {
        for (i = _i = 1, _ref4 = tickAmt + 1; _i <= _ref4; i = _i += 1) {
          $ticks.append('<div class="tick"></div>');
        }
      }
      $ticks.children(".tick").css("width", tickHeight + "%");
      ticks = $ticks.children(".tick");
      for (i = _j = 1; _j <= tickAmt; i = _j += 1) {
        $(ticks[i]).css("top", i * -100 + "%");
        angle = ((i - 1) / (tickAmt - 1)) * 140 - 70;
        $(ticks[i]).css({
          '-webkit-transform': 'rotate(' + angle + 'deg)',
          '-moz-transform': 'rotate(' + angle + 'deg)',
          '-ms-transform': 'rotate(' + angle + 'deg)',
          '-o-transform': 'rotate(' + angle + 'deg)',
          'transform': 'rotate(' + angle + 'deg)'
        });
      }
      if (generateScales) {
        inc = (this.scale_hi - this.scale_low) / (tickAmt - 1);
        for (i = _k = 1, _ref5 = tickAmt + 1; 1 <= _ref5 ? _k <= _ref5 : _k >= _ref5; i = _k += scaleFrequency) {
          $(ticks[i]).append('<span class="scale">' + Math.floor((i - 1) * inc) + '</span>');
        }
      }
    }

    GaugeController.prototype.setValue = function(val) {
      var adjusted;
      GaugeController.__super__.setValue.apply(this, arguments);
      adjusted = (val / (this.scale_hi - this.scale_low)) * 140 - 70;
      return this.$element.children(".meter").css({
        '-webkit-transform': 'rotate(' + adjusted + 'deg)',
        '-moz-transform': 'rotate(' + adjusted + 'deg)',
        '-ms-transform': 'rotate(' + adjusted + 'deg)',
        '-o-transform': 'rotate(' + adjusted + 'deg)',
        'transform': 'rotate(' + adjusted + 'deg)'
      });
    };

    return GaugeController;

  })(NumericController);
  ReadoutController = (function(_super) {

    __extends(ReadoutController, _super);

    function ReadoutController(element, options) {
      var $meter, digitAmt, generateDigits, i, width, _i, _ref, _ref1;
      ReadoutController.__super__.constructor.apply(this, arguments);
      this.digit_amount = this.options.digit_amount;
      $meter = this.$element.children(".meter");
      if ($meter.length <= 0) {
        return;
      }
      generateDigits = true;
      if ($meter.children(".digit").length > 0) {
        generateDigits = false;
      } else if ((_ref = this.digit_amount) !== (void 0) && _ref !== 0 && _ref !== 1) {
        digitAmt = this.digit_amount;
      } else if ((_ref1 = $meter.data('digits')) !== (void 0) && _ref1 !== 0 && _ref1 !== 1) {
        digitAmt = $meter.data('digits');
      } else {
        return;
      }
      if (generateDigits) {
        for (i = _i = 1; _i <= digitAmt; i = _i += 1) {
          $meter.append('<span class="digit"></span>');
        }
      }
      this.setValue(40);
      width = $meter.children(".digit").first().width();
      this.$element.css("width", width * digitAmt);
    }

    ReadoutController.prototype.setValue = function(val) {
      var digits, i, _i, _ref, _results;
      ReadoutController.__super__.setValue.call(this, String(val));
      digits = this.$element.find(".meter > .digit");
      _results = [];
      for (i = _i = 0, _ref = digits.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        if (this.value[i] === void 0) {
          $(digits[i]).text('');
        }
        _results.push($(digits[i]).text(this.value[i]));
      }
      return _results;
    };

    return ReadoutController;

  })(StringController);
  $(document).ready(function() {
    return $(".industrial.preloader").remove();
  });
  $.fn.industrial = function(option) {
    return this.each(function() {
      var $this, CtlClass, data, options;
      $this = $(this);
      data = $this.data("controller");
      options = $.extend({}, $.fn.industrial.defaults, typeof option === "object" && option);
      CtlClass = void 0;
      switch ($this.attr("class").split(" ")[1]) {
        case "tank":
        case "thermometer":
          CtlClass = TankController;
          break;
        case "gauge":
          CtlClass = GaugeController;
          break;
        case "led":
          CtlClass = LEDController;
          break;
        case "readout":
          CtlClass = ReadoutController;
          break;
        default:
          throw new TypeError("Industrial component class not recognized!");
      }
      if (!data) {
        $this.data("controller", (data = new CtlClass(this, options)));
      }
      if (typeof option === "number" || typeof option === "boolean" || typeof option === "string") {
        return data.setValue(option);
      }
    });
  };
  return $.fn.industrial.defaults = {
    default_value: true,
    low: 0,
    high: 100,
    tick_scale: false,
    tick_scale_frequency: 1
  };
})(jQuery);