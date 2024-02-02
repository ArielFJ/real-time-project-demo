class Movie {
    constructor({ id, title }) {
        this.id = id;
        this.title = title;
        this.viewers = [];
    }

    addViewer(viewer) {
        const viewerExist = this.viewers.some(v => v?.id === viewer.id);
        if (viewerExist) {
            return;
        }
        this.viewers.push(viewer);
    }

    removeViewer(viewer) {
        this.viewers = this.viewers.filter(v => v.id !== viewer.id);
    }

    getViewerIDs() {
        return this.viewers.map(v => v.id);
    }
}

export default Movie;