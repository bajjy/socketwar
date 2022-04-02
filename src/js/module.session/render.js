class Render {
    constructor(state) {
        this.state = state;
        this.session = state.session;
        this.canvas = state.session.canvas;
    }
    elementTarget(id, gameData) {
        const socket = this.state.system.socket.id;
        const isMe = socket === id;
        const className = `.target-${id}.target`;
        const el = document.querySelector(className);
        const data = gameData[id];

        const styles = (target) => {
            target.style.top = data.y - data.height / 2 + 'px';
            target.style.left = data.x - data.width / 2 + 'px';
            target.style.width = data.width + 'px';
            target.style.height = data.height + 'px';
        };

        if (!el) {
            const newEl = document.createElement('div');
            newEl.className = `target-${id} target ${isMe && 'me'}`;
            newEl.innerHTML = `
                <div class="pl-name">${data.meta.name}</div>
            `;
            styles(newEl);
            return this.canvas.appendChild(newEl);
        };

        styles(el);
    }
    players(data) {
        const socket = this.state.system.socket.id;
        const me = data[socket];

        Object.keys(data).map(player => {
            this.elementTarget(player, data);
        });
    }
}

export default Render