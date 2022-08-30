## 프로젝트
<img width="350" alt="Screen Shot 2022-08-05 at 6 55 15 PM" src="https://user-images.githubusercontent.com/102135145/185027151-60ad490c-6a83-43a1-abde-bcdc4da396c7.png">
배포 사이트 : https://www.egorental.com<br>
시연 영상 : <a href="https://www.youtube.com/watch?v=hXkQHUCjkWM&ab_channel=%EB%A1%9C%EC%8A%88" target="blank" rel="noreferrer noopener">YouTube 바로가기</a><br>
프로젝트 일정 : 2022.07.07 ~ 2022.08.16<br><br>

프론트엔드 팀 Repository : https://github.com/MeoSeon12/egodaeyeo-frontend<br>
백엔드 팀 Repository : https://github.com/MeoSeon12/egodaeyeo-backend<br>
S.A 링크 : <a href="https://quixotic-wok-871.notion.site/S-A-3183ff7202e942099238af3effd956ea" target="blank" rel="noreferrer noopener">Notion 바로가기</a>

<br>

## 1. 프로젝트 주제
### 당근마켓 모티브 개인 간 대여 서비스 플랫폼

```
중고물품을 사고 팔 수 있는 플랫폼은 대표적으로 중고나라와 당근마켓이 있는 것처럼
잠깐 동안 필요한 물건이나, 내가 사고 싶었던 물건을 빌려서 써보기 위한
대여 서비스를 대표하는 플랫폼이 있으면 좋을 것 같다는 생각에서 출발했습니다.
```

<br>

## 2. 기술 스택
* ### 백엔드
  * Python 3.9
  * Django 4.0
  * Django Rest Framework 3.13
  * Django Rest Framework simple-jwt 5.2.0
  * Django Channels 3.0.5
  * Docker 20.10.12
  * Nginx 1.22.0
  * Gunicorn 20.1.0
  * Daphne 3.0.2

* ### 프론트엔드
  * Websocket
  * HTML5
  * Javascript
  * JQuery
  * CSS
  
* ### 데이터베이스
  * AWS RDS PostgreSQL
  * AWS S3

* ### 배포
  * AWS EC2
  * AWS Route 53
  * Github Actions
  * Netlify
<br>

## 2-1. 기술 스택 선정 이유
* **Django / DRF**
  > Serializer, 유저 관리, REST API 등 Django에서 제공하는 다양한 기능들을 사용하기 위해 채용
* **Django Channels**
  > 실시간 비동기로 들어오는 ws/wss 프로토콜을 장고에서 대응하기 위해 사용
* **Django Rest Framework simple-jwt**
  > 유저 인증을 토큰방식으로 암호화하기 위해 사용
* **Websocket**
  > 실시간 채팅 기능 구현에 있어 채팅을 칠 때마다 매번 HTTP 통신을 하는 것은 느리고 비효율적이기 때문에 실시간 비동기 프로토콜을 제공하는 웹소켓 기술을 사용
* **Netlify**
  > 가장 간편하고 비용 지불없이 정적 웹사이트 호스팅이 가능하며, 특별한 설정없이 깃헙과도 동기화되므로 사용
* **AWS EC2**
  > 용량을 줄이거나 늘릴 수 있는 탄력성을 가지고 있고, 보안 및 네트워크 구성, 스토리지 관리에 효과적이며 간단한 프로젝트 배포를 프리티어로 무료로 이용할 수 있다는 점에서 채용
* **AWS S3**
  > 서비스에서 이미지를 업로드 할때, EC2에 저장을 하게되면 용량이 부족해지고 파일들을 관리하기가 어렵습니다. 그래서 파일 저장에 최적화 되어있고, 저장용량이 무한대에 가까운 S3를 사용해서 이미지 파일들을 저장하고 관리 했습니다.
* **Github actions**
  > 프로젝트가 업데이트 될 때마다 수동으로 배포 서버를 업데이트 해야하는 불편함을 개선하기 위해 깃헙과 자동으로 동기화를 지원하는 깃헙 액션을 채용
* **Docker**
  > Docker는 소프트웨어를 컨테이너라는 표준화된 유닛으로 패키징하는데, 컨테이너에는 라이브러리, 시스템 도구, 코드, 런타임 등 소프트웨어를 실행하는데 필요한 모든것이 포함되어 있습니다. 이러한 특징을 가진 Docker를 활용해서 환경에 구애받지 않고 애플리케이션을 신속하게 배포 및 확장하고 규모가 달라져도 안정적으로 저렴하게 애플리케이션을 구축, 제공 및 실행 하기위해 사용했습니다.
