# 그날쿠폰 서버 / Nodejs :open_file_folder:

### Project Manage - Server

- __개발목표 & 기획목표__

- __설계패턴__

- __코딩원칙__ : 최소한의 코딩 원칙이 있어야 한다. 하나의 함수 길이, 모듈화 원칙, 인터페이스 사용과 통신 등 기본적인 원칙이 없어서 기능은 비슷하고 구현은 됬으나 코드가 달라 문제가 생겼을 때 빨리 대처하기가 힘들다
    - 어플리케이션 단위

    - 설계 단위
       
    - 구현 단위
        - 모듈화
        - 명시적 네이밍
        

- __버전관리__ : 이때까지는 버전관리를 하지 않고 했지만 이는 무계획성을 여실히 보여준다. 기능을 모듈화 하고, issue를 발행해서 필요한 부분을 나눠 개발해야 하루 코딩량을 할 수 있고, 개인 퍼포먼스를 측정할 수도 있다. 적어도 스스로가 얼만큼 할 수 있는지는 알아야 한다. 뿐만 아니라 중간에 끊어질 경우 어디까지 했는지도 모르겠고, 문제가 생길 경우에 코드를 되돌릴 수도 없으니 시간이 수배로 들어가는 것이다. 혼자 개발하더라도 버전관리가 반드시 필요하다.
    - SourceTree

- __스크럼__ : 매일 할 일을 정하지 않고 하고 싶은 곳을 골라서 하고, 계획을 세우지 않았으니 디테일하게 구현되지 않은 부분이나 중간에 넘어간 부분을 알기도 어렵고, 하루 개발한 내용을 정리하지 않았기 때문에 다음날 바로 개발을 이어나가기 힘들다. 반드시 할 일을 정하고 또 하루 중 개발한 내용은 구체적으로 정리할 필요 있음.
    - 일단위 : 할 일, 한 일 정리, 버전관리, 코드정리, 공부내용 정리(daily readme)
    - 주단위 : 진도 파악, 주 단위 버전관리, 코드정리, 공부내용 정리, 유지보수
    - 월단위

- __(공부)내용 정리__ : 필요한 자료를 찾아볼 때 정리하면 시간이 더 걸리는 게 아니라 정리하지 않으면 오히려 시간이 더 걸린다. 뿐만 아니라 빨리 구현하려고 실행되는 코드만 알고 있으면 오히려 시간이 더 걸린다. 따라서 필요한 내용이 있으면 반드시 공식문서부터 찾아보고, 그 후 블로그나 스택에 가서 실제 어떻게 코드를 구현했는지, 장단점은 무엇인지 찾아봐야 한다. 또한 중간에 구현하면서 실패한 부분 또한 공부한 내용으로 기록해야 한다. 정리하지 않을 경우 프로젝트를 지나고 나면 많은 부분 다음에도 같은 실수를 하게 됨.
    - 데일리 README 작성
    - 블로그 정리

- __주기적인 코드정리__ :  모듈화, 콜백정리 하지 않음. 마지막에 한꺼번에 하는게 아니라 주기를 정해서 하루 코딩한 내용은 그날 정리해야지 마지막에 하려고 하면 부분부분에 치우치게 되고, 하나하나의 부분은 잘 알지만 전체 안에서의 부분을 알기 힘들다
    - 설계패턴
    - 코딩원칙
    - .gitignore

- __주기적, 계획적인 테스트__
    - 단위테스트 : TDD
    - POSTMAN

## __1. 설계__ :open_file_folder:

[화면설계](), [데이터베이스 설계]()가 완성된 상황에서 진행해야 한다.

### 어플리케이션 단위(설정 영역)

- 버전관리 : Git(SourceTree)
- 보안
    - Apache
    - HTTPS
    - OAuth 2.0(token 설계)

### 설계 단위

- (1) 서버 설계 패턴 & 모듈
    - 서버 설계 패턴
    - express : 이번 프로젝트의 경우 express 모듈을 사용하지 않고 개발했으나 express 모듈을 사용하면 코드를 편리하게 개발, 유지/보수 할 수 있다. 또 각종 모듈을 쉽게 사용하고 수 있으며 express가 다양한 최신 모듈을 지원한다. express 모듈 자체를 공부할 필요가 있고, 구현해 보면 좋은 경험이 될 듯 하다. express를 굳이 사용하지 않을 필요 없음

- (2) 관리, 디버깅 모듈
    - ESLint
    - Supervisor / nodemon
    - 로깅

