{
  system,
  ags,
  stdenv,
  wrapGAppsHook,
  gobject-introspection,
  gjs,
  libadwaita,
  libsoup_3,
}:
stdenv.mkDerivation rec {
  pname = "arasaka-greeter";
  version = "1.0";
  src = ../.;

  nativeBuildInputs = [
    wrapGAppsHook
    gobject-introspection
    ags.packages.${system}.default
  ];
  buildInputs = with ags.packages.${system}; [
    io
    astal4
    greet
    gjs
    libadwaita
    libsoup_3
  ];

  installPhase = ''
    runHook preInstall

    mkdir -p $out/bin
    mkdir -p $out/share
    cp -r $src/* $out/share
    ags bundle $src/app.ts $out/bin/${pname} -d "SRC='$out/share'"

    runHook postInstall
  '';
}
