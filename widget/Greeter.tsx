import app from "ags/gtk4/app";
import Gtk from "gi://Gtk?version=4.0";

export default function Greeter() {
  const win = new Gtk.Window({
    visible: true,
    name: "greeter",
    cssClasses: ["greeter"],
    application: app,
    child: (
      <box orientation={Gtk.Orientation.HORIZONTAL} halign={Gtk.Align.CENTER}>
        <box hexpand />
        <box orientation={Gtk.Orientation.VERTICAL} valign={Gtk.Align.CENTER}>
          <box vexpand />
          <box
            cssClasses={["user-input"]}
            orientation={Gtk.Orientation.HORIZONTAL}
          >
            <label label="Username" />
            <entry placeholderText="Username" />
          </box>
          <box
            cssClasses={["user-password"]}
            orientation={Gtk.Orientation.HORIZONTAL}
          >
            <label label="Password" />
            <entry placeholderText="Password" />
          </box>
          <box hexpand />
        </box>
        <box vexpand />
      </box>
    ),
  });
  win.show();
  return win;
}
