let getBoardListView = (req, res) => {
    console.log('listBoardProc() ==> ');
    let pool = req.app.get('pool');
    pool.getConnection((err, conn)=>{
        if(err){
            console.log('getConnection() 에러 발생 ' + err);
            if(conn){
                conn.release();
            }
            return;
        }
        console.log('getConnection() 성공 !!');
        conn.query('select * from board', (err, results)=>{
            if(err){
                console.log('query() 에러 발생 ' + err)
                return;
            }
            console.log('query() 성공 !!');
            if(results.length >0 ){
                let context = {boardList:results};
                req.app.render('getBoardListView', context,(err, html)=>{
                    if(err){
                        res.send('render()에러 ' + err);
                    }
                    res.end(html);
                })

            }
            else{
                res.send('사용자 정보 없음 !!');
            }

        })
    })
}


let insertBoardView = (req,res) => {
    console.log('insertBoardView() ==> ');

    let context = {};
    req.app.render('insertBoardView', context, (err, html) => {
        if(err){
            res.send('rend() 에러 발생 : '+ err);
        }
        console.log('render() 성공 ');
        res.end(html);
    }); 
}

let insertBoardProc = (req, res) => {
    console.log('insertBoardProc() ==> ');

    let title = req.body.title || req.query.title;
    let content = req.body.content || req.query.content;

    console.log(' t : ' + title + ' c : ' + content);
    
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
        let data = {title:title, content:content};
        conn.query('insert into board set ?', data, (err, results) => {
            if(err){
                console.log('query() 실행시에 에러발생 !! ' + err);
                return;
            }
            console.log('query() 실행 성공 !!');
            if(results){
                //새로운 데이터가 추가된 리스트 보여주기
                res.redirect('/process/getBoardListView');
            }
            else{
                res.send('새로운 데이터 추가 실패 !! ');
            }

        })

    })
}


let modifyBoardProc = (req, res) => {
    console.log('modifyBoardProc() ==> ');
    let seq = req.body.seq || req.query.seq;
    let title = req.body.title || req.query.title;
    let content = req.body.content || req.query.content;
    console.log('s : ' + seq + ' t : ' + title + ' c : ' + content);

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
        conn.query('update board set title=?, content=? where seq=?', 
                    [title, content, seq], (err, results)=> {
                        if(err){
                            console.log('query() 에러 발생 ' + err);
                            return;
                        }
                        console.log('query() 성공 ');
                        if(results){
                            res.redirect('/process/getBoardListView');
                        }
                        else{
                            res.send('수정 실패 !!');
                        }
                    });
    })
}


let deleteBoardProc = (req, res) => {
    console.log('deleteBoardProc() ==> ');
    let seq = req.body.seq || req.query.seq;  
    console.log('s : ' + seq);

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
        conn.query('delete from board where seq=?', 
                    [seq], (err, results)=> {
                        if(err){
                            console.log('query() 에러 발생 ' + err);
                            return;
                        }
                        console.log('query() 성공 ');
                        if(results){
                            res.redirect('/process/getBoardListView');
                        }
                        else{
                            res.send('삭제 실패 !!');
                        }
                    });
    })
}


module.exports.getBoardListView = getBoardListView;
//module.exports.listBoardProc = listBoardProc;
module.exports.insertBoardView = insertBoardView;
module.exports.insertBoardProc = insertBoardProc;
module.exports.modifyBoardProc = modifyBoardProc;
module.exports.deleteBoardProc = deleteBoardProc;




