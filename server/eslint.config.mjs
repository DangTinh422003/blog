import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";
import parser from "@typescript-eslint/parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: {},
});

const eslintConfig = [
  {
    ignores: ["node_modules/**", "dist/**", "eslint.config.mjs"],
  },
  ...compat.extends(
    "prettier",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:prettier/recommended",
  ),
  ...compat.plugins(
    "immer",
    "import",
    "simple-import-sort",
    "@typescript-eslint",
  ),
  {
    files: ["**/*.{js,mjs,cjs,ts,tsx}"],
    languageOptions: {
      parser,
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
      },
    },
    rules: {
      "@typescript-eslint/no-empty-interface": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          fixStyle: "inline-type-imports",
        },
      ],
      "prettier/prettier": 0,
      "no-param-reassign": [
        "error",
        {
          props: true,
          ignorePropertyModificationsForRegex: ["^draft", "state"],
        },
      ],
      "import/no-unresolved": 0,
      "no-console": 0,
      "immer/no-update-map": "error",
      "import/first": "error",
      "import/newline-after-import": "error",
      "import/no-duplicates": "error",
      "import/extensions": ["error", "never"],
      "@typescript-eslint/no-misused-promises": [
        2,
        {
          checksVoidReturn: {
            attributes: false,
          },
        },
      ],
      "import/extensions": 0,
    },
  },
];

export default eslintConfig;
