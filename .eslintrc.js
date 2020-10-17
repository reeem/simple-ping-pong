module.exports = {
  root: true,
  env: {
    node: true
  },
  plugins: [
    "babel",
    "prettier",
  ],
  extends: ["plugin:vue/essential", "eslint:recommended", "prettier", "@vue/prettier"],
  parserOptions: {
    parser: "babel-eslint"
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-var": process.env.NODE_ENV === "production" ? "warn" : "off",
  }
};
