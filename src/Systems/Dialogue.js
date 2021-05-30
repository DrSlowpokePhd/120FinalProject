class Dialogue {
    constructor(scene, script_name) {
        this.scene = scene;
        this.script;
        this.request = new XMLHttpRequest();
        this.dialogue = this.request.open("GET", script_name, true);
        this.request.responseType = 'json';
        this.request.setRequestHeader('Cache-Control', 'no-cache');
        this.request.send();
        this.request.onload = () => {
            this.script = this.request.response;
        }
    }
}
