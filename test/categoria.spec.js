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

  it("traducir negocios",function(){
    data = "negocios";
    traductor = Translate.traducirCategoria(data);
    assert.deepEqual("business",traductor);
  });

  it("traducir general",function(){
    data = "general";
    traductor = Translate.traducirCategoria(data);
    assert.deepEqual("general",traductor);
  });

  it("traducir salud",function(){
    data = "salud";
    traductor = Translate.traducirCategoria(data);
    assert.deepEqual("health",traductor);
  });


  it("traducir ciencia",function(){
    data = "ciencia";
    traductor = Translate.traducirCategoria(data);
    assert.deepEqual("science",traductor);
  });





});