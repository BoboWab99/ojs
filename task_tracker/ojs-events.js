const $e = {
    task: {
        create: true,
        update: true,
        delete: true,

        needs: {
            addForm: true,
            storage: true,
        },

        is: {
            stored: true,
            created: true,
            updated: true,
            deleted: true,
        }
    }
};

broker.registerEvents($e);