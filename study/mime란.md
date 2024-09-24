# mime(Multipurpose Internet Mail Extensions)란

전자 우편을 위한 인터넷 표준 포맷이었으나, 현재는 인터넷에서 주고받는 파일의 형식이 무엇인지를 알리는 역할을 합니다.

MIME 표준에 정의된 타입들은 HTTP 등과 같은 통신 프로토콜에서 사용되고 있습니다.

# content type이란

메시지의 타입과 서브타입을 나타내며, 이 둘을 합쳐서 MIME 타입이라고 부릅니다.

즉 content type은 전달할 파일 혹은 데이터가 어떠한 MIME 타입을 통해 표현되어야 하는지를 알리는 헤더입니다.

## ico를 나타내기 위한 헤더는 무엇이 옳은가?

ico를 나타내기 위해 지원하는 MIME타입은 `image/x-icon`과 `image/vnd.microsoft.icon` 2가지가 존재합니다.

mdn의 mime 전체 리스트에서는 `image/vnd.microsoft.icon`를 사용하는 것을 권하고 있습니다.

하지만 대부분은 `image/x-icon`을 사용하고 있습니다.

### 둘의 차이는?

vnd는 벤더(하드웨어나 소프트웨어의 브랜드에 대해서 책임을 지는 기업)를 뜻하며, `image/vnd.microsoft.icon`는 마이크로소프트에서 정의한 icon 파일 형식임을 나타냅니다. 또한 IANA에 의해 공식적으로 표준화된 MIME 타입입니다.

x- 접두사는 비공식적 MIME 타입입니다. ico에 대해 표준화되지 않았을 때 많이 사용되었습니다. x- 접두사는 미래에 잠재적인 충돌을 일으킬 수 있으므로 권장되지 않습니다.

현재는 둘 다 대부분의 브라우저에서 지원되고 있으나, 표준화된 MIME를 사용하려면 `image/vnd.microsoft.icon`가 더 권장된다고 합니다.

# 참고

[IBM]https://www.ibm.com/docs/ko/sc-and-ds/8.5.0?topic=guide-mime-types
[RFC2048]https://datatracker.ietf.org/doc/html/rfc2048#section-2.1.4
[RFC2045]https://datatracker.ietf.org/doc/html/rfc2045#section-5
