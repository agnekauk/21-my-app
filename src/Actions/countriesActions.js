import { get_from_server, reload, sort_by_name_asc, sort_by_name_desc, filter_smaller_LTU, filter_from_Oceania, show_all } from "../Constants/countries"

export function sortByNameAsc() {
    return {
        type: sort_by_name_asc
    }
}

export function sortByNameDesc() {
    return {
        type: sort_by_name_desc
    }
}

export function filterSmallerLTU() {
    return {
        type: filter_smaller_LTU
    }
}

export function filterFromOceania() {
    return {
        type: filter_from_Oceania
    }
}

export function reloadAction() {
    return {
        type: reload
    }
}

export function showAll() {
    return {
        type: show_all
    }
}

export function getFromServer(countries) {
    return {
        type: get_from_server,
        payload: countries
    }
}