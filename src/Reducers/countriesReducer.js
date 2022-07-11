import { get_from_server, reload, sort_by_name_asc, sort_by_name_desc, show_all } from "../Constants/countries";

function countriesReducer(state, action) {
    let newState;
    switch (action.type) {
        case get_from_server:
            newState = action.payload.map((b, i) => ({ ...b, row: i, show: true }));
            break;
        case reload:
            newState = [];
            break;
        case sort_by_name_asc:
            newState = [...state].sort((a, b) => (a.name > b.name) ? 1 : -1);
            break;
        case sort_by_name_desc:
            newState = [...state].sort((a, b) => (b.name > a.name) ? 1 : -1);
            break;
        // case filter_smaller_LTU:
        //     newState = state.map(c => ({ ...c, show: true }));
        //     newState = state.map(c => c.area < 65300 ? { ...c, show: true } : { ...c, show: false });
        //     break;
        // case filter_from_Oceania:
        //     newState = state.map(c => ({ ...c, show: true }));
        //     newState = state.map(c => c.region === 'Oceania' ? { ...c, show: true } : { ...c, show: false });
        //     break;
        case show_all:
            newState = state.map(c => ({ ...c, show: true }));
            break;
        default:
            newState = [...state];
    }
    return newState;
}

export default countriesReducer;