let http = require('http');
let express = require('express');
//express 외장모듈을 이용하여 app 객체 생성
let app = express();

app.set('port', 3000);

//app객체이용하여 서버객체 생성
let server = http.createServer(app).listen(app.get('port'), ()=>{
    console.log('app 객체 이용하여 서버 생성 후 대기중 !!');
    //디비 연결을 위한 설정 함수 호출
    connectDB();
});

//뷰 엔진 설정
//뷰 템플릿의 위치 설정
app.set('views',__dirname+'/views');
//뷰엔진 설정, ejg, pug,....
app.set('view engine','ejs');


//mySql 이용을 위한 커넥션 풀 객체 생성
let mysql = require('mysql');
let pool=null;
function connectDB() {
    console.log('connectDB() =-=>');
    pool = mysql.createPool({
        connectionLimit:10,
        host:'localhost',
        user: 'root',
        password:'111111',
        database: 'nodedb'
    });
    if(pool != null){
        console.log('createPool() 성공 !!');
        //pool객체를 다른 모듈에서 사용하기위해서
        //'pool' 이름으로 객체를 저장함
        // app.get('pool'): 저장된 pool 객체 사용
        app.set('pool', pool);
    }
       
}

//미들웨어에서 post 방식 전송데이터 처리 
//'application/x-www-form-urlencoded
app.use(express.urlencoded());
//'application/json
app.use(express.json());

app.use(express.static('public'));



//미들웨어에서 특정폴더를 url로 접근위한 처리
let static = require('serve-static');
let path = require('path');
const { release } = require('os');
//__dirname : 현재 폴더 
let pathName = path.join(__dirname, 'public');
console.log('path: ' + pathName);
//localhost:3000/public/loing.html 로 public 폴더 접근
app.use('/public', static(pathName));
//localhost:3000/login.html 로 public 폴더 접근
app.use(static(pathName));

// 라우터 설정
let router = express.Router();
//매우 중요. '/' 가 들어오면, 라우터 객체 연결
app.use('/', router);



//외부 모듈을 사용하여 라우터 구현
let users = require('./routes/userRoutes.js')

//라우터 외부 모듈 호출 부분 ...
//--> 전체 글목록 보기 라우터 처리 !! 
router.route('/process/main').all(users.main);
router.route('/process/login').all(users.login);
router.route('/process/loginProc').all(users.loginProc);
router.route('/process/signup').all(users.signup);
router.route('/process/signupProc').all(users.signupProc);
router.route('/process/search').all(users.search);
router.route('/process/info').all(users.info);
router.route('/process/announce_person').all(users.announce_person);
router.route('/process/announce_team').all(users.announce_team);
router.route('/process/inquire').all(users.inquire);
router.route('/process/mypage').all(users.mypage);


let board = require('./routes/boardRoutes.js')

router.route('/process/getBoardListView').all(board.getBoardListView);
//router.route('/process/listBoardProc').all(board.listBoardProc);

router.route('/process/insertBoardView').all(board.insertBoardView);
router.route('/process/insertBoardProc').all(board.insertBoardProc);

router.route('/process/modifyBoardProc').all(board.modifyBoardProc);

router.route('/process/deleteBoardProc').all(board.deleteBoardProc);



app.all('*', (req, res)=>{
    res.status(404).send('요청한 패스는 처리할 수 없습니다. 다시 확인하세요. ');
});