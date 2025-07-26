{ self }:
(
  {
    config,
    lib,
    pkgs,
    ...
  }:
  {
    options.services.arasaka-greeter = {
      enable = lib.mkEnableOption "Arasaka Greeter";
      settings = {
        user = lib.mkOption {
          type = lib.types.str;
          default = "greeter";
          description = "The user running the greeter session";
        };
        defaultProperties = {
          username = lib.mkOption {
            type = with lib.types; nullOr str;
            default = null;
            description = "The username you want to have in the username field by default. Set to null to leave the field empty.";
          };
          command = lib.mkOption {
            type = with lib.types; nullOr str;
            default = null;
            description = "The command you want to have in the command field by default. Set to null to leave the field empty.";
          };
        };
      };
    };
    config =
      with config.services.arasaka-greeter;
      lib.mkIf enable {
        services.greetd = {
          enable = true;
          settings = {
            inherit (settings) user;
            command = ''${self.packages.${pkgs.system}.default}/bin/launch-arasaka-greeter ${
              if settings.defaultProperties.username != null then
                "--user ${settings.defaultProperties.username}"
              else
                ""
            } ${
              if settings.defaultProperties.command != null then
                "--cmd ${settings.defaultProperties.command}"
              else
                ""
            }'';
          };
        };
      };
  }
)
