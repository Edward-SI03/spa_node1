# 주특기 입문 개인 과제
"Node.js와 express로 로그인 기능이 없는 나만의 항해 블로그 백엔드 서버 만들기"


1. 과제 목표

 - 서비스 완성
 - Directory Structure
 - AWS 배포


2. 서비스 완성

|기능|API URL|Method|req|res|예외처리|
|------|---|---|---|---|---|
|게시글 조회|/posts|GET|"user": "스파르타",| "message": "게시글을 생성하였습니다."|테스트3|
|---|---|---|"password": "1234",|---|---|
|---|---|---|"title": "제목",|---|---|
|---|---|---|"content": "글 내용"|---|---|
|게시글 작성|posts/:postId|POST|테스트3|테스트3|테스트3|
|게시글 상세 조회|posts/:postId|GET|테스트3|테스트3|테스트3|
|게시글 수정|posts/:postId|PUT|"password": "1234", "title": "수정 제목", "content": "수정 글 내용"|테스트3|테스트3|
|게시글 삭제|posts/:postId|DELETE|"password": "1234"|테스트3|테스트3|
|---|---|---|---|---|---|
|게시글 댓글 목록 조회|/comments/:postId|GET|테스트3|테스트3|테스트3|
|게시글 댓글 작성|/comments/:postId|POST|테스트3|테스트3|테스트3|
|게시글 댓글 수정|/comments/:commentId|PUT|테스트3|테스트3|테스트3|
|게시글 댓글 삭제|/comments/:commentId|DELETE|테스트3|테스트3|테스트3|
