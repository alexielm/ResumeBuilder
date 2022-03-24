export const viewerMode = {
    currentSpecialView: false,
    get specialView() {
        return this.currentSpecialView;
    },
    set specialView(newSpecialView) {
        if (newSpecialView === this.currentSpecialView) return;

        if (newSpecialView) {
            document.body.classList.remove("LockedView");
            this.currentSpecialView = true;
        }
        else {
            document.body.classList.add("LockedView");
            this.currentSpecialView = false;
        }
    }
}
