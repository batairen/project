const pool = require('./dbpool');
const qs = require ('querystring');
module.exports={
    register:(req,res)=>{
        req.on('data',function(buf){
           var obj = qs.parse(buf.toString());
           console.log(obj);
           pool.getConnection((err,conn)=>{
                    if(err){
                        throw err;
                    }else{
                   conn.query('INSERT INTO jd_user VALUES(NULL,?,?)',[obj.uname,obj.upwd],function(err,result){
                       if(err){
                           throw err;
                       }else{
                            var output = {code:1,
                             message:'register success',
                             uid: result.insertId
                        };
                         res.json(output);
                         conn.release();
                       }
                   });
                    }
           })

        });
    },
    login:(req,res)=>{
        req.on('data',(buf)=>{
            var obj = qs.parse(buf.toString());
            console.log(obj);
            pool.getConnection((err,conn)=>{
                if(err){
                    throw err;
                }else{
                    conn.query('SELECT uid FROM jd_user WHERE uname=? AND upwd=?',[obj.uname,obj.upwd],function(err,result){
                        if(err){
                            console.log('sql failure');
                        }else if(result.length===0){
                            var output = {code:0,
                                message:'wrong username or password',
                                uid: result[0].uid
                            };
                        }else if(result.length>0){
                            var output = {code:1,
                                message:'login success',
                                uid:result[0].uid
                            };
                        }
                        res.json(output);
                        conn.release();
                    })
                }
            });
        })
    }
}