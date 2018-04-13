const pool = require('./dbpool');
const qs = require ('querystring');
module.exports={
    myOrders:function(req,res){
       var uid = req.query.uid;
        pool.getConnection((err,conn)=>{
            if(err){
                throw err;
            }else{
                conn.query(`SELECT * FROM jd_order WHERE userId=${uid}`,function(err,result){
                    if(err){
                        console.log('sql failure');
                    }else{
                        //console.log(result);
                        var progress=0;
                        for(var i=0;i<result.length;i++){
                            var order=result[i];
                            var oid=order.oid;
                            conn.query(`SELECT * FROM jd_product WHERE pid=(SELECT productId FROM jd_order_detail WHERE orderId =${oid})`,(function(order){
                                return function(err,plist){
                                    order.products=plist;
                                    progress++;
                                    if(progress===result.length){
                                        res.json(result);
                                        conn.release();
                                    }
                                }
                            }(order)));

                        }

                    }
                })
            }
        });
    },
    shoppingCart:function(req,res){
        var uid = req.query.uid;
        pool.getConnection((err,conn)=>{
            if(err) {throw err;}
            else{
                conn.query(`SELECT c.id,p.pname,p.pic,p.price,c.count FROM jd_cart c,jd_product p WHERE c.productid=p.pid AND c.uid=${uid}`,function(err,result){
                    if(err){
                        console.log('sql failure');
                    }else{
                        res.json(result);
                        conn.release();
                    }
                 });
            }
        });
    },
    delCart:(req,res)=>{
        req.on('data',function(buf){
            var obj = qs.parse(buf.toString());
            //console.log(obj);
            pool.getConnection((err,conn)=>{
                if(err){
                    throw err;
                }else{
                    conn.query(`DELETE FROM jd_cart WHERE id=${obj.id}`,function(err,result){
                        if(err){
                            throw err;
                        }else{
                            var output = {code:1,
                            };
                            res.json(output);
                            conn.release();
                        }
                    });
                }
            })

        });
    },
}