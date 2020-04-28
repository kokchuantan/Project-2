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

const checkUser = (userName,callback) => {
    const whenQueryDone = (queryError, result) => {
        if (queryError) {
            console.log(queryError, 'error');
        } else {
            if (result.rows) {
                console.log('exists')
                console.log (result.rows);
                callback(true);
            }
            else{
                console.log('new')
                console.log(result.rows)
                callback(false);
            }
        }
    };
    const queryString = "SELECT * FROM users where username = ($1)";
    value = [userName];
    pool.query(queryString, value, whenQueryDone)
};

const addUser = (request, response) => {
    let userName = request.body.username;
    let passWord = sha256(request.body.password);
    checkUser(userName,checkUserResult => {
        if (checkUserResult) {
            response.send('Username already exists!');
        } else {
            const whenQueryDone = (queryError, result) => {
                if (queryError) {
                    console.log(queryError, 'error');
                    response.status(500);
                    response.send('error');
                } else {
                    request.cookies.user = userName;
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
    let passWord = sha256(request.body.password);
    const whenQueryDone = (queryError, result) => {
        if (result.rows.password === passWord){
            response.cookie.loggedIn = 'logged in'
            response.redirect('/home');
        }
    };
    const queryString = "select * from users where username = $1;";
    values = [userName];
    pool.query(queryString, values, whenQueryDone)
}

app.get('/home', (request, response) => {
    //check logged in
    const whenQueryDone = (queryError, result) => {
        if (queryError) {
            console.log(queryError, 'error');
        } else {
            data = {
                list : result.rows
            }
            response.render('index',data);
        }
    };
    const queryString = "SELECT content FROM list INNER JOIN users ON (user.id = list.user_id) WHERE user.username = $1";
    value = [userName];
    pool.query(queryString, value, whenQueryDone)
});

app.get('/login', (request, response) => {
    response.render('login');
});
app.get('/register', (request, response) => {
    response.render('register');
})
app.post('/register', addUser);

app.post('login', loginUser)

app.get('/', (request, response) => {
    //check if logged in
    //if logged in
    response.redirect('/home');
    //not logged in 
    response.redirect('/register');
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