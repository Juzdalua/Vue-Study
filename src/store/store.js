import {createStore} from "vuex";

const store = createStore({
    state: {
        response: undefined,
    },

    getters:{
        response: state => {
            return state.response;
        },
    },

    mutations:{
        response: (state, response) => {
            state.response = response;
        },
    },

    actions:{
        response: (context, response) => {
            context.commit("response", response);
        },
    },
});

export default store;