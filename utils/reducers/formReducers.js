export const initialState = {
    inputValues: {
        email: '',
        password: '',
    },
    inputValidities: {
        email: null, // Or set initial validation states based on your needs
        password: null,
    },
    formIsValid: false, // Initial form validity based on initial input states
};

export const reducer = (state = initialState, action) => {
    const { validationResult, inputId, inputValue } = action

    const updatedValues = {
        ...state.inputValues,
        [inputId]: inputValue,
    }

    const updatedValidities = {
        ...state.inputValidities,
        [inputId]: validationResult,
    }

    let updatedFormIsValid = true

    for (const key in updatedValidities) {
        if (updatedValidities[key] === false) {
            updatedFormIsValid = false;
            break;
        }
    }

    return {
        inputValues: updatedValues,
        inputValidities: updatedValidities,
        formIsValid: updatedFormIsValid,
    }
}