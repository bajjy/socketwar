function addAnimation(body, id) {
    const dynamicStyles = document.createElement('style');
    dynamicStyles.id = id;
    document.head.appendChild(dynamicStyles);

    dynamicStyles.innerHTML = body;
};

export default addAnimation;