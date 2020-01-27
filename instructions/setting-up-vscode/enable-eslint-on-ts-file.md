## Enable eslint on TS file:

open this file in your favorite editor:
```
~/Library/Application\ Support/Code/User/settings.json
```

and add the following:

```
 {

  //  ... other setting

    // Enabling ESLint on TS files in VSCode
    // https://javascriptplayground.com/typescript-eslint/
    "eslint.validate": [
      "javascript",
      "javascriptreact",
      "typescript",
      "typescriptreact"
    ]
  }
```
