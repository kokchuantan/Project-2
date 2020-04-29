const express = require('express');
const moment = require('moment');
const methodOverride = require('method-override');
const pg = require('pg');
const sha256 = require('js-sha256');

// Initialise postgres client
const configs = {
    user: 'kokchuantan',
    host: '127.0.0.1',
    database: 'testdb',
    port: 5432,
};

const pool = new pg.Pool(configs);

pool.on('error', function (err) {
    console.log('idle client error', err.message, err.stack);
});

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();

app.use(express.static('public'))

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use(methodOverride('_method'));

// Set react-views to be the default view engine
const reactEngine = require('express-react-views').createEngine();
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', reactEngine);
const cookieParser = require('cookie-parser')

app.use(cookieParser());
/**
 * ===================================
 * Routes
 * ===================================
 */

let dateAt = moment().format('MMMM Do YYYY, h:mm:ss a');

const checkUser = (userName, callback) => {
    const whenQueryDone = (queryError, result) => {
        if (queryError) {
            console.log(queryError, 'error');
        } else {
            if (result.rows.length > 0) {
                console.log('exists')
                console.log(result.rows);
                callback(true);
            } else {
                console.log('new')
                console.log(result.rows)
                callback(false);
            }
        }
    };
    const queryString = "SELECT * FROM users where username = ($1);";
    value = [userName];
    pool.query(queryString, value, whenQueryDone)
};

const addUser = (request, response) => {
    let userName = request.body.username;
    let passWord = request.body.password;
    checkUser(userName, checkUserResult => {
        if (checkUserResult) {
            response.send('Username already exists!');
        } else {
            const whenQueryDone = (queryError, result) => {
                if (queryError) {
                    console.log(queryError, 'error');
                    response.status(500);
                    response.send('error');
                } else {
                    response.redirect('/login');
                }
            };
            const queryString = "insert into users (username,userpassword) values ($1,$2) returning *;";
            values = [userName, passWord];
            pool.query(queryString, values, whenQueryDone)
        }
    });
};

const loginUser = (request, response) => {
    let userName = request.body.username;
    let passWord = request.body.password;
    const whenQueryDone = (queryError, result) => {
        if (result.rows.length > 0) {
            if (result.rows[0].userpassword === passWord) {
                console.log('1')
                response.cookie('id', result.rows[0].id)
                response.cookie('user', userName);
                response.cookie('loggedIn', 'true');
                response.redirect('/home');
            } else if (queryError) {
                console.log('2')
                console.log('error', queryError)
                response.send(queryError);
            } else {
                console.log('3')
                console.log('wrong password')
                response.redirect('/login');
            }
        } else {
            console.log('4');
            response.redirect('/login');
        }
    };
    const queryString = "select * from users where username = $1;";
    values = [userName];
    pool.query(queryString, values, whenQueryDone)
}

const addPost = (request, response) => {
    let userName = request.cookies.user;
    let text = request.body.content;
    let category_id = request.body.cat;
    if (request.cookies.loggedIn === 'true') {
        checkCurrentUser(userName, checkUserId => {
            if (checkUserId > 0) {
                const whenQueryDone = (queryError) => {
                    if (queryError) {
                        console.log(queryError, 'error');
                        response.status(500);
                        response.send('error');
                    } else {
                        response.redirect('/home');
                    }
                };
                const queryString = "insert into list (user_id,content,category_id) values ($1,$2,$3) returning *;";
                values = [userId, text, category_id];
                pool.query(queryString, values, whenQueryDone)
            } else {
                response.redirect('/');
            }
        })
    }
};

const checkCurrentUser = (userName, callback) => {
    const whenQueryDone = (queryError, result) => {
        if (queryError) {
            console.log(queryError, 'error');
        } else {
            if (result.rows.length > 0) {
                console.log(result.rows);
                callback(result.rows[0].id);
            } else {
                callback(queryError);
            }
        }
    };
    const queryString = "SELECT * FROM users where username = ($1);";
    value = [userName];
    pool.query(queryString, value, whenQueryDone)
};

