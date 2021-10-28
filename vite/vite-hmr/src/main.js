import "./style.css";
import { render } from "./renderA";

render();

if (
    import.meta.hot) {
    // import.meta.hot.accept((newModule) => {
    //     newModule.render();
    // });
    // import.meta.hot.accept(); // 自动更新
    import.meta.hot.accept(["./renderA"], ([newA]) => {
        if (newA.i > 5) {
            import.meta.hot.invalidate(); // 强制刷新页面
        } else {
            newA.render();
        }
    }); // 手动更新
    import.meta.hot.accept(() => {});
    import.meta.hot.decline(); // 强制刷新页面
}