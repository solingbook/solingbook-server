# POST /auth/signup

> 신규 사용자를 등록합니다.

---

## 기본 정보

| 항목 | 내용 |
|------|------|
| **메서드** | `POST` |
| **URL** | `/auth/signup` |
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
| `email` | `string` | ✅ | 이메일 형식이어야 합니다 |
| `nickname` | `string` | ✅ | 사용자 닉네임 |
| `password` | `string` | ✅ | 비밀번호 |
| `profileImgUrl` | `string` | ❌ | 프로필 이미지 URL |

**예시**

```json
{
  "email": "user@example.com",
  "nickname": "solinguser",
  "password": "password1234",
  "profileImgUrl": "https://example.com/profile.png"
}
```

---

## 응답

### 성공 응답 `200 OK`

| 필드 | 타입 | 설명 |
|------|------|------|
| `message` | `string` | 항상 `"SUCCESS"` |
| `error` | `string` | 항상 `""` |
| `errorCode` | `string` | 항상 `""` |
| `statusCode` | `number` | `200` |
| `data` | `object` | 생성된 사용자 정보 |

```json
{
  "message": "SUCCESS",
  "error": "",
  "errorCode": "",
  "statusCode": 200,
  "data": { ... }
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

| HTTP 상태 | `errorCode` | `error` (메시지) | 발생 조건 |
|-----------|-------------|------------------|-----------|
| `409 Conflict` | `EMAIL_ALREADY_USED` | 이미 존재하는 이메일 입니다. | 동일한 이메일로 이미 가입된 계정이 있는 경우 |
| `409 Conflict` | `NICKNAME_ALREADY_USED` | 이미 존재하는 닉네임 입니다. | 동일한 닉네임이 이미 사용 중인 경우 |
| `400 Bad Request` | _(없음)_ | class-validator 유효성 검사 실패 메시지 | `email` 형식 오류, 필수 필드 누락 등 |
| `500 Internal Server Error` | _(없음)_ | Internal server error | 서버 내부 오류 |

### 에러 예시

**이메일 중복**

```json
{
  "message": "FAIL",
  "error": "이미 존재하는 이메일 입니다.",
  "errorCode": "EMAIL_ALREADY_USED",
  "statusCode": 409,
  "data": null
}
```

**닉네임 중복**

```json
{
  "message": "FAIL",
  "error": "이미 존재하는 닉네임 입니다.",
  "errorCode": "NICKNAME_ALREADY_USED",
  "statusCode": 409,
  "data": null
}
```
