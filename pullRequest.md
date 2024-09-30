```
Jest encountered an unexpected token

Jest failed to parse a file. This happens e.g. when your code or its dependencies use non-standard JavaScript syntax, or when Jest is not configured to support such syntax.

Out of the box Jest supports Babel, which will be used to transform your files into valid JS based on your Babel configuration.

By default "node_modules" folder is ignored by transformers.

({"Object.<anonymous>":function(module,exports,require,__dirname,__filename,jest){import { getUriFromRequest } from "../../server/requestParser.ts";
                                                                                      ^^^^^^

    SyntaxError: Cannot use import statement outside a module
```

발생

위의 문제는 현재 jest는 기본적으로 Commonjs모듈 시스템을 사용하는데 `esm`형식의 import를 사용하기 때문에 뜨는 오류이다.

이를 해결하기 위해서는

1. npm i -D ts-jest @types/jest로 패키지를 다시 설치한다.

2. jest.config.json파일에 해당 project에 `"preset": "test-jest"`를 추가한다.

```
const __filename = fileURLToPath(import.meta.url);
```

문제

esm모듈인 meta.url모듈을 가져올 때 문제 발생(test시 에만 발생)

1. ES2020이상부터 사용이 가능하다.
2. Jest config설정을 변경한다.

```
"globals":{
    "ts-jest": {
        "useESM": true
    }
}
```

를 추가한다.