* **Nginx**
  > event-driven의 비동기 구조인 특징을 가지고 있는 nginx는 채팅기능 때문에 동시접속자 수의 증가에 대응하기에 적합한 방식의 웹서버라고 생각했습니다. 또한 무중단 배포가 가능하여 채팅기능이 있는 웹사이트에서 배포시 중단되지 않는점이 사용자들에게 사용성 및 편의성을 증대시킵니다.
* **Gunicorn**
  > 로컬개발환경에서는 django의 runserver를 사용하여 gunicorn이 없어도 유용하게 사용 할 수 있지만, 배포환경에서는 runserver를 사용하지 않도록 django에서도 권장되어있습니다. 그래서 Python WSGI 대표적으로 성능이 검증된 Gunicorn을 활용해서 Nginx로부터 받은 서버사이드 요청을 gunicorn을 활용해서 django로 전달하게끔 했습니다.
* **Daphne**
  > Gunicorn이 WSGI HTTP요청을 처리한다면 저희 서비스에 있는 채팅기능은 ASGI WS 요청을 처리해야 합니다. Daphne는 Channels 를 설치하면 자동으로 설치되며 Channels에서 지원하는 서버로 ASGI 프로토콜로 받은 WS요청을 처리하려고 사용했습니다.
* **PostgreSQL**
  > PostgreSQL은 MySQL보다 표준에 더 가깝게 구현하는것을 목표로 두고있고, 오픈소스 및 커뮤니티가 이끄는 데이터베이스 입니다. django에서 가장 권장하는 RDBMS가 PostgreSQL이었기 때문에 이를 직접 사용해봄으로써 MySQL과는 어떠한 차이점이 있는지 공부도 하고, 다른 RDBMS를 사용해봄으로써 경험치를 쌓고자 사용했습니다.

<br>

## 3. 머선12조 팀원 및 역할
* ### **김규민** <a href="https://github.com/Roshu2">@Roshu2</a><br>
  물품 목록 페이지 / 마이페이지 / 소셜로그인 / 검색 기능 / Contract 기능 / 채팅 기능 / 백엔드 배포<br>

* ### **김철현** <a href="https://github.com/KimmyJay">@KimmyJay</a><br>
  회원가입 / 로그인 / 소셜로그인 / 리뷰 모달 / 채팅 모달 / 채팅 기능 / 다크모드 / 신고 기능 / 백엔드 배포<br>
  
* ### **최재완** <a href="https://github.com/Jaewan-Choi">@Jaewan-Choi</a><br>
  채팅 기능 / 알림 기능 / 물품 상세페이지 / 물품 등록, 수정 페이지 / 프론트 배포 / 다크모드 / 메인페이지 웰컴 박스<br>

<br>

## 4. 프로젝트 기능
* ### 회원가입 / 로그인
  - 일반 회원가입시 아이디와 비밀번호는 정규표현식 필터링됨
  - 다음주소 API를 사용해 간편한 주소 입력
  - 카카오톡 소셜 회원가입시 주소를 추가적으로 입력하도록 우회한 후 PUT으로 수정
  - 로그인시 JWT 토큰 발급 후 토큰 페이로드에는 유저PK값이 저장됨
- ### 물품 조회
  - 사용자 주소의 시군구까지만 split한 후 Q객체를 활용해서 시군구가 포함된 물품만  __contains filter하여 같은 지역만 조회
  - 파라미터에 카테고리를 담아서 request.GET.get을 통해 값을 변수에 저장한 후 Q객체를 활용해서 filter하여 다양한 카테고리별로 게시글 조회
  - 검색 입력값을 파라미터에 담아서 request.GET.get으로 값을 변수에 저장한 후 Q객체를 활용해서 __icontains filter하여 제목으로 검색
  - item의 id값을 url에 포함해 ItemModel에서 해당 id값으로 objects.get 한 뒤 serializer에서 필요한 데이터 직렬화 한 후 return하여 상세 정보 조회
- ### 물품 등록 / 수정 / 삭제
  - 사용자의 인풋값을 받은 폼데이터를 POST 요청을 통해 DB에 저장
  - 프론트에서는 인풋의 포맷에 제한 두기, null 체크 등을 진행
  - 백엔드에서는 벨리데이션을 통해 모델에 적합한 데이터인지 검사
  - 수정 시 게시글의 ID값을 활용하여 GET 요청으로 DB에 저장된 데이터를 활용
  - 수정 시 최종적으로 수정된 데이터를 PUT 요청을 통해 DB에 반영
  - 삭제 시 작성자 본인 여부를 토큰의 payload와 DB의 데이터를 교차검증을 통해 체크 후 삭제