- (3) 내부모듈 설계(모듈화)
    - server.js / app.js
    - router(express를 사용할 경우 따로 router을 모듈화 하지 않음)
        - METHOD
        - REST
        - path
    - controller
        - 버전
        - 회원
        - 메인데이터
        - 서브데이터
    - dao(data access object)
        - 버전
        - 회원
        - 메인데이터
        - 서브데이터
    - database
    - private_module
    - response
        - res
        - error
    - config

- (4) server.js / app.js
    - 도메인, 포트
    - 데이터베이스 연결 생성 & 연결
    - 서버 생성 & 연결

- (5) REST 설계
    - 회원
    - 버전
    - 메인데이터
    - 서브데이터

- (6) controller 설계 : 어떻게 구현해야 할지 flow를 설계한다. 단순히 데이터베이스 쿼리만 하는 것은 간단하지만 여러 요청이 혼합되어 있는 경우 콜백이 계속 이어지거나 트랜젝션을 적용해야 할 수 있다. 따라서 무작정 구현하기보다는 먼저 설계하는 게 좋다. 또한 핵심 데이터를 중심으로 서브데이터를 확장해 나가는 방식으로 순서를 정하거나, 이미지, 음악파일과 같이 익숙하지 않은 경우에 미리 그 flow를 이해하도록 한다.
    - member : 회원 & 회원권한 설정
    - version : 데이터베이스 버전
    - coupon
    - detail_photo
    - logo
    - favorite : workflow
    - wrong_info
    - request_coupon

- (7) 응답 설계
    - response(result) : 응답객체
        - 토큰(token)
        - 응답 데이터 개수(totalCount)
        - 응답 코드(CODE)
        - 응답 메시지(MESSAGE)
        - 응답 데이터(rows)
    - error
        - 400 : bad request
        - 404 : page not found
        - 500 : internal server error

- (8) nodejs 콜백체인
    - Promise, Generator
    - await & async
    - Q, blueprint

- (9) 외부모듈 관리
    - package.json

### 구현 단위
  
- 모듈화
- 명시적 네이밍
- 콜백 & 트랜젝션 관리 : 트랜젝션을 사용할 것인지 아니면 하나하나 따로 요청할 것인지 결정한다. 로고파일의 경우는 하나하나를 받아오고 실패한 것들만 따로 받아오는 게 좋지만 하나가 실패할 경우 의미가 없어지게 되는 다중 즐겨찾기 삭제나 로그인, 회원가입의 경우 트랜젝션으로 처리해준다. 현재 프로젝트에서는 트랜젝션을 사용하지 않음.
   

## __2. 구현__ :open_file_folder:

### (1) server

- 데이터베이스 연결 : 연결할 때마다 데이터베이스 연결을 생성하지 않고 미리 커넥션 풀을 만들어 리턴한다.

    ```javaScript
        db.connect(err=>{
            if(err){
                console.log('데이터베이스에 접속할 수 없습니다');
                console.log(err);
            } else {
                console.log('[1] DATABASE IS RUNNING...');
            }
        });
    ```

