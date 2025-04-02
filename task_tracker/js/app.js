router.init()

putContext("rootCtx", "Root");

req("Pages.Index");

const rootContext = context("rootCtx");
rootContext.appRoot = dom.get("#root");
rootContext.dialogRoot = dom.get("#dialogRoot");

(function () {
    const appColorTheme = colorTheme();
    if (!appColorTheme) {
        setColorTheme(appThemeColors.BLUE);
    } else {
        setColorTheme(appColorTheme, false);
    }
})();

h.IndexPage({ parent: rootContext.appRoot });
h.DialogContainer({ parent: rootContext.dialogRoot });