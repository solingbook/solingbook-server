# POST /auth/reset-password

> 이메일 인증을 통해 받은 토큰을 사용하여 비밀번호를 재설정합니다.

---

## 기본 정보

| 항목          | 내용                   |
| ------------- | ---------------------- |
| **메서드**    | `POST`                 |
| **URL**       | `/auth/reset-password` |
| **인증 필요** | 없음                   |

---

## 요청

### Path Parameters

없음

### Query Parameters

없음

### Request Body

`Content-Type: application/json`

| 필드          | 타입     | 필수 | 설명                                                      |
| ------------- | -------- | ---- | --------------------------------------------------------- |
| `token`       | `string` | ✅   | `POST /auth/email-verification`으로 받은 이메일 인증 토큰 |
| `newPassword` | `string` | ✅   | 새로운 비밀번호                                           |

**예시**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "newPassword": "newpassword1234"
}
```

---

## 응답

### 성공 응답 `200 OK`

| 필드         | 타입     | 설명             |
| ------------ | -------- | ---------------- |
| `message`    | `string` | 항상 `"SUCCESS"` |
| `error`      | `string` | 항상 `""`        |
| `errorCode`  | `string` | 항상 `""`        |
| `statusCode` | `number` | `200`            |
| `data`       | `null`   | 항상 `null`      |

```json
{
  "message": "SUCCESS",
  "error": "",
  "errorCode": "",
  "statusCode": 200,
  "data": null
}
```

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

| HTTP 상태                   | `errorCode`           | `error` (메시지)                        | 발생 조건                                |
| --------------------------- | --------------------- | --------------------------------------- | ---------------------------------------- |
| `401 Unauthorized`          | `INVALID_TOKEN`       | 유효하지 않은 토큰입니다.               | 토큰이 만료되었거나 위변조된 경우        |
| `401 Unauthorized`          | `WRONG_TOKEN_PURPOSE` | 토큰 목적이 일치하지 않습니다.          | `purpose`가 `RESET_PASSWORD`가 아닌 경우 |
| `400 Bad Request`           | _(없음)_              | class-validator 유효성 검사 실패 메시지 | 필수 필드 누락, 빈 문자열 입력 등        |
| `500 Internal Server Error` | _(없음)_              | Internal server error                   | 서버 내부 오류                           |

### 에러 예시

**유효하지 않은 토큰**

```json
{
  "message": "FAIL",
  "error": "유효하지 않은 토큰입니다.",
  "errorCode": "INVALID_TOKEN",
  "statusCode": 401,
  "data": null
}
```

**토큰 목적 불일치**

```json
{
  "message": "FAIL",
  "error": "토큰 목적이 일치하지 않습니다.",
  "errorCode": "WRONG_TOKEN_PURPOSE",
  "statusCode": 401,
  "data": null
}
```
