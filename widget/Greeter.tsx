import app from "ags/gtk4/app";
import Greet from "gi://AstalGreet?version=0.1";
import Gtk from "gi://Gtk?version=4.0";

function login(username: string, password: string, cmd: string) {
  Greet.login(username, password, cmd, (_, res) => {
    try {
      Greet.login_finish(res);
    } catch (err) {
      printerr(err);
    }
  });
}

export default function Greeter() {
  const win = new Gtk.Window({
    visible: true,
    name: "greeter",
    cssClasses: ["greeter"],
    application: app,
    child: (
      <centerbox orientation={Gtk.Orientation.HORIZONTAL}>
        <label $type="start" label="Image thingy" />
        <box $type="center" orientation={Gtk.Orientation.HORIZONTAL}>
          <label label="logo" />
          <centerbox orientation={Gtk.Orientation.VERTICAL}>
            <box $type="center" orientation={Gtk.Orientation.VERTICAL}>
              <entry placeholderText="Authorized User" />
              <entry placeholderText="Password" />
            </box>
          </centerbox>
        </box>
        <centerbox $type="end" orientation={Gtk.Orientation.VERTICAL}>
          <label $type="end" label="logo stuff" />
        </centerbox>
      </centerbox>
    ),
  });
  win.show();
  return win;
}
