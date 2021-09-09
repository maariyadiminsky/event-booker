const { 
    findAllUsers, 
    findUserByEmail, 
    createNewUser 
} = require("../../utils/user");
const { findEventsData } = require("../../utils/event");

module.exports = {
    users: async() => {
        try {
            const users = await findAllUsers();

            return users.map(user => ({ 
                ...user._doc,
                createdEvents: findEventsData(user._doc.createdEvents)
            }));

        } catch(err) {
            console.log(`ERROR: ${err}`);
            throw err;
        };
    },

    createUser: async ({ userInput: { email, password }}) => {
        // make sure user doesn't already exist in database
        try {
            const hasUserExist = await findUserByEmail(email);

            if (hasUserExist) {
                throw new Error("A user with that email already exists!");
            }

            const user = await createNewUser(email, password);

            await user.save();

            return { 
                ...user._doc, 
                password: null 
            };

        } catch(err) {
            console.log(`ERROR: ${err}`);
            throw err;
        };
    }
};