import {createStore} from "vuex";

const store = createStore({
    state(){
        return {
            response: undefined,
            categories: [],
        }
    },

    getters:{
        response: state => {
            return state.response;
        },

        categories: state => {
            return state.categories;
        }
    },

    mutations:{
        response: (state, response) => {
            state.response = response;
        },
        categories: (state, categories) => {
            state.categories = [...state.categories, ...categories];
        },
    },

    actions:{
        response: (context, response) => {
            context.commit("response", response);
        },
        categories: (context, categories) => {
            context.commit("categories",categories);
        },
    },
});

export default store;