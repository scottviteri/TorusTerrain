with import <nixpkgs> {};
stdenv.mkDerivation rec {
  name = "env";
  env = buildEnv { name = name; paths = buildInputs; };
  buildInputs = [
    nodejs
    python36
    python36Packages.jupyter
    python36Packages.numpy
    python36Packages.matplotlib
  ];
}

