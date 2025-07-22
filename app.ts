import app from "ags/gtk4/app";
import style from "./style.scss";
import Greeter from "./widget/Greeter";

app.start({
  css: style,
  main() {
    app.get_monitors().map(Greeter);
  },
});