- ### 신고
  - 물품 상세페이지에서 부적절하다고 판정되는 물품 신고 가능
  - 드랍다운 메뉴로 신고 사유 선택, 추가적인 내용 작성 가능
  - 이미 신고한 물품은 중복신고 불가
- ### 리뷰
  - 마이페이지와 채팅모달에서 대여종료된 물품의 리뷰쓰기 가능.
  - 대여자는 별점(1-5)를 선택 후 추가적인 리뷰 작성 가능.
  - 별점은 100점 스케일로 전환된 후 유저점수에 반영됨.
  - 리뷰는 물품 상세페이지에 자동적으로 반영됨.
- ### 채팅
  - 개별 채팅방 오픈 시 개별 채팅방의 ID값을 활용해 채팅방 마다 다른 웹소켓 주소에 연결
  - 채팅 작성 혹은 거래 상태 업데이트 시 send()로 데이터를 백엔드에 전송
  - Django Channels의 @database_sync_to_async 데코레이터와 create() 메소드로 데이터를 DB에 저장
  - 채팅 그룹으로 데이터를 전송하고 sender 값을 체크하여 작성자와 수신자에 맞게 레이아웃을 보여줌
  - 채팅방을 닫거나 다른 채팅방 오픈 시 기존 접속 채팅 웹소켓 websocket.close() 메소드를 사용하여 연결을 끊음
- ### 채팅 알림
  - 로그인 시 유저 고유의 웹소켓 주소로 연결
  - 채팅을 보낼 때 수신 유저의 웹소켓 주소로 send()
  - Django Channels로 wss 프로토콜(ASGI)을 처리
  - 채팅 메시지 DB 모델에 is_read 필드를 추가하여 읽은 여부를 판단 후 알림을 보냄
  - 수신자는 onmessage()를 통해 응답 데이터를 처리
  - 채팅을 읽으면 is_read 필드를 True로 수정
- ### 마이페이지
  - 마이페이지의 좌측 탭별로 html의 id값을 ongoing, closed, bookmarks, myitems 로 지정한 뒤 tab이라는 이름으로 파라미터에 id값을 GET요청할때 담아서 백엔드로 보내고 request.GET.get으로 받은 값을 조건문을 통해 비교해서 해당 값에 필요한 Data를 filter 후 return하여 대여 내역, 찜 목록, 내가 올린 물품 조회
  - 회원 정보를 한가지만 수정해도 수정할 수 있게 하기 위해 조건문을 활용, request.data는 immutable한 QueryDict이기 때문에 request.data를 data라는 변수에 담고 
  data = data.copy()로 복사하여 복사한 데이터를 data로 덮어씌운뒤 data.pop(”수정안한 항목”) 하여 serializer로 data를 보냄.
  - 회원정보 중 비밀번호 수정시 django의 내장함수인 check_password를 활용해서 현재 비밀번호와 입력한 현재비밀번호가 일치한지 check
- ### 다크모드
  - 로그인 유저의 로컬 스토리지에 다크모드 여부를 저장
  - 로컬스토리지의 다크모드 값을 if문의 분기점으로 다른 스타일을 적용

<br>

## 4-1. 프로젝트 담당 역할(김규민)
* ### 채팅 기능 (공동 작업 with 최재완)

  - 개별 채팅방 오픈 시 개별 채팅방의 ID값을 활용해 채팅방 마다 다른 웹소켓 주소에 연결
  - 채팅 작성 혹은 거래 상태 업데이트 시 send()로 데이터를 백엔드에 전송
  - Django Channels의 @database_sync_to_async 데코레이터와 create() 메소드로 데이터를 DB에 저장
  - 채팅 그룹으로 데이터를 전송하고 sender 값을 체크하여 작성자와 수신자에 맞게 레이아웃을 보여줌
  - 채팅방을 닫거나 다른 채팅방 오픈 시 기존 접속 채팅 웹소켓 websocket.close() 메소드를 사용하여 연결을 끊음  
  
