import { createState } from "ags";
import app from "ags/gtk4/app";
import Gtk from "gi://Gtk?version=4.0";
import Greet from "gi://AstalGreet?version=0.1";
import GLib from "gi://GLib?version=2.0";
import { readFile, writeFile } from "ags/file";

const CACHE_BASE = "/var/cache/arasaka-greeter/";
const cachedUsernameFile = CACHE_BASE + "cachedUsername";
const cachedCommandFile = CACHE_BASE + "cachedCommand";

function fetchCachedValue(file: string, fallback: string = ""): string {
  if (GLib.file_test(file, GLib.FileTest.EXISTS)) return readFile(file);
  else return fallback;
}

const [username, setUsername] = createState(
  fetchCachedValue(cachedUsernameFile),
);
const [password, setPassword] = createState("");
const [command, setCommand] = createState(fetchCachedValue(cachedCommandFile));

function login() {
  const user = username.get();
  const pass = password.get();
  const cmd = command.get();

  if (user == null || user.trim().length == 0) return;
  if (pass == null || pass.trim().length == 0) return;
  if (cmd == null || cmd.trim().length == 0) return;

  Greet.login(user, pass, cmd, (_, res) => {
    try {
      Greet.login_finish(res);

      writeFile(cachedUsernameFile, user);
      writeFile(cachedCommandFile, cmd);
    } catch (err) {
      console.log("Error while logging in");
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
              <entry
                placeholderText="Username"
                text={username}
                onNotifyText={(self) => setUsername(self.text)}
                onActivate={login}
              />
              <entry
                placeholderText="Password"
                text={password}
                visibility={false}
                onNotifyText={(self) => setPassword(self.text)}
                onActivate={login}
              />
            </box>
          </centerbox>
        </box>
        <centerbox $type="end" orientation={Gtk.Orientation.VERTICAL}>
          <box $type="end" orientation={Gtk.Orientation.HORIZONTAL}>
            <entry
              placeholderText="Command"
              text={command}
              onNotifyText={(self) => setCommand(self.text)}
              onActivate={login}
            />
            <label label="logo stuff" />
          </box>
        </centerbox>
      </centerbox>
    ),
  });
  win.show();
  return win;
}
