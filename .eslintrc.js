/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: ["wesbos/typescript", "@remix-run/eslint-config", "@remix-run/eslint-config/node"],
  "rules": {
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/consistent-type-imports": [
      "error",
      {
        "prefer": "type-imports",
        "disallowTypeAnnotations": true
      }
    ],
  }
};
