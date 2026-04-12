# POST /auth/email-verification

> 이메일 인증 링크를 해당 이메일로 전송합니다. (회원가입, 비밀번호 재설정, 계정 삭제 목적)

---

## 기본 정보

| 항목          | 내용                       |
| ------------- | -------------------------- |
| **메서드**    | `POST`                     |
| **URL**       | `/auth/email-verification` |
| **인증 필요** | 없음                       |

---

## 요청

### Path Parameters

없음

### Query Parameters

없음

### Request Body

`Content-Type: application/json`

| 필드      | 타입     | 필수 | 설명                                                     |
| --------- | -------- | ---- | -------------------------------------------------------- |
| `email`   | `string` | ✅   | 이메일 형식이어야 합니다                                 |
| `purpose` | `string` | ✅   | 인증 목적 (`SIGNUP`, `RESET_PASSWORD`, `DELETE_ACCOUNT`) |

**예시**

```json
{
  "email": "user@example.com",
  "purpose": "RESET_PASSWORD"
}
```

### Purpose 값

| 값               | 설명                             |
| ---------------- | -------------------------------- |
| `SIGNUP`         | 회원가입용 이메일 인증           |
| `RESET_PASSWORD` | 비밀번호 재설정용 인증 링크 전송 |
| `DELETE_ACCOUNT` | 계정 삭제용 인증 링크 전송       |

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

| HTTP 상태                   | `errorCode`          | `error` (메시지)                        | 발생 조건                                                                          |
| --------------------------- | -------------------- | --------------------------------------- | ---------------------------------------------------------------------------------- |
| `409 Conflict`              | `EMAIL_ALREADY_USED` | 이미 존재하는 이메일입니다.             | `purpose`가 `SIGNUP`이고 해당 이메일이 이미 존재하는 경우                          |
| `404 Not Found`             | `USER_NOT_FOUND`     | 존재하지 않는 이메일입니다.             | `purpose`가 `RESET_PASSWORD` 또는 `DELETE_ACCOUNT`이고 가입되지 않은 이메일인 경우 |
| `400 Bad Request`           | _(없음)_             | class-validator 유효성 검사 실패 메시지 | `email` 형식 오류, 필수 필드 누락, 잘못된 `purpose` 값 등                          |
| `503 Service Unavailable`   | `EMAIL_SEND_FAILURE` | 이메일 전송에 실패했습니다.             | 메일 서버 오류 등 이메일 전송 실패                                                 |
| `500 Internal Server Error` | _(없음)_             | Internal server error                   | 서버 내부 오류                                                                     |

### 에러 예시

**존재하지 않는 이메일**

```json
{
  "message": "FAIL",
  "error": "존재하지 않는 이메일입니다.",
  "errorCode": "USER_NOT_FOUND",
  "statusCode": 404,
  "data": null
}
```

**이메일 전송 실패**

```json
{
  "message": "FAIL",
  "error": "이메일 전송에 실패했습니다.",
  "errorCode": "EMAIL_SEND_FAILURE",
  "statusCode": 503,
  "data": null
}
```
