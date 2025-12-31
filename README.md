# WAS Framework(Web Application Server by node.js)

## Architecture
<img width="531" height="309" alt="Image" src="https://github.com/user-attachments/assets/e56ae2a2-cea5-472d-94f3-d4f63ab6336f" />

## Flow Chart

### 1. Static File Request

<img width="416" height="398" alt="Image" src="https://github.com/user-attachments/assets/5f7c9284-26ff-4d12-800c-ee0afda27272" />

### 2. URI Request

<img width="706" height="394" alt="Image" src="https://github.com/user-attachments/assets/c52020e7-658d-46ea-9d76-61ebd6816de4" />

## Usage

### Controller

HTTP url에 해당되는 handler 메소드 매핑 및 등록

```TypeScript
class TestController {
    
    @GetMapping("/hello-workd")
    helloWorld(request: Request) {
        let body = request.getBodyContent();
        
        return body;
    }
}

```