// Declare all events to be fired
const $e = {
    task: {
        create: true,
        update: true,
        delete: true,
        toggleCompleted: true,

        needs: {
            updateForm: true,
            // storage: true,
            fetchAll: true,
        },

        is: {
            // stored: true,
            created: true,
            updated: true,
            deleted: true,
        }
    }
};
// Generates stringified event names
broker.registerEvents($e);