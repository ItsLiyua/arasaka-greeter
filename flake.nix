{
  description = "A GreetD frontend built with AGS and themed in the style of the arasaka corporation from Cyberpunk 2077";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";

    ags = {
      url = "github:aylur/ags";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs =
    {
      self,
      nixpkgs,
      flake-utils,
      ags,
    }:
    flake-utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
      in
      {
        packages.default = pkgs.callPackage ./nix/package.nix { inherit ags; };
        devShells.default = pkgs.mkShell {
          buildInputs = [
            (ags.packages.${system}.default.override {
              # inherit extraPackages;
            })
          ];
        };
      }
    );
}
