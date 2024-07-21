export const sortRecipes = (recipes, recipeTypes) => {
    const recipesCopy = JSON.parse(JSON.stringify(recipes));

    if (!recipeTypes) {
        recipesCopy.sort((a,b) => (a.type > b.type) ? 1 : ((b.type > a.type) ? -1 : 0));
        return;
    }

    recipesCopy.sort((a, b) => {
        const aOrder = getRecipeTypeForRecipe(recipeTypes, a.type)?.order;
        const bOrder = getRecipeTypeForRecipe(recipeTypes, b.type)?.order;

        if (aOrder < bOrder) {
            return -1;
        } else if (aOrder === bOrder) {
            return a.name.localeCompare(b.name);
        } else {
            return 1;
        }
    });

    return recipesCopy;
}

export const getRecipeTypeForRecipe = (recipeTypes, recipeTypeKey) => {
    for (let i = 0; i < recipeTypes.length; i++) {
        if (recipeTypes[i].key === recipeTypeKey) {
            return recipeTypes[i];
        }
    }

    return null;
}

export const getRecipeColor = (recipeTypes, recipeTypeKey) => {
    const recipeType = getRecipeTypeForRecipe(recipeTypes, recipeTypeKey)
    if (recipeType) {
        return recipeType.color;
    }

    return "#FFFFFF66";
}