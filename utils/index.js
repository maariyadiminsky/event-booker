const findDate = (date = "") => (date ? new Date(date).toISOString() : new Date().toISOString());

module.exports = {
    findDate
};