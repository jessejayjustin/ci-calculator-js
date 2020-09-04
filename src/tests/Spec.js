/*
import calc from '../main';

describe("Spies", function() { // suite is a group of test cases
    it("should spy on setCalcProperties", function() { // spec represents a test case inside the test suite
      var spy = spyOn(calc, 'setCalcProperties');
      calc.setCalcProperties();
      expect(spy).toHaveBeenCalled(); // an assertion that can be either true or false
    });
    
    //Spec for setCalcProperties operation
    it("should be able to return string and number", function() {
    	var spy = spyOn(calc, 'setCalcProperties').and.callFake(function(str, num) {
        if(typeof str === 'string' && typeof num === 'number')
        {
          return true;
        }
        else if(!typeof str === 'string' && !typeof num === 'number')
        {
          throw new Error('given parameters is not of its type');
        }
      });
      expect(calc.setCalcProperties('sum', 15)).toEqual(true);
    });

    //Spec for setCalcProperties operation for return error
    it("should be able to throw error in setCalcProperties operation if string and number is not of its type", function() {
      var spy = spyOn(calc, 'setCalcProperties').and.callFake(function(str, num) {
        if(typeof str === 'string' && typeof num === 'number')
        {
          return true;
        }
        else 
        {
          throw new Error('Given parameters is not of its type');
        }
      });
      expect(function() {
        calc.setCalcProperties(15,'sum');
      }).toThrowError(Error);
    });
    
    //Spec for calcDiff operation
    it("should spy on calcDiff", function() { 
      var spy = spyOn(calc, 'calcDiff');
      calc.calcDiff();
      expect(spy).toHaveBeenCalled(); 
    });

    //Spec for calcDiff operation
    it("should spy on calcDiff fake", function() {
    	var spy = spyOn(calc, 'calcDiff').and.callFake(function() {
       return 3000;
      });
      expect(calc.calcDiff()).toEqual(3000);
    });
    
    //Spec for rateCheck operation
    it("should spy on checkRate", function() {
    	var spy = spyOn(calc, 'checkRate')
      calc.checkRate();
      expect(spy).toHaveBeenCalled(); 
    });

    //Spec for rateCheck operation
    it("should be able to return number greater than 0 less than 100", function() {
      var spy = spyOn(calc, 'checkRate').and.callFake(function(r) {
        if(r >= 0 && r <= 100)
        {
          return rate;
        }
        else 
        {
          throw new Error('Enter Rate of interest up to 100(%)');
        }
      });
      expect(calc.checkRate(6)).toEqual(6);
    });

    //Spec for checkRate operation
    it("should be able to throw error in checkRate operation if given number is less than 0 greater than 100", function() {
      expect(function() {
        calc.checkRate(-1);
      }).toThrowError(Error);
    });
    
    //Spec for interest Compounded operation
    it("should spy on intCmpd", function() { 
      var spy = spyOn(calc, 'intCmpd');
      calc.intCmpd();
      expect(spy).toHaveBeenCalled(); 
    });

    //Spec for interestCompounded operation
    it("should be able to return value", function() {
      var spy = spyOn(calc, 'intCmpd').and.callFake(function(num) {
        return num;
      });
      expect(calc.intCmpd(1)).toEqual(1);
    });

    //Spec for calcCI operation
    it("should spy on calcCmpdInt", function() { 
      var spy = spyOn(calc, 'calcCmpdInt');
      calc.calcCmpdInt();
      expect(spy).toHaveBeenCalled(); 
    });

    //Spec for calcCI operation
    it("should be able to calculate compound interest and return it's value", function() {
      var spy = spyOn(calc, 'calcCmpdInt').and.callFake(function(p, r, t, n) {
        let A = (p * Math.pow((1 + (r/100/(n))), (n*t)));
        let e = A-p*100/100; 
        return e.toFixed(2);
      });
      expect(calc.calcCmpdInt(5000, 6, 5, 1)).toEqual('1691.13');
    });

    //Spec for calcP operation
    it("should spy on calcPrincipal", function() { 
      var spy = spyOn(calc, 'calcPrincipal');
      calc.calcPrincipal();
      expect(spy).toHaveBeenCalled(); 
    });

    //Spec for calcCI operation
    it("should be able to calculate principal amount and return it's value", function() {
      var spy = spyOn(calc, 'calcPrincipal').and.callFake(function(r, t, n, tA) {
        let P = (tA / Math.pow((1 + (r/100/(n))), (n*t)));
        return P.toFixed(2);
      });
      expect(calc.calcPrincipal(6, 5, 1, 6691.13)).toEqual('5000.00');
    });

    //Spec for calcP operation
    it("should spy on calcR", function() { 
      var spy = spyOn(calc, 'calcR');
      calc.calcRate();
      expect(spy).toHaveBeenCalled(); 
    });

    //Spec for calcCI operation
    it("should be able to calculate rate of interest and return it's value", function() {
      var spy = spyOn(calc, 'calcRate').and.callFake(function(p, t, n, tA) {
        let x = (Math.pow((tA/p), (1/(n*t)))-1);
        let y = x*100;
        let c = y.toFixed(1);
        if(c.length === 3) {
          return c;
        }
      });
      expect(calc.calcRate(5000, 5, 1, 6691.13)).toEqual('6.0');
    });
});
*/

