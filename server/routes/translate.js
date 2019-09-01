let traducirCategoria = (categoria) => {
    let category = "";
    if (categoria == "deportes") {
        category = "sports";
    }
    if (categoria == "entretenimiento") {
        category = "entertainment";
    }
    if (categoria == "tecnologia") {
        category = "technology";
    }
    if(categoria == "negocios"){
        category = "business";
    }
    if(categoria == "general"){
        category = "general";
    }
    if(categoria == "salud"){
        category = "health";
    }
    if(categoria == "ciencia"){
        category = "science";
    }
    return category;
}

module.exports={
    traducirCategoria
}