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
    return category;
}

module.exports={
    traducirCategoria
}