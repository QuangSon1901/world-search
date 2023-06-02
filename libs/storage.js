export const storage = {
    get(constant) {
        return JSON.parse(localStorage.getItem(constant));
    },
    set(constant, data) {
        localStorage.setItem(constant, JSON.stringify(data));
    },
};
