(function() {
  var block, drawblock, w, posi, browsr, colour, startx, starty, drawing,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  
  w = window;
  colour = 'none';
  posi = ['ms', 'moz', 'webkit', 'o'];
  startx = 0;
  starty = 0;
  drawing = false;
  
  attachKeypress();
  
  for (var i = 0, blength = posi.length; i < blength; i++) {
    browsr = posi[i];
  }
  
  w.findClickPos = function(e) {
    var x1, y1;
	x1 = 0;
	y1 = 0;
	if (!e) e = window.event;
	if (e.pageX || e.pageY) {
      posx = e.pageX;
      posy = e.pageY;
    } else if (e.clientX || e.clientY) {
      posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
      posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
	return {
      x: posx,
      y: posy
    };
  };
  
  w.getOffset = function(el) {
    var body, x, y;
    body = document.getElementsByTagName("body")[0];
    x = 0;
    y = 0;
    while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
      x += el.offsetLeft - el.scrollLeft;
      y += el.offsetTop - el.scrollTop;
      el = el.offsetParent;
    }
    return {
      top: y + body.scrollTop,
      left: x + body.scrollLeft
    };
  };
  
  block = (function() {
	
    function block(sx1, sy1) {
	  this.pos = {
        x: sx1,
        y: sy1
      };
	  this.body = document.getElementsByTagName("body")[0];
	  if (colour != 'none') {
	    this.make();
	  }
	}
	
	block.prototype.make = function() {
	  var width, height, revwidth, revheight;
	  width = this.pos.x - startx;
	  height = this.pos.y - starty;
	  revwidth = 0;
	  revheight = 0;
	  if (width < 0) { width = width * -1; revwidth = width; }
	  if (height < 0) { height = height * -1; revheight = height; }
	  this.block = document.createElement("div");
      this.body.appendChild(this.block);
	  this.block.style['width'] = "" + width + "px";
      this.block.style['height'] = "" + height + "px";
	  this.block.style['display'] = 'block'; //not block
	  
      this.block.style['background'] = colour;
      this.block.style['position'] = 'absolute';
	  this.block.style['top'] = "" + (starty - revheight) + "px";
      this.block.style['left'] = "" + (startx - revwidth) + "px";
      this.block.style['WebkitUserSelect'] = 'none';
	};
	block.prototype.remove = function() {
	  if (this.block) {
	    this.block.style['width'] = 0;
	    this.block.style['height'] = 0;
	  }
    };
	return block;
	
  })();
  
  this.block = block;
  
  drawblock = (function() {
    
	function drawblock() {
	  this.dropblock = __bind(this.dropblock, this);
	  var ref2, ref1, ref3, thisdraw = this;
	  
	  this.blocks = [];
	  this.stayblocks = [];
	  this.body = document.getElementsByTagName("body")[0];
	  
	  if ((ref1 = this.body) != null) {
        ref1.onmousedown = function(event) {
		  if (colour != 'none') {
		    var pos;
		    pos = window.findClickPos(event);
		    startx = pos.x;
		    starty = pos.y;
		    drawing = true;
		  }
		  //return false;
		};
      }
	  
	  if ((ref2 = this.body) != null) {
        ref2.onmousemove = function(event) {
		  //if (drawing) { //&& colour != "none") //may sort out invisi draw
		  if (drawing && colour != 'none') {
			removeold(thisdraw.blocks);
			return thisdraw.dropblock(event, false);
		  }
		};
      }
	  
	  if ((ref3 = this.body) != null) {
        ref3.onmouseup = function(event) {
		  drawing = false;
		  thisdraw.dropblock(event, true);
		  colour = 'none';
		};
      }
	}
	
	drawblock.prototype.dropblock = function(event, stay) {
      var pos;
      pos = window.findClickPos(event);
	  if (stay)
      this.stayblocks.push(new block(pos.x, pos.y));
      else this.blocks.push(new block(pos.x, pos.y));
    };
	
	return drawblock;
	
  })();
  
  new drawblock();
  
  //detecting the key pressed to define the block colour
  function attachKeypress() {
    var body = document.body;
	var evt;
	evt = window.event;
    if (body.addEventListener) {
	  body.addEventListener("keydown", handleKeyDown, false);
      body.addEventListener("keyup", handleKeyUp, false);
	}
  }
  function handleKeyDown(evt) {
    if (evt.keyCode == 87) colour = '#FFF'; //w for white
    if (evt.keyCode == 71) colour = '#666'; //g for grey
    if (evt.keyCode == 66) colour = '#000'; //b for black
  }
  
  function handleKeyUp() { if (!drawing) colour = 'none'; }
  
  function removeold(array) {
    for (var a = 0; a < array.length; a++) {
	  array[a].remove();
	}
  }
  
}).call(this);




