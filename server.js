const express = require('express')
const app = express()
const bodyParser = require('body-parser');

const cors = require('cors')
app.use(cors())

// 使用body-parser中间件解析请求体
app.use(bodyParser.json());

// 存储用户信息的数据库，这里使用一个简化的内存数据库示例
const users = [];

app.post('/api/reguser', (req, res) => {
    const { username, password } = req.body;

    // 检查用户名是否已存在
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        return res.send({
            status:1,
            message: 'Username already exists',
        })
    }

    // 创建新用户并存储到数据库
    const newUser = { username, password };
    users.push(newUser);

    // 返回成功响应
    res.send({
        status: 0,
        message: 'User registered successfully',
    })
})

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    // 检查用户是否存在
    const user = users.find(user => user.username === username);
    if (!user || user.password !== password) {
    return res.send({
        status:1,
        message: 'Invalid username or password',
    })
    }

    // 返回成功响应
    res.send({
        status:0,
        message: 'Login successful',
        token: 'barser asdsadwqdwqdsadwqdwq.',
    })
})

app.get('/my/userinfo', (req, res) => {
    const { name, age, email } = req.body;

  // 在此处可以对用户信息进行处理或保存到数据库

    res.status(0).json({ message: '用户信息获取成功！' });
})

app.listen(80, () => {
    console.log('express server running at http://127.0.0.1');
})