export const viewerMode = {
    currentSpecialView: false,
    get specialView() {
        return viewerMode.currentSpecialView;
    },
    set specialView(newSpecialView) {
        if (newSpecialView === viewerMode.currentSpecialView) return;

        if (newSpecialView) {
            document.body.classList.remove("LockedView");
            viewerMode.currentSpecialView = true;
        }
        else {
            document.body.classList.add("LockedView");
            viewerMode.currentSpecialView = false;
        }
    }
}