- 서버 생성, 연결

    ```javaScript
    var server = http.createServer((request, response)=>{
        router.route(request, response);
    });

    server.listen(port, hostname, ()=>{
        console.log(`[2] SERVER IS RUNNING AT http://${hostname}:${port}`);
    });
    ```

### (2) router

- METHOD
    - precessMethod -> process()

    ```javaScript
        switch(request.method){
            case 'GET':
                console.log('[3.1] GET');
                processGET.process(request, response);  
                break;
            ```
        }
    ```

- REST 설계 : RESTful 설계가 복잡하면 클라이언트에서도 요청이 복잡해진다. REST에서 호출하는 컨트롤러의 함수 설계(이름 포함)가 복잡하거나 직관적이지 않으면 요청이 다양해 질 경우 관리가 힘들어진다. 시간이 걸리더라도 명확한 REST 설계가 매우 중요하다. 설계패턴, 모둘화, 재사용성을 고려하고 함수명은 최대한 직관적으로 만들도록 한다.

    - precessGET -> process()
    - processPOST -> process()
    - processPUT -> process()
    - processDELETE -> process()
    
    ```javaScript
        exports.process = function(request, response){        
            var pathname = routerUtil.parsePathname(request);
            console.log('[3.2] '+ routerUtil.parsePath(request)); 
            if(pathname[1] == 'coupon' && pathname[2] == 'all'){
                console.log('[3.3] 쿠폰 전체 데이터');
                coupon.readAll(request, response);
            } 
            ```
        }
    ```
    
### (3) controller

    콜백체인을 생각하지 않은 상황에서 무작정 콜백을 엮어서 사용함. 추후 promise부터 generator, await&async, Q, blueprint까지 적용

- __member__ : 가장 먼저 구현한다. 방문자, 임시회원, 회원가입 회원, 관리자 중 어떤 권한으로 서비스를 사용하고 있는지를 먼저 결정해야 한다. 권한 설정에 따라 할 수 있는 일이 다르거나, 토큰을 적용할 경우 먼저 멤버를 구현하지 않으면 코드 추가와 함께 코드 수정이 많이 복잡해 질 수 있다. 권한 설정에 따라 이용 가능한 서비스를 미리 결정해야 한다.
    
    - WorkFlow
        - 방문자 : 클라이언트에서 임시로 아이디를 생성해서 토큰을 발급받는다. 토큰이 없으면 어떤 요청도 할 수 없음. 임시 아이디이기 때문에 서비스 제한이 있을 수 있음.
        - 소셜로그인 : 로그인 인증을 소셜로그인으로 한다. 인증과 함께 토큰을 소셜서비스에서 제공해 주는데, 이를 통해서 정해진 기간만큼 로그인을 유지할 수 있다. 로그인하면서 받아온 필요한 데이터는 리소스서버(리모트 서버)로 받아오고, 발급받은 토큰에 대하여 두가지 길이 있다. 첫번쨰는 받아온 토큰을 클라이언트에 저장한 후 서버에서 발급받은 토큰을 함꼐 요청하여 REST로 인증하는 것이다. 두번째는 처음 인증 후 독자적인 OAuth 2.0 인증&권한을 구현하는 것이다.
        - 회원로그인 : 로그인을 회원가입 한 아이디로 한다. 회원가입 하면서 혹은 로그인 하면서 토큰을 받아오고 클라이언트에는 아이디나 비밀번호를 저장하지 않는다. 토큰과 권한을 같이 요청하면 서버에서 OAuth2.0 토큰 인증절차를 거쳐서 응답해준다. 서버에서 여러 인증을 할 경우 passport 사용. 비밀번호를 저장할 경우 절대 서버에 비밀번호를 그대로 저장하지 않고 암호화 모듈을 사용해서 salt와 hash를 저장한다
        - 관리자
        - 인증 : 본인인증/회원인증, 사용자 인증관리가 힘들 경우 로그인, 회원가입에서 firebase 인증을 도입하도록 한다.
    
    - searchMember
    
    - create

        ```javaScript
            // 일반 로그인
            if(dataObj.password == null){
                dao.insert(dataObj, qs, (err, rows)=>{
                    if(err) return error.send(response, 500, err);
                    if(!qs.temp_id) return send(response, rows, "정상 처리되었습니다");
                    dao.delete(qs, (err, rows)=>{
                        if(err) return error.send(response, 500, err);
                        return send(response, rows, "정상 처리되었습니다");
                    });
                });
                // 소셜로그인
            } else {
                hashPassword(dataObj, qs, (hash, salt)=>{
                    dao.insertWithPassword(dataObj, hash, salt, qs, (err, rows)=>{
                        if(err) return error.send(response, 500, err);
                        if(!qs.temp_id) return send(response, rows, "정상 처리되었습니다");
                        dao.delete(qs, (err, rows)=>{
                            if(err) return error.send(response, 500, err);
                            return send(response, rows, "정상 처리되었습니다");
                        });
                    });
                })
            }
        ```
    
        ```javaScript
            function hashPassword(dataObj, qs, callback){
                hasher({password:dataObj.password}, function(err, pass, salt, hash){
                    console.log(err, pass, salt, hash);
                    callback(hash, salt)
                });
            }
        ```

    - login
    
        ```javaScript
            exports.login = function(request, response){
                console.log('[4] CONTROLLER member-login');
                var postData = '';
                request.on('data', (data)=>{
                    postData += data;
                });
                request.on('end', ()=>{
                    var dataObj = JSON.parse(postData);
                    var pwd = dataObj.password;
                    dao.login(dataObj, (err, rows)=>{
                        if(err) return error.send(response, 500, err);
                        if(rows.length > 0) return unHashPassword(response, pwd, rows);
                        return send(response, rows, "non_exists")
                    })
                });
            }
        ```
    
        ```javaScript
            function unHashPassword(response, pwd, rows) {
                hasher({password:pwd, salt:rows[0].salt}, function(err, pass, salt, hash){
                    if(hash === rows[0].password){
                        result.member.push({username : user.username});
                        return send(response, rows, "exists");         
                    } 
                    return send(response, [], "wrong");
                });
            }
        ```
    - request_coupon : 핵심 데이터에 종속적이지는 않지만 서비스에 부가적으로 필요한 쿠폰요청 구현. 대용량 파일 업로드 모듈 formidable 사용
    
        ```javaScript
            var formidable = require('formidable');
            var form = new formidable.IncomingForm();

            exports.create = function(request, response){
                form.on('fileBegin', (name, file)=>{
                    var length = file.name.length;
                    // 요청되는 이미지가 로고파일, 상세이미지로 나뉘기 때문에 다른 저장소에 따로 저장한다
                    if(file.name.endsWith('.png')) {
                        // path를 지정해서 서버 public에 저장되도록 한다
                        file.path = './public/request_logo/' + file.name;
                    } else {
                        file.path = './public/request_detail/' + file.name;
                    }
                });
                form.parse(request, function(err, fields, files) {
                    dao.insert(fields, (err, rows)=>{
                        if(err) return error.send(response, 500, err);
                        send(response, rows);
                    })
                });
            }
        ```
    
- __version__ : 서비스 특성에 따라 특수한 경우 회원관리보다 먼저 구현이 필요할 수 있다. 각 페이지마다 서버에 요청해서 데이터를 받아오는 경우는 필요 없으나 서버에서 데이터를 받아와 저장해 사용하는 경우 서버 데이터 전체를 받아오거나 일부를 받아와 수정해야 할지 여부를 버전으로 관리해준다.

- __coupon__ : 핵심 데이터 관련 서버를 구현한다. 회원 권한 설정이 확실히 되었다면 보여줄 서비스 데이터도 분명하다
    - readAll()
    - readByLocation()
    
- __detail_photo__ : 핵심 데이터 구현이 완성된 후 핵심 데이터에 종속된 연관 데이터 서버 구현
        - readPhotoUrl()
    
- __logo__  : 핵심 데이터 구현이 완성된 후 핵심 데이터에 종속된 연관 데이터 구현
    - readLogoFiles() : 처음에는 전체를 읽어서 받아오려고 했으나 일단 넘어오는 전체 데이터가 너무 커지고 중간에 실패할 경우 따로 트랜젝션 처리해줘야 한다. 따라서 각 쿠폰 데이터별 로고파일을 하나씩 따로 받아오도록 한다.

- __favorite__ : 트랜젝션 처리를 할 것인지 비동기 콜백으로 처리할 것인지 결정
    - readFavorites()
    - createFavorite()
    - createLeftOvers()

- __wrong_info__ : 핵심 데이터에 종속적이지는 않지만 서비스에 부가적으로 필요한 잘못된 정보제보 구현

### (4) dao

    데이터베이스 쿼리문 작성

- couponDao
- detail_photoDao
- favoriteDao
- logoDao

    ```javaScript
        var fs = require('fs');

        exports.select = function(qs, callback){
            var logoName = qs.logo_filename;
            var filePath = './public/logo/'+logoName;
            fs.readFile(filePath, callback);
        }
    ```
- memberDao
- request_couponDao
- versionDao
- wrong_infoDao

### (5) database

- connect
    ```javaScript
        pool = mysql.createPool({
            connectionLimit : ***,
            host     : '***.***.***.***',
            user     : '***',
            password : '****',
            database : '****'
        });
        done();
    ```
- executeRaw
    ```javaScript
        pool.query(query, (err, rows, fields)=>{
            if(err) {
                console.log('[5.1] DAO 쿼리 오류')
                console.log(err);
                callback(err);
            } else {
                console.log('[5.1] DAO 쿼리 성공')
                callback(err, rows);
            }
        });
    ```
- executeByValues
    ```javaScript
        pool.query(query, values, (err, rows, fields)=>{
            if(err){
                console.log('[5.1] DAO 쿼리 오류')
                console.log(err);
                callback(err);
            } else {
                console.log('[5.1] DAO 쿼리 성공')
                callback(err, rows);
            }
        });
    ```

### (6) 기타

- __*. private_module__
    - router
    - tokenGenerator

- __*. response__

    - response : 초기 설계 미스로 각 컨트롤러가 모두 다른 result를 사용하며 모든 컨트롤러에 코드가 중복된다. 중복된 코드는 모듈화 해서 한 곳에서 처리해 준다.
        ```javaScript
            var result = {
                "token" : "",
                "totalCount": 0,
                "RESULT" : {
                    "CODE": 200,
                    "MESSAGE": "정상 처리되었습니다"
                },
                "rows" : []
            }   
        ```
        ```javaScript
            function sendResult(token, rows, code, message, response) {
                if(rows != null) result.totalCount = rows.length;
                result.RESULT.CODE = code;
                result.RESULT.MESSAGE = message;
                result.coupon = rows;
                response.end(JSON.stringify(result));     
                console.log('[6] COMPLETE : '+now = new Date());    
            }
        ```
    - error
        ```javaScript
            var result = {
                "RESULT" : {
                    "CODE": 200,
                    "MESSAGE": "정상 처리되었습니다"
                }
                "err" : err
            }

            exports.send = function(response, code, err){
                var errStr = err.toString();
                if(code === 404){
                    result.RESULT.CODE = 404;
                    result.RESULT.MESSAGE = "404 Page Not Found : "+errStr;
                } else if(code === 500){
                    result.RESULT.CODE = 500;
                    result.RESULT.MESSAGE = "500 Internal Server Error : "+errStr;
                }
                response.end(JSON.stringify(result));
                var now = new Date();
                console.log(err);
                console.log('[6] ERR : '+now);
            }
        ```

    - __*. config__

    - __*. public__

## __3. 호스팅__ :open_file_folder:

#### (1) CLI

#### (2) 서버 호스팅 

## __4. 부록__ :open_file_folder:

### (1) 추가 공부사항
- 설계 : 서버 설계 패턴, 에러 설계
- 자바스크립트 코딩 원칙, 패턴
- nodejs 테스트 주도 개발, 통합 관리 툴, 테스트 툴 찾아보기
- nodejs 관리모듈
- 보안
- 버전관리 : Git(SourceTree)
- 관리모듈 추가 공부 : ESLint, 로깅
- 콜백체인 관리법 : Promise, Generator, await & async, Q, blueprint
- 서버보안 : apache 서버, HTTPS 통신, token 설계, 추가 보안사항
- 인증 : OAuth1.0, OAuth2.0, token, bearer, jsonwebtoken, passport
- package.json 관리
- [t아카데미 AWS]()
- [t아카데미 JavaScript]()
- [t아카데미 Nodejs]()
- [t아카데미 AWS]()
- [t아카데미 파이썬]()
- [t아카데미 HTML & CSS]()
- [Inflearn 테스트주도개발(TDD)로 만드는 NodeJS API 서버]()
- [Inflearn 기본을 확실히!! HTML 의 모든것]()
- [Inflearn Node.js 웹개발로 알아보는 백엔드 자바스크립트의 이해]()
- [Inflearn ReactJS로 웹 서비스 만들기]()
- [Inflearn HTML,CSS 개발을 위한 핵심 가이드]()
- [Inflearn 부트스트랩으로 개인 홈페이지 만들기]()
- [Inflearn 나의 첫 Django 앱 만들기]()
- [Inflearn AngularJS 기본 개념과 To-Do 앱 만들기 실습 – 앵귤러 강좌]()
- [Inflearn Node.Js 활용하기]()
- [Inflearn Node.js 로 Database 다루기 소개와 웹애플리케이션 만들기]()
- [Inflearn Node.js 를 이용해 웹애플리케이션 만들기]()
- [Inflearn w3schools 로 배우는 자바스크립트(javascript) 입문]()
- [Inflearn 파이썬을 이용한 웹 크롤링(Web Crawling) 어플리케이션 만들기]()
- [Inflearn 테레비 보다 재미있는 제이쿼리(jQuery) 강좌]()
- [Inflearn SQL 기초 문법 강좌 – 관계형 데이터베이스 공부의 시작]()
- [Inflearn Node.js (노드제이에스) 강좌]()
- [Inflearn Doit! HTML5 + CSS3 웹 표준의 정석]()
- [Inflearn 실전 HTML & CSS 강좌]()
- [Inflearn 생활코딩 – mysql 강좌]()
- [Inflearn 웹브라우저 Javascript (자바스크립트)]()
- [Inflearn 생활코딩 jQuery 강좌]()
- [Inflearn 따라하면서 배우는 웹애플리케이션 만들기]()
- [Inflearn 뇌를 자극하는 윈도우즈 시스템 프로그래밍]()

### (2) 참고
