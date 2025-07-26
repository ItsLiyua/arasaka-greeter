import app from "ags/gtk4/app";
import style from "./style.scss";
import Greeter from "./widget/Greeter";

app.start({
  css: style,
  main(...args: Array<string>) {
    let parsedArgs = 0;
    let initialUsername = null;
    let initialCommand = null;

    for (let i = 0; i < args.length; i++) {
      const a = args[i];
      if (a == "-h" || a == "--help") {
        // TODO: Help here
        console.log("Help here");
        return;
      } else if ((a == "-u" || a == "--user") && args.length > i + 1) {
        initialUsername = args[i + 1];
        parsedArgs += 2;
      } else if ((a == "-c" || a == "--cmd") && args.length > i + 1) {
        initialCommand = args[i + 1];
        parsedArgs += 2;
      }
    }
    if (parsedArgs != args.length) {
      console.log("Use --help for help!");
      return;
    }

    app.get_monitors().forEach((_) => {
      Greeter(initialUsername, initialCommand);
    });
  },
});
