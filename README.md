# 주특기 입문 개인 과제
"Node.js와 express로 로그인 기능이 없는 나만의 항해 블로그 백엔드 서버 만들기"


1. 과제 목표

 - 서비스 완성
 - Directory Structure
 - AWS 배포


2. 서비스 완성

|기능|API URL|Method|req|res|예외처리|
|---|---|---|---|---|---|
|게시글 조회|/posts|GET|---|"postId": "62d6d12cd88cadd496a9e54e",|---|
|작성 날짜 기준으로 내림차순 정렬|---|---|---|"user": "스파르타",|---|
|---|---|---|---|"title": "제목1",|---|
|---|---|---|---|"createdAt": "2022-07-19T15:43:40.266Z"|---|
|---|---|---|---|"postId": "62d6cc66e28b7aff02e82954",|---|
|---|---|---|---|"user": "Developer",|---|
|---|---|---|---|"title": "안녕하세요",|---|
|---|---|---|---|"createdAt": "2022-07-19T15:23:18.433Z"|---|
|게시글 작성|posts/:postId|POST|"user": "Developer",|"message": "게시글을 생성하였습니다."|---|
|---|---|---|"password": "1234",|---|---|
|---|---|---|"title": "제목",|---|---|
|---|---|---|"content": "글 내용"|---|---|
|게시글 상세 조회|posts/:postId|GET|---|"postId": "62d6d12cd88cadd496a9e54e",|postsId 유효성 검사,|
|---|---|---|---|"user": "스파르타",|해당 게시물 유무 확인|
|---|---|---|---|"title": "제목1",|---|
|---|---|---|---|"content": "글 내용",  |---|
|---|---|---|---|"createdAt": "2022-07-19T15:43:40.266Z"|---|
|게시글 수정|posts/:postId|PUT|"password": "1234",|"message": "게시글을 수정하였습니다."|postsId 유효성 검사,|
|비밀번호 일치시 수정|---|---|"title": "수정 제목",|---|해당 게시물 유무 확인,|
|---|---|---|"content": "수정 글 내용"|---|비밀번호 확인|
|게시글 삭제|posts/:postId|DELETE|"password": "1234"|"message": "게시글을 삭제하였습니다."|postsId 유효성 검사,|
|비밀번호 일치시 삭제|---|---|---|---|해당 게시물 유무 확인,|
|---|---|---|---|---|비밀번호 확인|
|---|---|---|---|---|---|
|댓글 목록 조회|/comments/:postId|GET|"user": "르탄이",|"commentId": "62d6d3fd30b5ca5442641b94",|postsId 유효성 검사,|
|작성 날짜 기준으로 내림차순 정렬|---|---|"password": "1234", |"user": "Developer",|해당 게시물 유무 확인|
|---|---|---|"content": "르탄이 댓글"|"content": "댓글",|---|
|---|---|---|---|"createdAt": "2022-07-19T15:55:41.490Z"|---|
|게시글 댓글 작성|/comments/:postId|POST|"user": "Developer",|"message": "댓글을 생성하였습니다."|postsId 유효성 검사,|
|댓글 공백시 작성 불가능|---|---|"password": "1234",|---|해당 게시물 유무 확인,|
|---|---|---|"content": "안녕하세요 댓글입니다."|---|댓글 내용 공백 확인|
|게시글 댓글 수정|/comments/:commentId|PUT|"password": "1234",|"message": "댓글을 수정하였습니다."|postsId 유효성 검사,|
|댓글 공백시 작성 불가능|---|---|"content": "르탄이 댓글"|---|해당 게시물 유무 확인,|
|비밀번호 일치시 수정|---|---|---|---|댓글 내용 공백 확인,|
|---|---|---|---|---|비밀번호 확인|
|게시글 댓글 삭제|/comments/:commentId|DELETE|"password": "1234"|"message": "댓글을 삭제하였습니다."|postsId 유효성 검사,|
|비밀번호 일치시 삭제|---|---|---|---|해당 게시물 유무 확인,|
|---|---|---|---|---|비밀번호 확인|


3. Directory Structure

.

├── app.js

├── routes

│   ├── index.js

│   ├── comments.js

│   └── posts.js

└── schemas

    ├── index.js

    ├── comment.js

    └── post.js
 

 4. AWS 배포
 
 https://jinyeop.shop
