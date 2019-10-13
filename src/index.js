import 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

$("document").ready(function() {

  var calc = {

    setCalcProperties: function(p, r, t, ic, ci, tAmt, rErr, calcTyp) {
      this.p = p;
      this.r = r;
      this.t = t;
      this.ic = ic;
      this.ci = ci;
      this.tAmt = tAmt;
      this.rErr = rErr;
      this.calcTyp = calcTyp;
    },

    calcDiff: function() {
      let p = (!isNaN(this.p.val()) ? this.p.val() : null);
      let r = (!isNaN(this.r.val()) ? this.r.val() : null);
      let t = (!isNaN(this.t.val()) ? this.t.val() : null);
      let tA = (!isNaN(this.tAmt.val()) ? this.tAmt.val() : null);
      let rpa = (this.rateCheck(r, this.ci, this.tAmt, this.rErr)) ? this.rateCheck(r, this.ci, this.tAmt, this.rErr) : null;
      let n = (this.interestCompounded(this.ic)) ? this.interestCompounded(this.ic) : null;
      switch (this.calcTyp.val()) {
        case ('1'):
        this.calcCI(p, rpa, t, n, this.ci, this.tAmt);
        break;
        case ('2'):
        this.calcP(this.p, rpa, t, n, this.ci, tA, this.tAmt);
        break;
        case ('3'):
        this.calcR(p, this.r, t, n, this.ci, tA, this.tAmt);
        break;
        default:
        return false;
        break;
      }
    },

    rateCheck: function(r, ci, tAmt, rErr) {
      if(r >= 0 && r <= 100) {
        rErr.html('');
        return r;
      } else {
        rErr.html('Enter Rate of interest up to 100(%)');
        ci.val('');
        tAmt.val('');
        return false;
      } 
    },

    interestCompounded: function(ic) {
      switch (ic.val()) {
        case ('1'):
        return 1;
        break;
        case ('2'):
        return 2;
        break;
        case ('4'):
        return 4;
        break;
        case ('6'):
        return 6;
        break;
        case ('12'):
        return 12;
        break;
        case ('24'):
        return 24;
        break;
        case ('36'):
        return 36;
        break;
        case ('54'):
        return 54;
        break;
        case ('360'):
        return 360;
        break;
        case ('365'):
        return 365;
        default:
        return false;
        break;
      }
    },

    calcCI: function(p, rpa, t, n, ci, tAmt) {
      // The equation is A = p * [[1 + (r/n)] ^ nt]
      let A = (p * Math.pow((1 + (rpa/100/(n))), (n*t)));
      let c = A; 
      let e = c-p*100/100; //turned into a decimal by dividing by 100
      if(e && c) {
       ci.val(e.toFixed(2));
       tAmt.val(c.toFixed(2));
     }
   },

   calcP: function(p, rpa, t, n, ci, tA, tAmt) {
      // The equation is P = A / (1 + (r/n)) ^ nt]
      if(!rpa && !t) {
        tAmt.val('');
      }
      let P = (tA / Math.pow((1 + (rpa/100/(n))), (n*t)));
      let e = tA-P*100/100; //turned into a decimal by dividing by 100
      if(P && e) {
       p.val(P.toFixed(2));
       ci.val(e.toFixed(2));
     }
   },

   calcR: function(p, r, t, n, ci, tA, tAmt) {
      // The equation is r = n[(A/P)] ^ 1/nt - 1]
      if(!p && !t) {
        tAmt.val('');
      }
      let x = (Math.pow((tA/p), (1/(n*t)))-1);
      let y = x*100;
      let c = y.toFixed(1);
      let e = tA-p;
      if(isNaN(c)) {
        r.val('');
        ci.val('');
      } else if(c.length === 3) {
        r.val(c);
        ci.val(e);
      }
    }
  }

  const p = $('#sum'); // Principal or Sum of amount
  const r = $('#rate'); // % Rate per annum
  const t = $('#years'); // Time Span in years
  const ic = $('#intCmpnd'); // Interest Compounded
  const ci = $('#cmpndInt'); // Compound Interest
  const rErr = $('#rateErr');
  const tAmt = $('#totalAmt');
  const calcTyp = $('#calcTyp'); // Calculation type
  const helpId = $('#enterAllFields');
  const _input = $('input[type="text"]');
  const selectList = $('select[class="form-control"]');

  calc.setCalcProperties(p, r, t, ic, ci, tAmt, rErr, calcTyp);
  calc.calcDiff();

  let validateList = function(id) {
    id.keyup(function (event) {
      event = (event) ? event : window.event;
      var charCode = (event.which) ? event.which : event.keyCode;
      var val = $(this).val();
      if (!(/\d+(\.\d+)?/.test(val))){
        $(this).val('');
      } else if(val.split('.').length>2 && charCode === 190) {
        $(this).val('');
      } 
    });
  }

  let isListEmpty = function(id) {
    id.keyup(function (event) {
      calc.calcDiff();
      var val = $(this).val().replace(/[^\d.]/g, '');
      $(this).val(val);
      if(val === '') {
        helpId.html('Enter all the fields');
        if($('#rateErr:contains("Enter Rate of interest up to 100(%)")').length > 0) {
          helpId.html('');
        }
      } else {
        helpId.html('');
      }
    });
  }

  validateList(p);
  validateList(r);
  isListEmpty(_input);

  const inputList = [p,r,t,ci,tAmt];
 
  let editInputStyle = function(el) {
    return el.css({
      'border-width': this.bW,
      'border-color': this.bordC,
      'background-color': this.bckgrndC,
    }).prop('disabled', this.dsbld);
  }

  let styleObj0 = {
    bW: '1px',
    bordC: '#FF6347',
    bckgrndC: '#B0C4DE',
    dsbld: true
  }

  let styleObj1 = {
    bW: '1px',
    bordC: '#ccc',
    bckgrndC: '#F0F0E7',
    dsbld: false
  }

  let defBordC = function(id, bc0, bc1) {
    $(id).focus(function () {
      $(id).css('border-color', bc0);
    }).blur(function () {
      $(id).css('border-color', bc1);
    });
  }

  inputList.forEach(function (item,i) {
    calcTyp.change(function () {
      if(calcTyp.val() == $(item).attr("name")) 
      {
        editInputStyle.call(styleObj0, item);
      }
      else if(calcTyp.val() == 1 && i == 4) 
      {
        item.addClass('dS').prop('disabled',true);
      }
      else if(calcTyp.val() == 2 && i == 3) 
      {
        item.addClass('dS').prop('disabled',true);
        item.removeClass('ciSoR');
      }
      else if(calcTyp.val() == 3 && i == 3) 
      {
        item.addClass('dS').prop('disabled',true);
        defBordC(item, '#66afe9', '#ccc');
        item.removeClass('ciSoR');
      }
      else 
      {
        editInputStyle.call(styleObj1, item);
        item.removeClass('dS');
      }
    });
  });

  var calclte = function(id) {
    id.change(function () {
      calc.calcDiff();
    });
  }

  calclte(ic);
  calclte(calcTyp);

  let toggleElmStyle = function(id, focus, blur) {
    $(id).focus(function () {
      $(this).css('background-color', focus);
    }).blur(function () {
      $(this).css('background-color', blur);
    });
  }

  inputList.forEach(function (item,i) {
    if(i == 1) {
      toggleElmStyle(item, '#B0C4DE', '#F0F0E7');
    } 
    else 
    {
      toggleElmStyle(item, '#E0FFFF', '#F0F0E7');
      toggleElmStyle(selectList, '#FFFFFF', '#F0F0E7');
    }
  });

  let _calc = function(id) {
    id.click(function () {
      calc.calcDiff();
    });
  }

  _calc($('#calc-btn'));


  $('#btn-r').click(function () {
    inputList.forEach(function (item, i) {
      item.val('');
      editInputStyle.call(styleObj1, item);
      if(i == 3)
      {
        item.addClass('ciSoR').prop('disabled',true);
      } 
      else if(i == 1)
      {
        toggleElmStyle(item, '#E0FFFF', '#F0F0E7');
      }
      else if(i == 4) 
      {
        item.addClass('dS').prop('disabled',true);
      }
      defBordC(item, '#66afe9', '#ccc');
    });
  }); 
  
  $('.fa-bars').click(function () {
    var currentClass = $('.sub-nav nav');
    if (currentClass.hasClass('not-active')) 
    {
      $(currentClass).removeClass('not-active').addClass('active');
    } 
    else 
    {
      $(currentClass).removeClass('active').addClass('not-active');
    }
  });

  // Create the state-indicator element
  let indicator = document.createElement('div');
  indicator.className = 'state-indicator';
  document.body.appendChild(indicator);

  // Create a method which returns device state
  function getDeviceState() {
    let index = parseInt(window.getComputedStyle(indicator).getPropertyValue('z-index'), 10);

    let states = {
      3: 'small-desktop',
      4: 'tablet',
      5: 'phone'
    };

    return states[index] || 'desktop';
  }
  
  window.addEventListener('resize', function() {
    let state = getDeviceState();
    if(state === 'desktop') 
    {
      $('.navbar-top .nav-brand-wrapper').addClass('container');
      $('.navbar-top .sub-nav-wrapper').addClass('container');
    } 
    else if(state === 'small-desktop') 
    {
      $('.navbar-top .nav-brand-wrapper').removeClass('container');
      $('.navbar-top .sub-nav-wrapper').removeClass('container');
    }
  });

  /*
  $(window).scroll(function() {
    if ($(document).scrollTop() > 50) {
      $('nav').addClass('class_nav');
    } else {
      $('nav').removeClass('class_nav');
    }
  });

  function viewport() {
    var e = window, a = 'inner';
    if (!('innerWidth' in window )) {
      a = 'client';
      e = document.documentElement || document.body;
    }
    return { width : e[ a+'Width' ] , height : e[ a+'Height' ] }
  }
  */
});






