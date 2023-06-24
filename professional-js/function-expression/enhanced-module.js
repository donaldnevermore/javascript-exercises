class CustomType {}

class BaseComponent {}

let singleton = (function () {
  let privateVariable = 10;

  function privateFunction() {
    return false;
  }

  let object = new CustomType();

  object.publicProperty = true;

  object.publicMethod = function () {
    privateVariable++;
    return privateFunction();
  };

  return object;
})();

let application = (function () {
  let components = [];

  components.push(new BaseComponent());

  let app = new BaseComponent();

  app.getComponentCount = function () {
    return components.length;
  };

  app.registerComponent = function (component) {
    if (typeof component === "object") {
      components.push(component);
    }
  };

  return app;
})();