app.get('/home', (request, response) => {
    if (request.cookies.loggedIn === 'true') {
        let userName = request.cookies.user;
        const whenQueryDone = (queryError, result) => {
            if (queryError) {
                console.log(queryError, 'error');
            } else {
                const secondQuery = (error, results) => {
                    if (error) {
                        console.log(error, 'error');
                    } else {
                        data = {
                            list: result.rows,
                            categories: results.rows,
                            user: userName
                        }

                        response.render('index', data);
                    }
                };
                const query = "SELECT * FROM category;";
                pool.query(query, secondQuery)
            }
        };
        const queryString = "SELECT * FROM list INNER JOIN users ON (users.id = list.user_id) WHERE users.username = $1;";
        value = [userName];
        pool.query(queryString, value, whenQueryDone)
    } else {
        response.redirect('/login')
    }
});
app.get('/newPost', (request, response) => {
    if (request.cookies.loggedIn === 'true') {
        const whenQueryDone = (queryError, result) => {
            if (queryError) {
                console.log(queryError, 'error');
            } else {
                data = {
                    categories: result.rows
                }
                response.render('newpost', data);
            }
        };
        const queryString = "SELECT * FROM category";
        pool.query(queryString, whenQueryDone)
    } else {
        response.redirect('/');
    }
});

app.get('/category', (request, response) => {
    if (request.cookies.loggedIn === 'true') {
        let userName = request.cookies.user;
        checkCurrentUser(userName, checkUserId => {
            if (checkUserId > 0) {
                let category_id = request.body.cat;
                const whenQueryDone = (queryError, result) => {
                    if (queryError) {
                        console.log(queryError, 'error');
                    } else {
                        const secondQuery = (error, results) => {
                            data = {
                                user: userName,
                                list: result.rows,
                                categories: results.rows
                            }
                            response.render('index', data);
                        }
                        const query = "SELECT * from category;";
                        pool.query(query, secondQuery)
                    }
                };
                const queryString = "SELECT content FROM list where (category_id = $1 AND user_id = $2);";
                value = [category_id, checkUserId];
                pool.query(queryString, value, whenQueryDone)
            }
        });
    } else {
        response.redirect('/');
    }
});
app.post('/category', (request, response) => {
    let userName = request.cookies.user;
    checkCurrentUser(userName, checkUserId => {
        if (checkUserId > 0) {
            let category_id = request.body.cat;
            const whenQueryDone = (queryError, result) => {
                if (queryError) {
                    console.log(queryError, 'error');
                } else {
                    const secondQuery = (error, results) => {
                        data = {
                            user: userName,
                            list: result.rows,
                            categories: results.rows
                        }
                        response.render('index', data);
                    }
                    const query = "SELECT * from category;";
                    pool.query(query, secondQuery)
                }
            };
            if (request.body.cat === 'default') {
                response.redirect('/home')
            } else {
                queryString = "SELECT content FROM list where (category_id = $1 AND user_id = $2);";
                values = [category_id, checkUserId];
                pool.query(queryString, values, whenQueryDone)
            }
        }
    });
});

app.get('/login', (request, response) => {
    if (request.cookies.loggedIn === 'true') {
        response.redirect('/home');
    } else {
        response.render('login');
    }
});
app.get('/register', (request, response) => {
    if (request.cookies.loggedIn === 'true') {
        response.redirect('/home');
    } else {
        response.render('register');
    }
})
app.post('/register', addUser);

app.post('/login', loginUser);

app.post('/newPost', addPost);

app.get('/logout', (request, response) => {
    response.clearCookie('user');
    response.clearCookie('loggedIn');
    response.clearCookie('id');
    response.redirect('/');
})

app.get('/', (request, response) => {
    if (request.cookies.loggedIn === 'true') {
        response.redirect('/home');
    } else {
        response.redirect('/register');
    }
});


/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
const server = app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

let onClose = function () {

    console.log("closing");

    server.close(() => {

        console.log('Process terminated');

        pool.end(() => console.log('Shut down db connection pool'));
    })
};

process.on('SIGTERM', onClose);
process.on('SIGINT', onClose);