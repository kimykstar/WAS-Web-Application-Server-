# Oauth2(Open Authorization 2.0)

`사용자 인증`을 위한 개방형 표준 프로토콜이다.

해당 프로토콜에서는 Third-Party프로그램에게 리소스 소유자(사용자)를 대신하여 리소스 서버에서 제공하는 자원에 대한 접근 권한을 위임하는 방식을 제공한다.

## Oauth2.0주요 용어

1. Authentication

- 인증, 접근 자격이 있는지 검증하는 단계를 말한다.

2. Authorization

- 인가, 자원에 접근할 권한을 부여하는 것이다. 인가가 완료되면 리소스 접근 권한이 담긴 Access Token이 클라이언트에게 부여된다.

3. Access token

- 리소스 서버에게서 리소스 소유자의 보호된 자원을 획득할 때 사용되는 만료 기간이 있는 Token이다.

4. Refresh Token

- Access token만료 시 이를 갱신하기 위한 용도로 사용하는 Token이다. Refresh Token은 일반적으로 Access Token보다 만료 기간이 길다.

## Oauth2.0의 구성요소의 역할

1. Resource Owner

- `리소스 소유자 or 사용자`로 보호된 자원에 접근할 수 있는 자격을 부여해 주는 주체이다.

2. Client

- 보호된 자원을 사용하려고 접근 요청을 하는 애플리케이션이다.(즉, 내가 개발하려는 WAS서버가 될 수 있음)

3. Resource Server(사용자 정보 제공 서버)

- `사용자의 보호된 자원을 호스팅하는 서버`이다.

4. Authorization Server(인증, 인가 서버)

- `권한 서버. 인증/인가를 수행하는 서버`로, 클라이언트의 접근 자격을 확인하고, Access Token을 발급하여 권한을 부여하는 역할을 수행한다.

## Oauth2의 4가지 프로토콜

1. Authorization Code Grant(권한 부여 승인 코드 방식)

- 권한 부여 승인을 위해 자체 생성한 Authorization Code를 전달하는 방식으로 많이 쓰이고, 기본이 되는 방식이다.
- 간편 로그인 기능에서 사용되는 방식으로 **클라이언트가 사용자를 대신하여 특정 자원에 접근을 요청할 때** 사용되는 방식이다.

2. Inplicit Grant(암묵적 승인 방식)

- 자격증명을 안전하게 저장하기 힘든 클라이언트에게 최적화된 방식이다. Authorization Code Grant방식과 다른점은 권한부여 승인 코드 없이 바로 `Access token`이 발급되고 전달된다.
- Refresh Token사용이 불가능한 방식이고, Authorization Server는 client_secret을 사용해 클라이언트를 인증하지 않는다.
- Access Token을 얻기 위한 절차가 간소화되고, 응답 및 효율성은 높아지지만, Access Token이 URL로 전달된다는 단점이 존재

3. Resource Owner Password Credentials Grant(자원 소유자 자격 증명 승인방식)

- username, password로 Access Token을 받는 방식이다.
- 클라이언트가 타사의 외부 프로그램일 경우에는 사용하면 안된다. 즉, 권한서버, 리소스서버, 클라이언트가 모두 같은 시스템에 속해 있을 때 사용되어야 하는 방식이다.
- 다른 시스템인 경우 username, password가 client에게 넘어갈 수 있기 때문

4. Client Credentials Grant(클라이언트 자격증명 승인 방식)

- 클라이언트의 `자격증명(Client Credentials)`만으로 Access Token을 획득하는 방식이다.
- 클라이언트 자신이 관리하는 리소스 혹은 권한 서버에 해당하는 클라이언트를 위한 제한된 리소스 접근권한이 설정되어 있는 경우 사용된다.
- `자격증명`을 안전하게 보관할 수 있는 클라이언트에서만 사용되어야 한다.
