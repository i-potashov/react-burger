import { ADD, REMOVE, CLEAR, REFRESH, BUN } from '../../utils/names';

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

export const totalPriceInitialState = {
    price: 0,
};

export function totalPriceReducer(state, action) {
    switch (action.type) {
        case REFRESH:
            return { ...state, price: action.price };
        default:
            return { ...state, price: totalPriceInitialState };
    }
}

export const receivedDataInitialState = {
    name: null,
    order: {
        number: null,
    },
    success: null,
};

export function receivedDataReducer(state, action) {
    switch (action.type) {
        case ADD:
            return {
                name: action.data.name,
                order: {
                    number: action.data.order.number,
                },
                success: action.data.success,
            };
        case CLEAR:
            return { ...receivedDataInitialState };
        default:
            return { ...receivedDataInitialState };
    }
}
