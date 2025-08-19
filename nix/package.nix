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
  cage,
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
    bash
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

    cp $src/resources/launch-arasaka-greeter $out/bin/launch-arasaka-greeter
    substituteInPlace $out/bin/launch-arasaka-greeter --replace-fail "{BASH}" "${bash}" --replace-fail "{CAGE}" "${cage}" --replace-fail "{GREETER}" "$out/bin/arasaka-greeter"

    mkdir -p $out/share/arasaka-greeter
    cp -r $src/assets $out/share/arasaka-greeter/assets

    runHook postInstall
  '';
}
