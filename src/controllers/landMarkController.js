const { LandMark } = require("../repository/database").models;

module.exports = {
    getCategorys: async () => {
        return await LandMark.findAll();
    },
};
