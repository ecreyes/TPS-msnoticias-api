const assert = require('chai').assert;
const Noticia = require("../server/routes/noticia");

describe("Categorias de noticias",function(){
  it("traducir deportes",function(){
    data = "deportes";
    traductor = Noticia.traducirCategoria(data);
    assert.deepEqual("sports",traductor);
  });

  it("traducir entretenimiento",function(){
    data = "entretenimiento";
    traductor = Noticia.traducirCategoria(data);
    assert.deepEqual("entertainment",traductor);
  });
  
  it("traducir tecnologia",function(){
    data = "tecnologia";
    traductor = Noticia.traducirCategoria(data);
    assert.deepEqual("technology",traductor);
  });

});