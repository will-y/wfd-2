const categoryOrder = {
    "main": 0,
    "drink": 1,
    "side": 2,
    "dessert": 3
}

const sortRecipes = (recipes) => {
    const recipesCopy = JSON.parse(JSON.stringify(recipes));

    recipesCopy.sort((a, b) => {
        if (categoryOrder[a.type] < categoryOrder[b.type]) {
            return -1;
        } else if (categoryOrder[a.type] === categoryOrder[b.type]) {
            return a.name.localeCompare(b.name);
        } else {
            return 1;
        }
    });

    return recipesCopy;
}

export { sortRecipes };