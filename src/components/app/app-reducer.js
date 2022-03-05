import { ADD, REMOVE, BUN } from '../../utils/names';

export const selectedIngredientsInitialState = {
    bun: null,
    ingredients: [],
};

export function selectedIngredientsReducer(state, action) {
    switch (action.type) {
        case ADD:
            return action.data.type === BUN
                ? { ...action.selectedIngredients, bun: action.data }
                : {
                      ...action.selectedIngredients,
                      ingredients: [...action.selectedIngredients.ingredients, action.data],
                  };
        case REMOVE:
            return { ...action.selectedIngredients, ingredients: action.tmpIngredients };
        default:
            throw new Error(`Wrong type of action: ${action.type}`);
    }
}
