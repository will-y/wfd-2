import {onValue, push, ref, remove, set, update} from "firebase/database";
import {database} from "../firebase";

export function getUnits(setStateFunction) {
    const unitsRef = ref(database, process.env.REACT_APP_DATABASE + "/units");

    onValue(unitsRef, (snapshot) => {
        if (snapshot.exists && snapshot.val() !== null) {
            const units = Object.entries(snapshot.val()).map(([key, value]) => {
                return {
                    id: key,
                    name: value
                }
            });
            setStateFunction(units);
        }
    });
}

export function addUnit(unit) {
    const unitsRef =  ref(database, process.env.REACT_APP_DATABASE + "/units");
    const newUnitRef = push(unitsRef);

    set(newUnitRef, unit).then(r => console.log('unit added'));
}

export function getRecipeTypes(setStateFunction) {
    const recipeTypesRef = ref(database, process.env.REACT_APP_DATABASE + "/recipe-types");

    onValue(recipeTypesRef, (snapshot) => {
        if (snapshot.exists() && snapshot.val() !== null) {
            const recipeTypes = Object.entries(snapshot.val()).map(([key, value]) => {
                return {
                    id: key,
                    ...value
                }
            });
            recipeTypes.sort((a, b) => a.order - b.order);
            setStateFunction(recipeTypes);
        }
    });
}

export function addRecipeType(name, key, order, color) {
    const recipeTypesRef =  ref(database, process.env.REACT_APP_DATABASE + "/recipe-types");
    const newRecipeTypeRef = push(recipeTypesRef);

    set(newRecipeTypeRef, {
        name: name,
        color: color,
        order: order
    }).then(r => console.log('recipe type added'));
}

export function updateRecipeType(id, name, key, order, color) {
    if (id === null) {
        addRecipeType(name, color, order);
    } else {
        const recipeTypesRef = ref(database, `${process.env.REACT_APP_DATABASE}/recipe-types/${id}`);

        update(recipeTypesRef, {
            name: name,
            key: key,
            color: color,
            order: order
        }).then(r => console.log('recipe type updated'));
    }
}

export function deleteRecipeType(id) {
    const recipeTypesRef =  ref(database, `${process.env.REACT_APP_DATABASE}/recipe-types/${id}`);

    remove(recipeTypesRef).then(r => console.log("recipe type deleted"));

}