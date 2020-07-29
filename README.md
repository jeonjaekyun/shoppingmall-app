# Shoppingmall-App

## 주제
Nodejs와 React를 통해 만든 Shoppingmall-App

## 개발 언어 및 IT Skill
- JavaScript
- nodejs, react, redux, express
- MongoDB, Mongoose

## 구조도
![Chart](https://user-images.githubusercontent.com/39545165/87869191-baa95580-c9d8-11ea-8ca6-b05fcd18ddb2.jpg)

## DataBase
![DB](https://user-images.githubusercontent.com/39545165/87869192-baa95580-c9d8-11ea-804a-a96a90ffc59d.jpg)

## 주요 기능
- 로그인/회원가입
- 상품 등록/ 상품 상세 페이지
- 장바구니
- 상품평 등록(댓글)

## 주요 개발 사항

데이터베이스
-	MongoDB의 스키마를 적용하기 위해 Mongoose 사용

회원가입
-	비밀번호 암호화를 위해 Bcrypt 사용

로그인
-	아이디를 토큰화 하기 위해 Jsonwebtoken 사용
-	redux store에 user 정보 저장

인증
-	auth.js 라는 Middleware를 만들어서 구현
-	인증이 필요한 기능에서 auth.js를 적용

상품 등록
-	frontend에서 이미지를 받아오기 위해 react-dropzone 사용
-	backend에서 local에 사진을 저장하기 위해 multer를 사용

장바구니
-	상품 등록, 삭제 등의 기능

상품평
-	로그인한 회원과 댓글을 작성한 회원과 일치하면 댓글 삭제 버튼 활성화

## Screenshot

### 로그인 / 회원가입
<div>
  <img width="200" src="https://user-images.githubusercontent.com/39545165/87869194-bbda8280-c9d8-11ea-9631-02c9802fa7bd.png">
  
  <img width="200" src="https://user-images.githubusercontent.com/39545165/87869197-bd0baf80-c9d8-11ea-8300-5372b0f0037b.png">
</div>

### 메인페이지 / 상품 상세 페이지
<div>
  <img width="200" src="https://user-images.githubusercontent.com/39545165/87869193-bb41ec00-c9d8-11ea-902d-1b2ed90918e6.png">
  
  <img width="200" src="https://user-images.githubusercontent.com/39545165/87869196-bc731900-c9d8-11ea-9933-b6881f6575ce.png">
</div>

### 상품 등록 / 장바구니
<div>
  <img width="200" src="https://user-images.githubusercontent.com/39545165/87869198-bd0baf80-c9d8-11ea-8379-2cda8bdc4497.png">
  
  <img width="200" src="https://user-images.githubusercontent.com/39545165/87869190-b9782880-c9d8-11ea-8346-a2477a1774cc.png">
</div>
