var pool = require('./db');

module.exports = {
    //获取首页的主题
    getIndexList: function(cb){
        pool.getConnection(function(err, connection){
            if(err) throw err;

            // 连表查询，获取作者的用户名
            connection.query('select `list`.*, username from `list`, `user` where `list`.`uid` = `user`.`id`', function(err, result){
                if(err) throw err;
                cb(result);
                connection.release();
            })
        })
    },
    addTopic: function(params, cb){
        pool.getConnection(function(err, connection){
            if(err) throw err;
            connection.query('insert into `list` set ?', params, function(err, result){
                if(err) throw err;
                cb(result);
                connection.release();
            })
        })
    },
    getListById: function(id, cb){
        pool.getConnection(function(err, connection){
            if(err) throw err;
            connection.query('select * from `list` where `id` = ?', [id], function(err, result){
                if(err) throw err;
                cb(result);
                connection.release();
            })
        })
    },
    getReplyById: function (pid, cb) {
        pool.getConnection(function(err, connection){
            if(err) throw err;
            connection.query('select * from `reply` where `pid` = ?', [pid], function (er, result) {
                if(err) throw err;
                cb(result);
                connection.release();
            })
        })
    },
    addReply: function(params, cb){
        pool.getConnection(function (err, connection) {
            console.log(params)
            if(err) throw err;
            connection.query('insert into `reply` set ?', params, function(err, result){
                if(err) throw err;
                cb(result);
                connection.release();
            })
        })
    }
}