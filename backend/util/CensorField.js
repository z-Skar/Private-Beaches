module.exports.CensorField = (field) => {
    return '#'.repeat(field.length - 4) + field.slice(-4);
};