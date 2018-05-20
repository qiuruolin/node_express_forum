var pool = require('./db'),
    crypto = require('crypto');

module.exports = {
    hash: function(str){
        return crypto.createHmac('sha1', str).update('love').digest('hex');
    },
    //注册
    // 因数据库操作是异步操作，则需要传入回调函数来对结果进行处理，而不能使用return的方式
    reg: function(username, password, regtime, cb){
        pool.getConnection(function(err, connection){
            if(err) throw err;
            //首先检测用户是否存在
            connection.query('select `id` from `user` where `username` = ?', [username], function(err,sele_res){
                if(err) throw err;

                //若用户已存在，则直接回调
                if(sele_res.length){
                    cb({isExisted: true});
                    connection.release();
                }
                else{
                    //否则将信息插入到数据库中
                    var params = {username: username, password: password, regtime: regtime};
                    connection.query('insert into `user` set ?', params, function (err, insert_res) {
                        if(err) throw err;
                        cb(insert_res);
                        connection.release();
                    })
                }
            })
        })
    },
    //登录
    login: function(username, password, cb){
        pool.getConnection(function(err, connection){
            if(err) throw err;

            connection.query('select `id` from `user` where `username` = ? and `password` = ?', [username, password], function(err, result){
                if(err) throw err;
                cb(result);
                connection.release();
            })
        })
    }

}