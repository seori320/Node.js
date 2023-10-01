let main = (req,res) => {
    console.log("main() 처리중 ");

    let context = {};

    req.app.render('main', context, (err, html)=>{
        if(err){
            res.send('render() 에러발생 ' + err);
        }
        console.log('render() 성공 !!');
        // 클라이언트에 html 문서 전송 !!
        res.send(html); 
    });
}

let login = (req,res) => {
    console.log("login() 처리중 ");

    let context = {};

    req.app.render('login', context, (err, html)=>{
        if(err){
            res.send('render() 에러발생 ' + err);
        }
        console.log('render() 성공 !!');
        // 클라이언트에 html 문서 전송 !!
        res.send(html); 
    });
}

let loginProc = (req,res) => {
    console.log("login() 처리중 ");

    //사용자 입력 값 저장 
    let email = req.body.email || req.query.email;
    let password = req.body.password || req.query.password;    
        
    //사용자 정보 전달 확인
    console.log(' email : ' + email + ' p : ' + password);

    //디비 연결 처리\
    let pool = req.app.get('pool');
    pool.getConnection((err, conn) => {
        if(err){
            console.log('getCoonection() 에러 발생 !! ' + err);
            if(conn){
                conn.release();
            }
            return;
        }
        console.log('getConnection() 연결 성공 !! ');
        conn.query('select * from users where email=? and password=?', [email, password], (err, results) => {
            if(err){
                console.log('query() 실행시에 에러발생 !! ' + err);
                return;
            }
            console.log('query() 실행 성공 !!');
            if(results){
                //새로운 데이터가 추가된 리스트 보여주기
                res.redirect('/process/main');
            }
            else{
                res.send('새로운 데이터 추가 실패 !! ');
            }
        })

    });
}

let signup = (req,res) => {
    console.log("main() 처리중 ");

    let context = {};

    req.app.render('signup', context, (err, html)=>{
        if(err){
            res.send('render() 에러발생 ' + err);
        }
        console.log('render() 성공 !!');
        // 클라이언트에 html 문서 전송 !!
        res.send(html); 
    });
}

let signupProc = (req,res) => {
    let email = req.body.email || req.query.email;
    let password = req.body.password || req.query.password;
    let name = req.body.name || req.query.name;
    let tel = req.body.tel || req.query.tel;
    let age = req.body.age || req.query.age;
    let address = req.body.address || req.query.address;

    console.log('e : ' + email + ' p : ' + password + ' n : ' + name + ' t : ' + tel + ' a : ' + age + ' ad : ' + address);

    let pool = req.app.get('pool');
    
    pool.getConnection((err, conn) => {
        if(err){
            console.log('getConnection() 에러 발생 ' + err);
            if(conn){
                conn.release();
            }
            return;
        }
        console.log('getConnection() 처리 성공 ');
        let data = {email:email, password:password, name:name, tel:tel, age:age, address:address};
        conn.query('insert into users set ?', data, (err, results)=> {
                        if(err){
                            console.log('query() 에러 발생 ' + err);
                            return;
                        }
                        console.log('query() 성공 ');
                        if(results){
                            res.redirect('/process/main');
                        }
                        else{
                            res.send('수정 실패 !!');
                        }
                    });
    })
}


let search = (req,res) => {
    console.log("search() 처리중 ");

    let context = {};

    req.app.render('search', context, (err, html)=>{
        if(err){
            res.send('render() 에러발생 ' + err);
        }
        console.log('render() 성공 !!');
        // 클라이언트에 html 문서 전송 !!
        res.send(html); 
    });
}

let info = (req,res) => {
    console.log("info() 처리중 ");

    let context = {};

    req.app.render('info', context, (err, html)=>{
        if(err){
            res.send('render() 에러발생 ' + err);
        }
        console.log('render() 성공 !!');
        // 클라이언트에 html 문서 전송 !!
        res.send(html); 
    });
}

let announce_person = (req,res) => {
    console.log("announce_person() 처리중 ");

    let context = {};

    req.app.render('announce_person', context, (err, html)=>{
        if(err){
            res.send('render() 에러발생 ' + err);
        }
        console.log('render() 성공 !!');
        // 클라이언트에 html 문서 전송 !!
        res.send(html); 
    });
}

let announce_team = (req,res) => {
    console.log("announce_team() 처리중 ");

    let context = {};

    req.app.render('announce_team', context, (err, html)=>{
        if(err){
            res.send('render() 에러발생 ' + err);
        }
        console.log('render() 성공 !!');
        // 클라이언트에 html 문서 전송 !!
        res.send(html); 
    });
}

let inquire = (req,res) => {
    console.log("inquire() 처리중 ");

    let context = {};

    req.app.render('inquire', context, (err, html)=>{
        if(err){
            res.send('render() 에러발생 ' + err);
        }
        console.log('render() 성공 !!');
        // 클라이언트에 html 문서 전송 !!
        res.send(html); 
    });
}

let mypage = (req,res) => {
    //사용자 입력 값 저장 
    let id = req.body.id || req.query.id;
    let password = req.body.password || req.query.password;
    let name = req.body.name || req.query.name;

    let pool = req.app.get('pool');
    
    //사용자 정보 전달 확인
    console.log(`id : ${id}, 
                 password : ${password}`);
    
    // 커넥션 풀로 부터 커넥션 1개를 빌려옴
    pool.getConnection((err, conn)=>{

        if(err){
            console.log('getConnection()에러 발생 : ' + err);
            if(conn){
                conn.release();
            }
            return;
        }
        console.log('getConnection() 연결 성공 !!');

        conn.query('update users set name=? where id=?', 
                    [name, id], 
                    (err, results)=>{
            if(err){
                console.log('query() 실행시에 에러발생 !! '+ err);
                if(conn){
                    conn.release();                    
                }
                return;
            }
            console.log('query() 성공 ');
            if(results){
                res.send('사용자 정보 수정 성공 !! ==> ' + id);
            }
            else {
                res.send('사용자 정보 수정 실패 !!  ==> ' + id);
            }
        })

    });
}






module.exports.main = main;
module.exports.login = login;
module.exports.loginProc = loginProc;
module.exports.signup = signup;
module.exports.signupProc = signupProc;
module.exports.search = search;
module.exports.info = info;
module.exports.announce_person = announce_person;
module.exports.announce_team = announce_team;
module.exports.inquire = inquire;
module.exports.mypage = mypage;