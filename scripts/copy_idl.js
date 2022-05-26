const fs = require("fs");
const programIDL = require("../target/idl/next_level_ido_platform.json");

fs.writeFileSync(
  "./app/src/config/idl.json",
  JSON.stringify(programIDL, null, 2)
);
fs.copyFileSync(
  "target/types/next_level_ido_platform.ts",
  "./app/src/types/program.ts"
);
