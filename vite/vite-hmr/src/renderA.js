let renderTimer;
export const render = () => {
    renderTimer = setInterval(() => {
        document.querySelector("#app").innerHTML = `
  <h1>Hello Vite!</h1>
  <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation${i}</a>
`;
    }, 1000);
};

let i =
    import.meta.hot.data.cache &&
    import.meta.hot.data.cache.getIndex ?
    import.meta.hot.data.cache.getIndex() :
    0;
// side effect
const timer = setInterval(() => {
    i++;
    console.log(i);
}, 1000);

export { i }

if (
    import.meta.hot) {
    import.meta.hot.data.cache = {
        // 每个模块独有，外部无法拿到
        // 储存state
        getIndex() {
            return index;
        },
    };
    import.meta.hot.dispose(() => {
        if (timer) {
            clearInterval(timer);
            clearInterval(renderTimer);
        }
    });
    import.meta.hot.decline() // main.js accpet了，这里的decline不生效！
}