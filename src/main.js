var calc = {

	sum: document.querySelector('input[name="2"]'), // Sum or Principal
	rate: document.querySelector('input[name="3"]'), // % Rate per annum
	years: document.querySelector('input[name="4"]'), // Time Span in years
	iCmpd: document.getElementById('intCmpd'), // Interest Compounded
	cmpdInt: document.querySelector('input[name="1"]'), // Compound Interest
	tAmt: document.querySelector('input[name="5"]'),
	errMsg: document.getElementById('rErrMsg'),
	calcTyp: document.getElementById('calcTyp'), // Calculation type
	helpId: document.getElementById('enterAllFields'),
 
	calcDiff: function() {
		let p = !isNaN(this.sum.value) ? this.sum.value : false;
		let r = !isNaN(this.rate.value) ? this.rate.value : false;
		let t = !isNaN(this.years.value) ? this.years.value : false;
		let tA = !isNaN(this.tAmt.value) ? this.tAmt.value : false;
		let rpa = (this.checkRate(r)) ? this.checkRate(r) : false;
		let n = (this.intCmpd(this.iCmpd)) ? this.intCmpd(this.iCmpd) : false;
		switch (this.calcTyp.value) {
			case ('1'):
			this.calcCmpdInt(p, rpa, t, n);
			break;
			case ('2'):
			this.calcPrincipal(rpa, t, n, tA);
			break;
			case ('3'):
			this.calcRate(p, t, n, tA);
			break;
			default:
			return false;
			break;
		}
	},

	checkRate: function(r, rErr) {
		if(r >= 0 && r <= 100) {
			if(this.errMsg != null) {
				while (this.errMsg.childNodes[0]) {
			        this.errMsg.removeChild(this.errMsg.childNodes[0]);
			    }
		    }
			return r;
		} else {
			if(this.errMsg != null) {
		      // We need to show a warning
		      // Remove any warnings that may exist
			    while (this.errMsg.childNodes[0]) {
			        this.errMsg.removeChild(this.errMsg.childNodes[0]);
			    }
		    }
		    if(this.helpId != null) {
			    while (this.helpId.childNodes[0]) {
			        this.helpId.removeChild(this.helpId.childNodes[0]);
			    }
		    }
		   	this.errMsg.appendChild(document.createTextNode('Enter Rate of interest up to 100(%)'));
			this.cmpdInt.value="";
			this.tAmt.value="";
			return false;
		} 
	},

	intCmpd: function(iCmpd) {
		switch (iCmpd.value) {
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

	calcCmpdInt: function(p, rpa, t, n) {
	    // The equation is A = p * [[1 + (r/n)] ^ nt]
	    let A = (p * Math.pow((1 + (rpa/100/(n))), (n*t)));
	    let c = A; 
	    let e = c-p*100/100; //turned into a decimal by dividing by 100
	    if(e && c) {
	      this.cmpdInt.value = e.toFixed(2);
	      this.tAmt.value = c.toFixed(2);
	    }
    },

    calcPrincipal: function(rpa, t, n, tA) {
	    // The equation is P = A / (1 + (r/n)) ^ nt]
	    if(!rpa && !t) {
	      	this.tAmt.value="";
	    }
	    let P = (tA / Math.pow((1 + (rpa/100/(n))), (n*t)));
	    let e = tA-P*100/100; //turned into a decimal by dividing by 100
	    if(P && e) {
	      this.sum.value = P.toFixed(2);
	      this.cmpdInt.value = e.toFixed(2);
	    }
    },

    calcRate: function(p, t, n, tA) {
	    // The equation is r = n[(A/P)] ^ 1/nt - 1]
	    if(!p && !t) {
	      	this.tAmt.value="";
	    }
	    let x = (Math.pow((tA/p), (1/(n*t)))-1);
	    let y = x*100;
	    let c = y.toFixed(1);
	    let e = tA-p;
	    if(isNaN(c)) {
	      this.rate.value="";
	      this.cmpdInt.value="";
	    } else if(c.length === 3) {
	      this.rate.value = c;
	      this.cmpdInt.value = e;
	    }
    }
}

calc.calcDiff();

var inputElems = document.querySelectorAll('input[type="text"]');
/*
var pos = Array.from(inputElems).reduce(function(acc,curr) {
},[]);
*/
var elems = Array.from(inputElems);
var helpId = document.getElementById('enterAllFields');
var errMsg = document.getElementById('rErrMsg');
function applyValidation(el, arrIndex) {
	arrIndex.map(i => 
        el[i].addEventListener('keyup', function(event) {
		   var val = this.value.replace(/[^\d.]/g, ''); 
		   this.value = val;
		    if(val === '') {
		   	    if(helpId != null) {
				    while (helpId.childNodes[0]) {
				       helpId.removeChild(helpId.childNodes[0]);
				    }
			    }
	   	        helpId.appendChild(document.createTextNode('Enter all the fields'));
	        } else {
	    	    if(helpId != null) {
			        while (helpId.childNodes[0]) {
			          helpId.removeChild(helpId.childNodes[0]);
			        }
	            } 
	        }

	        if(event) {
	        	event = (event) ? event : window.event;
	            var charCode = (event.which) ? event.which : event.keyCode;
	            var val = event.target.value;
	            if(val.split('.').length>2 && charCode === 190) {
	                event.target.value="";
	            } 
	        } 
	    })
    )
}

applyValidation(elems, [0,1,4]);

function setStyle(elem, propertyObject) {
 for (var property in propertyObject)
    elem.style[property] = propertyObject[property];
}

Array.from(inputElems).map(function(el) {
    el.onkeyup = function() {
	   calc.calcDiff();
	};
});

var calcType = document.getElementById('calcTyp');
var el = inputElems;
calcType.onchange = function() {
	var v = this.value
    for (var i = 0; i < el.length; i++) {
	  var a = el[i].attributes;
	  if(v == a[0].value) {
	  	setStyle(el[i], {'borderColor':'#FF6347',
	    'backgroundColor':'rgb(187, 199, 221)'});
        el[i].disabled = true;
        el[3].style.borderColor = '#FF6347';
        el[3].disabled = true;
	  } else if(v == 1) {
	    el[i].style = "";
	    el[i].disabled = false;
        el[4].style.borderColor = '#FF6347';
        el[4].disabled = true;
	  } else {
	  	el[i].style = "";
	  	el[i].disabled = false;
	  	el[3].style.borderColor = '#FF6347';
        el[3].disabled = true;
	  }
	};
}

el[4].style.borderColor = '#FF6347';
el[4].disabled = true;

var r = document.getElementById('buttonReset');
r.classList ? r.classList.add('buttonResetStartBd') : r.className += ' buttonResetStartBd'; 

r.onfocus = function() {
    if(r.classList) {
        r.classList.remove('buttonResetStartBd');
        r.classList.add('buttonResetNewBd');
	} else {
		r.className =  r.className.replace(" buttonResetStartBd", " buttonResetNewBd");
	}
};

r.onblur = function() {
    if(r.classList) {
        r.classList.remove('buttonResetNewBd');
        r.classList.add('buttonResetStartBd');
	} else {
		r.className =  r.className.replace(" buttonResetNewBd", " buttonResetStartBd");
	}
};

var c = document.getElementById('calcButton');
c.classList ? c.classList.add('calcButtonStartBd') : c.className += ' calcButtonStartBd'; 

c.onfocus = function() {
    if(c.classList) {
        c.classList.remove('calcButtonStartBd');
        c.classList.add('calcButtonNewBd');
	} else {
		c.className =  r.className.replace(" calcButtonStartBd", " calcButtonNewBd");
	}
};

c.onblur = function() {
    if(c.classList) {
        c.classList.remove('calcButtonNewBd');
        c.classList.add('calcButtonStartBd');
	} else {
		c.className =  r.className.replace(" calcButtonNewBd", " calcButtonStartBd");
	}
};

r.onclick = function() {
	for (var i = 0; i < el.length; i++) {
		el[i].value = "";
		setStyle(el[i], {'borderTop':'#ccc 1px solid',
	    'borderLeft':'#ccc 1px solid','borderBottom':'#b2aca5 1px solid','borderRight':'#b2aca5 1px solid','backgroundColor':'#F0F0E7'});
	    el[i].disabled = false;
	    setStyle(el[3], {'borderColor':'#FF6347',
	    'backgroundColor':'rgb(187, 199, 221)'});
		el[3].disabled = true;
		setStyle(el[4], {'borderColor':'#FF6347',
	    'backgroundColor':'#F0F0E7'});
		el[4].disabled = true;
		if(helpId != null) {
			while (helpId.childNodes[0]) {
			    helpId.removeChild(helpId.childNodes[0]);
			}
		}
		if(errMsg != null) {
		    while (errMsg.childNodes[0]) {
	          errMsg.removeChild(errMsg.childNodes[0]);
	        }
	    }
	}
};

c.onclick = function() {
    for(var i = 0; i < el.length; i++) {
	    if(el[i].value == "") {
		 	if(helpId != null) {
			    while (helpId.childNodes[0]) {
			       helpId.removeChild(helpId.childNodes[0]);
			    }
			}
		    if(errMsg != null) {
			    while (errMsg.childNodes[0]) {
		           errMsg.removeChild(errMsg.childNodes[0]);
		        }
		    }
		   	helpId.appendChild(document.createTextNode('Enter all the fields'));
		} else {
			if(helpId != null) {
			    while (helpId.childNodes[0]) {
			        helpId.removeChild(helpId.childNodes[0]);
			    }
	        }
			calc.calcDiff();
		}
    }
};

var intCmpd = document.getElementById('intCmpd');

intCmpd.onchange = function() {
   calc.calcDiff();
};

el[3].onkeyup = function() {
   if(/[\s\S]/g.test(this.value)) {
    this.value="";
   }
};

// Create the state-indicator element
let indicator = document.createElement('div');
indicator.className = 'state-indicator';
document.body.appendChild(indicator);

// Create a method which returns device state
function getDeviceState() {
  	let index = parseInt(window.getComputedStyle(indicator).getPropertyValue('z-index'), 10);

  	let states = {
  		1: 'desktop',
  		3: 'small-desktop',
  		4: 'tablet',
  		5: 'phone'
  	};

  	return states[index];
}

var paragraph = document.getElementById("title-paragraph");
var mobileParagraphText = document.getElementById("mobileTitleParagraph");
var text = document.createTextNode("Compound Interest (CI) is the addition of Interest to the Initial principal value and also the accumulated interest of previous periods of a loan or any deposit. Use this compound interest calculator to calculate C.I for the number of times that interest is compounded per unit.");
var none = document.createTextNode("");
window.addEventListener('load', function() {
  	let state = getDeviceState();
  	if(state === 'desktop') {
        if(!paragraph.childNodes[0]) {
		    paragraph.appendChild(text);
        }
  	} else if(state === 'phone') {
        if(!mobileParagraphText.childNodes[0]) {
		    mobileParagraphText.appendChild(text);
        }
  	}
});

window.addEventListener('resize', function() {
  	let state = getDeviceState();
  	if(state === 'desktop') {
        mobileParagraphText.appendChild(none);
		paragraph.appendChild(text);
  	} else if(state === 'phone') {
        paragraph.appendChild(none);
        mobileParagraphText.style.display = 'block';
        if(!mobileParagraphText.childNodes[0]) {
		    mobileParagraphText.appendChild(text);
        }
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

export default calc;









