# POST /auth/login

> 이메일과 비밀번호로 로그인합니다. 성공 시 Access Token이 HttpOnly 쿠키로 설정됩니다.

---

## 기본 정보

| 항목 | 내용 |
|------|------|
| **메서드** | `POST` |
| **URL** | `/auth/login` |
| **인증 필요** | 없음 |

---

## 요청

### Path Parameters

없음

### Query Parameters

없음

### Request Body

`Content-Type: application/json`

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| `email` | `string` | ✅ | 가입된 이메일 주소 |
| `password` | `string` | ✅ | 비밀번호 |

**예시**

```json
{
  "email": "user@example.com",
  "password": "password1234"
}
```

---

## 응답

### 성공 응답 `200 OK`

로그인 성공 시 `X-Access-Token` 쿠키가 응답 헤더에 설정됩니다.

**Set-Cookie 헤더**

| 쿠키명 | 옵션 | 설명 |
|--------|------|------|
| `X-Access-Token` | `HttpOnly`, `Secure`, `SameSite=Lax` | JWT Access Token |

**Response Body**

| 필드 | 타입 | 설명 |
|------|------|------|
| `message` | `string` | 항상 `"SUCCESS"` |
| `error` | `string` | 항상 `""` |
| `errorCode` | `string` | 항상 `""` |
| `statusCode` | `number` | `200` |
| `data` | `object` | `{}` (현재 빈 객체 반환) |

```json
{
  "message": "SUCCESS",
  "error": "",
  "errorCode": "",
  "statusCode": 200,
  "data": {}
}
```

> **참고** Access Token의 만료 시간은 서버 환경 변수 설정에 따르며, Refresh Token(유효기간 30일)은 서버 내부적으로만 관리됩니다.

---

## 에러 응답

모든 에러는 아래 공통 형식으로 반환됩니다.

```json
{
  "message": "FAIL",
  "error": "<에러 메시지>",
  "errorCode": "<에러 코드>",
  "statusCode": <HTTP 상태 코드>,
  "data": null
}
```

### 발생 가능한 에러 목록

| HTTP 상태 | `errorCode` | `error` (메시지) | 발생 조건 |
|-----------|-------------|------------------|-----------|
| `404 Not Found` | `USER_NOT_FOUND` | 존재하지 않는 이메일입니다. | 해당 이메일로 가입된 계정이 없는 경우 |
| `401 Unauthorized` | `INVALID_PASSWORD` | 비밀번호가 일치하지 않습니다. | 비밀번호가 틀린 경우 |
| `400 Bad Request` | _(없음)_ | class-validator 유효성 검사 실패 메시지 | `email` 형식 오류, 필수 필드 누락 등 |
| `500 Internal Server Error` | _(없음)_ | Internal server error | 서버 내부 오류 |

### 에러 예시

**이메일 없음**

```json
{
  "message": "FAIL",
  "error": "존재하지 않는 이메일입니다.",
  "errorCode": "USER_NOT_FOUND",
  "statusCode": 404,
  "data": null
}
```

**비밀번호 불일치**

```json
{
  "message": "FAIL",
  "error": "비밀번호가 일치하지 않습니다.",
  "errorCode": "INVALID_PASSWORD",
  "statusCode": 401,
  "data": null
}
```
