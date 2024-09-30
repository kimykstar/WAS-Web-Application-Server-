# Jest

FaceBook에서 만든 Test라이브러리로 단위테스트 및 여러가지 테스트가 가능하다.

## Jest적용하기

### Jest적용을 위한 프로그램 설치 및 설정

```
npm install --save-dev jest
```

`Tyepscript`의 경우 테스트 코드 실행환경을 위한 `ts-node`가 반드시 필요하다.

```
npm install --save ts-node
```

위의 패키지들을 모두 다운받은 후 `package.json`파일의 `script`안에 value로

```
"test": "jest"
```

를 작성하고, 앞으로 jest Test를 실행할 때 `npm test`를 입력하여 test를 진행한다.

### Jest적용을 위한 Config파일 생성

Jest환경을 설정하기 위한 config파일의 이름 형식은 다음과 같다.

`jest.config.js|ts|mjs|cjs|json`

해당 이름으로 Config파일을 생성하고 해당 파일에서 Test를 위한 설정을 진행한다.

나는 `json`을 적용시키려고 하였다.

### Config파일 설정하기

Test환경을 설정하기 위한 옵션들은 정말로 다양하게 있다. 그 중 가장 중요한 옵션인 `testEnvironment`옵션은 Jest의 Test코드를 실행할 때 어떤 것을 활용해서 실행할 것인지를 설정한다.

Typescript를 통해 Test코드를 작성할 것이므로

```
"testEnvironment": "ts-nod"
```

를 추가한다.

근데 만약 프론트엔트 테스트도 하고싶은 경우가 생길 수 있다.

프론트엔드 테스트의 경우 `testEnvironment`를 `jsdom`으로 설정해주어야 한다. 근데 config파일은 1개이다. 이 경우에 어떻게 파일에 따라 환경을 다르게 해줄 수 있을까?

#### 방법1

- 각각의 디렉터리에 jest.config.js파일을 생성하고, `testMatch`옵션으로 해당 config파일을 적용할 test디렉터리를 지정한다.

#### 방법2

- 하나의 jestConfig파일에 `projects`속성을 설정하여 여러개의 디렉터리에 해당하는 jest config설정을 작성한다.

## 참고

https://jestjs.io/docs/configuration
https://jestjs.io/docs/getting-started
