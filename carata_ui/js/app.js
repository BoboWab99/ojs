router.init()

putContext("root", "RootContext");
// putContext("data", "DataContext");

req("Pages.Index");
// mediators(["TaskMediator"]);

const rootContext = context("root");
// const dataContext = context("data");

rootContext.appRoot = dom.get("#root");
rootContext.dialogRoot = dom.get("#dialogRoot");

// dataContext.states({
//     tasks: [],
// });


h.IndexPage({ parent: rootContext.appRoot });
// h.DialogContainer({ parent: rootContext.dialogRoot });

// broker.emit($e.task.needs.fetchAll);