window.onload = function () {
  function Machine(info) {
    this.state = "stopped";
    this.time = 2000;
    this.info = info;

    let timer;
    let interval;

    let self = this;

    function onReady() {
      clearInterval(interval);
      clearTimeout(timer);
      this.info.innerHTML += "Готово!";
      self.state = "stopped";
      this.info.innerHTML += self.state;
    }

    this.run = function () {
      self.state = "started";
      this.info.innerHTML += "Начинаю работу...";
      this.info.innerHTML += "Время приготовления - " + self.time + " ";
      interval = setInterval(function () {
        this.info.innerHTML += " | ";
      }, 1000);
      timer = setTimeout(onReady, self.time);
      this.info.innerHTML += self.state;
    };

    this.stop = function () {
      clearInterval(interval);
      clearTimeout(timer);
      this.info.innerHTML += "Принудительное выключение!";
      self.state = "stopped";
      this.info.innerHTML += self.state;
    };
  }

  //machine.run();
  //machine.stop(); // Принудительное выключение

  function CoffeeMachine(info, drink) {
    Machine.call(this, info);

    this.drink = drink;
    let parentRun = this.run;

    this.run = function (drink) {
      try {
        if (this.state == "started") {
          //this.info.innerHTML += 'Машина занята!';
          throw new Error("Машина занята!");
          //setTimeout(function (){(new CoffeeMachine(info)).run(drink)}, this.time);
        } else if (drink != undefined) {
          this.drink = drink;
          this.info.innerHTML += "Приготовление: " + this.drink + " ";
          switch (drink) {
            case (drink = "latte"):
              this.time = 5000;
              break;
            case (drink = "espresso"):
              this.time = 3000;
              break;
            default:
              alert("напиток не найден");
              break;
          }

          parentRun();
        }
      } catch (ex) {
        this.info.innerHTML += ex.message;
      }
    };
  }

  function Multivariate(info) {
    Machine.call(this, info);

    this.dish = "вода";
    let parentRun = this.run;

    this.run = function (dish) {
      try {
        if (this.state == "started") {
          //this.info.innerHTML += 'Машина занята!';
          throw new Error("Машина занята!");
          //setTimeout(function (){(new CoffeeMachine(info)).run(drink)}, this.time);
        } else if (dish != undefined) {
          this.dish = dish;
          this.info.innerHTML += "Приготовление: " + this.dish + " ";
          switch (dish) {
            case (dish = "soup"):
              this.time = 2000;
              break;
            case (dish = "bake"):
              this.time = 3000;
              break;
            case (dish = "stew"):
              this.time = 5000;
              break;
            default:
              alert("блюдо не найдено");
              break;
          }

          parentRun();
        }
      } catch (ex) {
        this.info.innerHTML += ex.message;
      }
    };
  }

  /* Buttons */
  let info = document.getElementById("info");
  let latte = document.getElementById("latte");
  let espresso = document.getElementById("espresso");
  let stop = document.getElementById("stop");

  let machine = new Machine(info);
  let coffeeMachine = new CoffeeMachine(info);

  latte.addEventListener("click", function () {
    coffeeMachine.run("latte");
  });

  espresso.addEventListener("click", function () {
    coffeeMachine.run("espresso");
  });

  stop.addEventListener("click", function () {
    coffeeMachine.stop();
  });

  let soup = document.getElementById("soup");
  let bake = document.getElementById("bake");
  let stew = document.getElementById("stew");
  let stop1 = document.getElementById("stop");
  let machineMultivariate = new Multivariate(info);

  soup.addEventListener("click", function () {
    machineMultivariate.run("soup");
  });

  bake.addEventListener("click", function () {
    machineMultivariate.run("bake");
  });
  stew.addEventListener("click", function () {
    machineMultivariate.run("stew");
  });
  stop.addEventListener("click", function () {
    machineMultivariate.stop();
  });

  /* Run espresso */
  // espresso.addEventListener("click", function () {
  //     if (coffeeMachine.state == "started") setTimeout(function () {
  //         coffeeMachine.run("espresso")
  //     }, 5000);
  //     else coffeeMachine.run("espresso");
  // });

  //coffeeMachine.run(); // по умолчанию - вода
};
