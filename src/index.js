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
      const p = (!isNaN(this.p.val()) ? this.p.val() : null);
      const r = (!isNaN(this.r.val()) ? this.r.val() : null);
      const t = (!isNaN(this.t.val()) ? this.t.val() : null);
      const tA = (!isNaN(this.tAmt.val()) ? this.tAmt.val() : null);
      const rpa = (this.rateCheck(r, this.ci, this.tAmt, this.rErr)) ? this.rateCheck(r, this.ci, this.tAmt, this.rErr) : null;
      const n = (this.interestCompounded(this.ic)) ? this.interestCompounded(this.ic) : null;
      switch (this.calcTyp.val()) {
        case ('Compound Interest'):
        this.calcCI(p, rpa, t, n, this.ci, this.tAmt);
        break;
        case ('Principal'):
        this.calcP(this.p, rpa, t, n, this.ci, tA, this.tAmt);
        break;
        case ('Rate'):
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
        case ('Annually'):
        return 1;
        break;
        case ('Semi-Annually'):
        return 2;
        break;
        case ('Quarterly'):
        return 4;
        break;
        case ('Bi-Monthly'):
        return 6;
        break;
        case ('Monthly'):
        return 12;
        break;
        case ('Semi-Monthly'):
        return 24;
        break;
        case ('Bi-Weekly'):
        return 36;
        break;
        case ('Weekly'):
        return 54;
        break;
        case ('Daily'):
        return 360;
        break;
        case ('Daily(365)'):
        return 365;
        break;
        case (''):
        default:
        return false;
        break;
      }
    },

    calcCI: function(p, rpa, t, n, ci, tAmt) {
      // The equation is A = p * [[1 + (r/n)] ^ nt]
      const A = (p * Math.pow((1 + (rpa/100/(n))), (n*t)));
      const c = A; 
      const e = c-p*100/100; //turned into a decimal by dividing by 100
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
      const P = (tA / Math.pow((1 + (rpa/100/(n))), (n*t)));
      const e = tA-P*100/100; //turned into a decimal by dividing by 100
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
      const x = (Math.pow((tA/p), (1/(n*t)))-1);
      const y = x*100;
      const c = y.toFixed(1);
      const e = tA-p;
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
  const ic = $('#ic'); // Interest Compounded
  const ci = $('#cInterest'); // Compound Interest
  const rErr = $('#rateErr');
  const tAmt = $('#totalAmt');
  const calcTyp = $('#calcTyp'); // Calculation type
  const helpId = $('#enterAllFields');

  calc.setCalcProperties(p, r, t, ic, ci, tAmt, rErr, calcTyp);
  calc.calcDiff();

  function validateList(id) {
    id.keyup(function (event) {
      calc.calcDiff();
      event = (event) ? event : window.event;
      let charCode = (event.which) ? event.which : event.keyCode;
      let val = $(this).val();
      if(val.split('.').length>2 && charCode === 190) {
        $(this).val('');
      } 
    });
  }

  function isListEmpty(id) {
    id.keyup(function (event) {
      calc.calcDiff();
      let val = $(this).val().replace(/[^\d.]/g,'');
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
  
  isListEmpty($('input[type="text"]'));
  validateList(p);
  validateList(r);

  function editStyleSetup(el,val1,val2,val3,val4) {
    el.css({
      'border-width': val1,
      'border-color': val2,
      'background-color': val3,
    }).prop('disabled', val4);
  }

  function styleSetup(id, obj) {
    id.change(function () {
      calc.calcDiff();
      let val = $(this).val();
      obj.forEach(function (item, index) {
        if(val === 'Compound Interest') {
          if(index === 1) {
            return editStyleSetup(item,'1px','#FF6347','#B0C4DE',true);
          } else if(index === 2) {
            return editStyleSetup(item,'1px','#FF6347','#F0F0E7',true);
          } else {
            return editStyleSetup(item,'1px','#ccc','#F0F0E7',false);
          }
        } else if(val === 'Principal') {
          if(index === 0) {
            return editStyleSetup(item,'1px','#FF6347','#B0C4DE',true);
          } else if(index === 1) {
            return editStyleSetup(item,'1px','#FF6347','#B0C4DE',true);
          } else {
            return editStyleSetup(item,'1px','#ccc','#F0F0E7',false);
          }
        } else if(val === 'Rate') {
          if(index === 3) {
            return editStyleSetup(item,'1px','#FF6347','#B0C4DE',true);
          } else if(index === 1) {
            return editStyleSetup(item,'1px','#FF6347','#B0C4DE',true);
          } else {
            return editStyleSetup(item,'1px','#ccc','#F0F0E7',false);
          }
        }
      });
    });
  }

  styleSetup(calcTyp, [p,ci,tAmt,r]);

  function calcIc(id) {
    id.change(function () {
      calc.calcDiff();
    });
  }

  calcIc(ic);

  function setup(id,val0,val1) {
    $(id).focus(function () {
      $(this).css('background-color', val0);
    }).blur(function () {
      $(this).css('background-color', val1);
    });
  }

  setup(p,'#E0FFFF','#F0F0E7');
  setup(t,'#E0FFFF','#F0F0E7');
  setup(ci,'#E0FFFF','#F0F0E7');
  setup(r,'#B0C4DE','#F0F0E7');
  setup($('select[class="form-control"]'),'#FFF','#F0F0E7');

  function calcOnClick(id) {
    id.click(function () {
      calc.calcDiff();
    });
  }

  calcOnClick($('#calc-btn'));

  function resetOnClick(id, el, ct) {
    id.click(function () {
      el.forEach(function (item, index) {
        item.val('');
        if(index === 3) {
          return editStyleSetup(item,'1px','#FF6347','#B0C4DE',true);
        } else if(index === 0) {
          return setup(item, '#E0FFFF','#F0F0E7');
        } else if(index === 1) {
          return setup(item, '#E0FFFF','#F0F0E7');
        }
      });

      if(ct.val() === 'Compound Interest') {
        return editStyleSetup(el[4],'1px','#FF6347','#F0F0E7',true);
      } else {
        return editStyleSetup(el[4],'1px','#ccc','#F0F0E7',false);
      }

    });
  }

  resetOnClick($('#rst-btn'), [p,r,t,ci,tAmt], calcTyp);

  $('.fa-bars').click(function () {

    let currentClass = $('.sub-nav nav');

    if (currentClass.hasClass('not-active')) {
      $(currentClass).removeClass('not-active').addClass('active');
    } else {
      $(currentClass).removeClass('active').addClass('not-active');
    }

  });

  // Create the state-indicator element
  var indicator = document.createElement('div');
  indicator.className = 'state-indicator';
  document.body.appendChild(indicator);

  // Create a method which returns device state
  function getDeviceState() {
    var index = parseInt(window.getComputedStyle(indicator).getPropertyValue('z-index'), 10);

    var states = {
      3: 'small-desktop',
      4: 'tablet',
      5: 'phone'
    };

    return states[index] || 'desktop';
  }
  
  var state = getDeviceState();
  var srchInput = $('.i-group');
  if(srchInput.hasClass('col-xs-offset-2')) {
    $(srchInput).removeClass('col-xs-offset-2').addClass('col-xs-offset-5');
  } else if (state === 'phone' && srchInput.hasClass('col-xs-offset-5')) {
    $(srchInput).removeClass('col-xs-offset-5').addClass('col-xs-offset-2');
  }

  window.addEventListener('resize', function() {
    let state = getDeviceState();
    if(state === 'desktop') {
      $('.navbar-top .nav-brand-wrapper').addClass('container');
      $('.navbar-top .sub-nav-wrapper').addClass('container');
    } else if(state === 'small-desktop') {
      $('.navbar-top .nav-brand-wrapper').removeClass('container');
      $('.navbar-top .sub-nav-wrapper').removeClass('container');
    } else if (state === 'phone') {
      $(srchInput).removeClass('col-xs-offset-5').addClass('col-xs-offset-2');
    } else if (state === 'tablet' && srchInput.hasClass('col-xs-offset-2')) {
      $(srchInput).removeClass('col-xs-offset-2').addClass('col-xs-offset-5');
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
    var e = window
    , a = 'inner';
    if ( !( 'innerWidth' in window ) ) {
      a = 'client';
      e = document.documentElement || document.body;
    }
    return { width : e[ a+'Width' ] , height : e[ a+'Height' ] }
  }
  */
});






