{
  system,
  ags,
  stdenv,
  wrapGAppsHook,
  gobject-introspection,
  gjs,
  libadwaita,
  libsoup_3,
  bash,
  weston,
}:
stdenv.mkDerivation rec {
  pname = "arasaka-greeter";
  version = "1.0";
  src = ../.;

  extraPackages = with ags.packages.${system}; [
    io
    astal4
    greet
    gjs
  ];

  nativeBuildInputs = [
    wrapGAppsHook
    gobject-introspection
    ags.packages.${system}.default
  ];

  buildInputs = [
    libadwaita
    libsoup_3
  ]
  ++ extraPackages;

  installPhase = ''
    runHook preInstall

    mkdir -p $out/bin
    mkdir -p $out/share/arasaka-greeter/ags
    cp -r $src/app.ts $src/style.scss $src/widget $out/share/arasaka-greeter/ags
    ags bundle $src/app.ts $out/bin/${pname} -d "SRC='$out/share/arasaka-greeter/ags'"

    cp $src/resources/weston.ini $out/share/arasaka-greeter/weston.ini
    substituteInPlace $out/share/arasaka-greeter/weston.ini --replace "{GREETER}" "$out/bin/arasaka-greeter"

    cp $src/resources/launch-arasaka-greeter $out/bin/launch-arasaka-greeter
    substituteInPlace $out/bin/launch-arasaka-greeter --replace "{BASH}" "${bash}" --replace "{WESTON}" "${weston}" --replace "{WESTON_CONFIG}" "$out/share/arasaka-greeter/weston.ini"

    runHook postInstall
  '';
}
