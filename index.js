const pool = require('./dbpool');
const qs = require ('querystring');
module.exports= {
    getProducts: function (req, res) {
        var pageNo = req.query.pageNo;
        var offset = (pageNo - 1) * 8;
        pool.getConnection((err, conn) => {
            if (err) {
                console.log('db connection failure');
            } else {
                conn.query(`SELECT * FROM jd_product LIMIT ${offset},8`, function (err, result) {
                    if (err) {
                        console.log('sql err');
                    } else {
                        res.json(result);
                        conn.release();
                    }
                })
            }
        });
    },
    addCart: function (req, res) {
        req.on('data', function (buf) {
            var obj = qs.parse(buf.toString());
            //console.log(obj);
            pool.getConnection((err, conn) => {
                if (err) {
                    console.log('db connection err');
                } else {
                    conn.query(`SELECT * FROM jd_cart WHERE uid=${obj.uid} AND productid=${obj.pid}`, function (err, result) {
                        console.log(result);
                        if (result.length === 0) {
                            conn.query(`INSERT INTO jd_cart values(null,${obj.uid},${obj.pid},1)`, function (err, r) {
                                if (err) {
                                    throw err;
                                }
                                else {
                                    var output = {
                                        msg: 'success1'
                                    };
                                    res.json(output);
                                    conn.release();
                                }
                            });
                        } else {
                            conn.query(`UPDATE jd_cart SET count=count+1 WHERE uid=${obj.uid} AND productid=${obj.pid}`, function (err, list) {
                                if (err) {
                                    throw err;
                                }
                                else {
                                    var output = {
                                        msg: 'success'
                                    };
                                    res.json(output);
                                    conn.release();
                                }
                            });
                        }
                    });
                }
            });
        });
    },
    getDetail:function(req,res){
        var pid=req.query.pid;
        pool.getConnection((err,conn)=>{
            if(err){
                console.log('db connection error');
            }else{
                conn.query(`SELECT * FROM jd_product WHERE pid=${pid}`, function (err, result) {
                    if(err){
                        console.log("sql error");
                    }else{
                        //console.log(result);
                        res.json(result);
                        conn.release();
                    }
                });
            }
        })
    }
}