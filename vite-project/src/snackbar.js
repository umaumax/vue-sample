import {
    reactive
} from "vue";

// for component
export const snackbars = reactive([])

// for users
export const showSnackbar = (message, config) => {
    const snackbar = Object.assign({
        color: 'indigo',
        show: true,
        message: message,
        timeout: 3000, // ms
    }, config)
    snackbars.push(snackbar)
}

setInterval(() => {
    cleanSnackBars()
}, 500);


const cleanSnackBars = () => {
    for (var i = 0; i < snackbars.length;) {
        if (!snackbars[i].show) {
            snackbars.splice(i, 1)
        } else {
            i++
        }
    }
}
