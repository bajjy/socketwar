function s4spellIndex() {
    var r = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    return r() + r();
};

module.exports = s4spellIndex;