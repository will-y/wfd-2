import {httpsCallable} from 'firebase/functions';
import {functions} from "../firebase";

export async function parseRecipe(url) {
    const parseRecipe = httpsCallable(functions, 'parseRecipe');
    return await parseRecipe({url: url});
}