import app from "ags/gtk4/app";
import Gtk from "gi://Gtk?version=4.0";

export default function Greeter() {
  const win = new Gtk.Window({
    visible: true,
    name: "greeter",
    cssClasses: ["greeter"],
    application: app,
    // child: new Gtk.Label({ label: "Hello World", visible: true }),
    child: <label label="Hello World!!!" />,
  });
  win.show();
  return win;
}
