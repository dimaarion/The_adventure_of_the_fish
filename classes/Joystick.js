import { procent } from "../action/action";
export default class Joystick {
    xpos; 
    ypos;
    x = 0;
    y = 0;
    w = 0;
    h = 0;
    width = 100;
    height = 100;
    constructor(w,h,width,height){
     this.w = w;
     this.h = h;
     this.width = width
     this.height = height
    }
   
  
  
    _atan2(x,y) {
        this.x = x;
        this.y = y;
        var _PI = Math.PI;
        var RAD_TO_DEG = 180 / _PI; // SHAPE
        const MAX_DEFLECT = 0.3926991;
        this.ypos = _map(mouseYRatio(this.y, this.h), 1, -1, -MAX_DEFLECT, MAX_DEFLECT);
        this.xpos = _map(mouseXRatio(this.x, this.w), -1, 1, -MAX_DEFLECT, MAX_DEFLECT);
      
        function _fromRadians(angle) {
          return angle * RAD_TO_DEG;
        }
       
      
        function constrain(n, low, high) {
          return Math.max(Math.min(n, high), low);
        }
      
        function _map(n, start1, stop1, start2, stop2, withinBounds) {
          var newval = (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
          if (!withinBounds) {
            return newval;
          }
          if (start2 < stop2) {
            return constrain(newval, start2, stop2);
          } else {
            return constrain(newval, stop2, start2);
          }
        }
      
        function mouseXRatio(mouseX, xPosJ) {
          return mouseRatio(mouseX, xPosJ);
        }
      
        function mouseYRatio(mouseY, yPosJ) {
          return -mouseRatio(mouseY, yPosJ);
        }
      
        function mouseRatio(mouse, half) {
          let mouseFromCenter = mouse - half;
          return constrain(mouseFromCenter, -half, half) / half;
        }
      
      
          return _fromRadians(Math.atan2(this.ypos, this.xpos));
      
    
    }

}