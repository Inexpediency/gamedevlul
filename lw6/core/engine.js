function Engine(selector, width, height) {
  let canvas = document.querySelector(selector || "canvas");
  let ctx = canvas.getContext("2d");

  this.width = width;
  this.height = height;

  canvas.width = this.width || 480;
  canvas.height = this.height || 320;

  this.objects = [];

  this.add = function (object) {
    this.objects.push(object);
  };

  this.render = function () {
    this.clear();
    for (obj of this.objects) {
      if (obj.image) {
        obj.width = obj.image.naturalWidth;
        obj.height = obj.image.naturalHeight;

        ctx.drawImage(obj.image, obj.x, obj.y);
      } else {
        obj.draw(ctx);
      }
    }
  };

  this.clear = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };
}

function Sprite(asset, x, y) {
  this.x = x || 0;
  this.y = y || 0;
  this.width;
  this.height;

  this.image = new Image();
  this.image.src = asset;
}

function Rectangle(x, y, w, h) {
  this.x = x || 0;
  this.y = y || 0;
  this.width = w || 0;
  this.height = h || 0;

  this.draw = function (ctx) {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = "#000000";
    ctx.fill();
    ctx.closePath();
  };
}

function Debug(selector) {
  this.vars = [];

  this.add = function (label, variable) {
    this.vars.push({ name: label, value: variable });
  };

  this.set = function (label, value) {
    for (let variable of this.vars) {
      if (variable.name === label) {
        variable.value = value;
      }
    }
  };

  this.init = function () {
    let debug = document.querySelector(selector);

    if (debug) {
      while (debug.firstChild) {
        debug.removeChild(debug.firstChild);
      }
    }
    for (let variable of this.vars) {
      let line = document.createElement("p");
      line.innerText = variable.name + ": " + JSON.stringify(variable.value);
      debug.appendChild(line);
    }
  };
}

function Keyboard() {
  this.event = function (callback) {
    window.addEventListener("keydown", function (e) {
      this.key = e.key;
      callback && callback("down", e.key);
    });
    window.addEventListener("keyup", function (e) {
      this.key = e.key;
      callback && callback("up", e.key);
    });
  };
}

function Mouse(selector) {
  this.x = 0;
  this.y = 0;

  this.event = function (callback) {
    document
      .querySelector(selector)
      .addEventListener("mousemove", function (e) {
        this.x = e.offsetX;
        this.y = e.offsetY;
        callback && callback(e.offsetX, e.offsetY);
      });
  };

  this.click = function (callback) {
    document.querySelector(selector).addEventListener("click", function (e) {
      callback && callback(e.offsetX, e.offsetY);
    });
  };
}