* ### Contract 기능  

  - 채팅과는 별도의 WebSocket을 사용하여 ContractConsumer로 별도로 연결
    > @database_sync_to_async 데코레이터를 활용하여 별도의 DB 조작을 하기 위함.  
    [📍 ContractConsumer](https://github.com/Roshu2/egodaeyeo-backend/blob/6edb5e8b0f9ac20d24403f0a949c1d19b012e7ad/chat/consumers.py#L131)
  - 개별 채팅방안에서 채팅으로 상의 후 문의자가 대여 신청을 통해 계약 날짜를 지정해서 신청
    > 신청시 contract모델을 생성하고 status는 "검토 중" 상태가 됨.
  - 문의 받은 사람은 별도의 대여신청 메시지를 받게되고 클릭시 문의자가 보낸 날짜를 확인하고 수락하거나 거절 가능
    > 수락 시 contract모델의 status를 "대여 중"상태로 수정이 되며 대여가 진행되는 상태로 되고  
    > 거절 시 contract모델을 delete하여 contract가 없던 상태로 돌아감.
  - 대여 상태일때 대여 종료버튼은 author만 활성화 되어있으며 클릭시 대여 종료
    > contract모델의 status를 "대여 종료"로 수정이 되며 대여 종료
  - 채팅방 상단의 초기 대여신청 버튼이 비동기로 status,author,inquirer 정보를 토대로 신청, 종료, 리뷰, 종료된 물품 등으로 변화
  - 마이페이지에서도 동일한 기능을 수행할 수 있게 JavaScript와 HTML, CSS  

* ### Social 로그인 (공동 작업 with 김철현)

  - KaKaoAPI를 활용하여 소셜로그인 구현  
  - 복잡한 소스코드들을 기존에 배웠던 APIView에 적용시켜서 단순한 코드로 변환
  - simple-jwt의 RefreshToken을 활용하여 일반 로그인과 동일한 방법의 JWT토큰 방식 로그인 구현
    > [📍 KaKaoAPIView](https://github.com/Roshu2/egodaeyeo-backend/blob/6edb5e8b0f9ac20d24403f0a949c1d19b012e7ad/user/views.py#L109)  

* ### 검색 기능 

  - Q객체를 활용하여 간단한 제목 검색 기능 구현  
    > [📍 검색 기능 View](https://github.com/Roshu2/egodaeyeo-backend/blob/6edb5e8b0f9ac20d24403f0a949c1d19b012e7ad/item/views.py#L59)  

* ### 메인페이지 물품 목록  

  - Category와 Section을 파라미터에 담아서 백엔드로 request ItemListview에서 여러가지 분기문과 Q객체를 활용한 query로 분류
  - 물품이 많을 경우 로딩문제를 생각하여 Pagination적용 (12개의 물품씩)
    > [📍 ItemListView](https://github.com/Roshu2/egodaeyeo-backend/blob/6edb5e8b0f9ac20d24403f0a949c1d19b012e7ad/item/views.py#L26)  

* ### 마이페이지  
  
  - 회원 정보 수정, 탈퇴
    > [📍 회원 정보 수정 View](https://github.com/Roshu2/egodaeyeo-backend/blob/6edb5e8b0f9ac20d24403f0a949c1d19b012e7ad/user/views.py#L54)
  - 마이페이지의 각 Tab 에 해당하는 정보를 불러오기 위한 View
    > [📍 MyPageView](https://github.com/Roshu2/egodaeyeo-backend/blob/6edb5e8b0f9ac20d24403f0a949c1d19b012e7ad/user/views.py#L151)
  - 유저 피드백을 받을 수 있는 피드백 작성 Post
    > [📍 FeedbackView](https://github.com/Roshu2/egodaeyeo-backend/blob/6edb5e8b0f9ac20d24403f0a949c1d19b012e7ad/help/views.py#L9)
  
* ### 백엔드 서버 배포  

  - PowerShell로 AWS EC2 ubuntu 컴퓨터에 접속하여 linux환경에서 Docker를 활용해서 배포
  - DockerFile과 docker-compose.yml을 작성  
    > [📍 docker-compose.yml](https://github.com/Roshu2/egodaeyeo-backend/blob/6edb5e8b0f9ac20d24403f0a949c1d19b012e7ad/docker-compose.prod.yml#L1)
  - nginx.config 파일 작성
    > [📍 nginx.conf](https://github.com/Roshu2/egodaeyeo-backend/blob/6edb5e8b0f9ac20d24403f0a949c1d19b012e7ad/nginx/nginx.conf#L1)
  - AWS RDS로 PostgreSQL 데이터베이스를 생성하여 사용
  - AWS S3로 이미지 업로드 설정 (권한 설정)

<br>
담당했던 모든 기능을 풀스택으로 작업하였습니다<br>

<br>

## 4-2. 트러블 슈팅(김규민)
### 채팅방 개별 연결 문제  
> 처음에 채팅 기능을 구현 했을때 다른 채팅방에 접속을해도 채팅이 보내지는 현상이 발생했습니다.<br>
> 원인은 기존의 연결이 끊어지지 않고 유지되어서 채팅방을 옮겼다고 생각했지만 WebSocket은 같은 것을 사용하고 있었습니다.<br>

→ 각 채팅방을 클릭했을때 WebSocket의 연결을 JS의 WebSocket.close() 메소드를 활용하여 닫아주고 새롭게 연결되게 하여 이 문제를 해결 하였습니다.<br>
[📍 채팅방 Open JS](https://github.com/Roshu2/egodaeyeo-frontend/blob/cd0e781880b103d9beb2f282cda156026a67ebd0/index/js/chat.js#L985)

### Pagination next URL http / https 문제
> https 프로토콜 송신이 가능하게 설정한 후에 pagination에서 보내주는 next url도 http에서 https로 바꿔야 하는 문제가 발생했습니다.<br>

→ StackOverFlow를 활용해서 해결법을 찾아서 아래의 코드를 settings.py에 추가해주고
```python  
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
```  
→ nginx.conf 에 아래의 내용을 기본 location부분에 추가를 하여 pagination의 next url도 https로 보내지게 해결하였습니다.<br>
```
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
```
<br>


### 대여 종료후 같은 물품 재대여 불가능 문제
> 대여를 하다보면 같은 제품이 마음에 들어서 또 대여를 하고싶은 경우가 생길 수 있습니다.<br>
> 그래서 재대여를 하려고 할 시, 기존의 로직이 contract가 이미 존재할 경우 새롭게 생성되지 않도록 막아놨었습니다.<br>
> 그리고 채팅방도 기존의 채팅방이 열리게 되는 현상도 중복으로 겹쳤었습니다.<br>

→ 채팅방에 연결된 contract의 status를 체크해서 대여 종료일시에는 새롭게 채팅방을 생성<br>
→ contract의 status를 체크해서 대여 종료일시에는 새롭게 contract를 생성하게 하여 문제를 해결하였습니다.<br>
[📍 Contract 생성 View](https://github.com/Roshu2/egodaeyeo-backend/blob/dca4d98abd871ab7591b2f41b88bcefa49eb554a/contract/views.py#L26)  
[📍 채팅방 생성 View](https://github.com/Roshu2/egodaeyeo-backend/blob/dca4d98abd871ab7591b2f41b88bcefa49eb554a/chat/views.py#L31)

<br>

## 5. API 명세서
<a href="https://documenter.getpostman.com/view/20826963/VUqymsv9#intro">포스트맨 DOCS 바로가기</a>

<br>

## 6. DB 설계 ERD
https://www.erdcloud.com/d/zfZo5E3pKdEorSGBX
<img src="https://user-images.githubusercontent.com/104349901/185032482-c6b7c6c8-a164-4b71-8318-ba74ef12a1d5.png">

<br>

## 7. 유저 피드백 반영
* 피드백 기간 : 22.08.08 ~ 22.08.12
* 피드백 응답 수 : 44개

## 7-1. 401 에러
* 원인 : 리프레시 토큰을 갱신하는 함수가 페이지 로드 시에만 작동하고, 비동기 기능을 실행 시에는 해당 함수가 동작하지 않음
* 개선 : 토큰 갱신하는 함수를 기능마다 호출하도록 수정
```js
async function onAddressEnter() {
  var payload = JSON.parse(localStorage.getItem('payload'))
  const token = await refreshToken(payload)
```
<br>

## 7-2. UI / UX 개선
* 원인 : 버튼 아이콘들의 가시성과 대여 상태 업데이트 기능이 채팅창에만 존재함으로 인해 접근성 부족
* 개선

  * 카테고리 버튼들을 호버시 등장하는 모달이 아닌 페이지에서 바로 보고 선택할 수 있도록 개선
  * 물품 등록 버튼을 fixed 된 박스안에도 추가하여 항상 눈에 보이고 접근할 수 있도록 추가
  * 대여 상태 업데이트 기능들을 마이페이지에서도 접근 가능하도록 추가

<details>
  <summary>개선된 이미지 보기</summary>
  <br>
  <img src="https://user-images.githubusercontent.com/102135145/186374590-0f5bf958-2488-4c87-a3d4-88ce5e13a840.png">
  <img src="https://user-images.githubusercontent.com/102135145/186375042-c7bf800a-3302-4bde-a85c-9d37d028606b.png">
  <img height=174 src="https://user-images.githubusercontent.com/102135145/186374778-d684c339-67f1-4b09-9fd9-6e4a14b01856.png">
</details>
<br>

## 7-3. 신고 기능
* 원인 : 부적절한 게시글을 신고할 수 있는 기능 부재
* 개선

  * 신고 내용을 저장하는 DB 모델을 추가
  * 사용자가 특정 게시글에 대해 신고 사유를 선택, 내용 작성 후 운영진에게 전달할 수 있는 시스템 구축

<br>
