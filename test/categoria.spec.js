const assert = require('chai').assert;
const Translate = require("../server/routes/translate");

describe("Categorias de noticias",function(){
  it("traducir deportes",function(){
    data = "deportes";
    traductor = Translate.traducirCategoria(data);
    assert.deepEqual("sports",traductor);
  });

  it("traducir entretenimiento",function(){
    data = "entretenimiento";
    traductor = Translate.traducirCategoria(data);
    assert.deepEqual("entertainment",traductor);
  });
  
  it("traducir tecnologia",function(){
    data = "tecnologia";
    traductor = Translate.traducirCategoria(data);
    assert.deepEqual("technology",traductor);
  });

});