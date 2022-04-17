import * as bodyParser from 'body-parser';
import { create, defaults, router as jsonRouter } from 'json-server';
import * as jwt from 'jsonwebtoken';
import { join } from 'path';

const PORT = process.env.PORT ?? 3001;
const DATA_PATH = process.env.DATA_PATH ?? __dirname.slice(process.cwd().length + 1);
const DATA_NAME = process.env.DATA_NAME ?? 'db.json';
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY ?? 'secretKey';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN ?? '1h';

const server = create();

const router = jsonRouter(join(DATA_PATH, DATA_NAME));
const middlewares = defaults({
    static: './build'
});

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(middlewares);

server.post('/login', (req, res) => {
    const payload: { username: string; password: string } = { username: req.body.username, password: req.body.password };
    const user: { id: number; username: string; password: string } | null =
        (router.db.get('users') as any).find({ login: payload.username, password: payload.password }).value() ?? null;

    if (user) {
        const accessToken = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: JWT_EXPIRES_IN });
        res.status(200).json({ accessToken, id: user.id });
    } else {
        const status = 401;
        const message = 'Неверное имя пользователя или пароль';
        res.status(status).json({ status, message });
    }
});

server.use(/^(?!\/).*$/, (req, res, next) => {
    if (req.headers.authorization === undefined || req.headers.authorization.split(' ')[0] !== 'Bearer') {
        const status = 401;
        const message = 'Ошибка авторизации';
        res.status(status).json({ status, message });
        return;
    }
    try {
        const token = req.headers.authorization.split(' ')[1];
        const verifyTokenResult = jwt.verify(token, JWT_SECRET_KEY, (err, decode) => (decode !== undefined ? decode : err)) as any;

        if (verifyTokenResult instanceof Error) {
            const status = 401;
            const message = 'Отсутствует токен доступа';
            res.status(status).json({ status, message });
            return;
        }
        next();
    } catch (err) {
        const status = 401;
        const message = 'Неверный токен доступа';
        res.status(status).json({ status, message });
    }
});

server.use(router);

server.listen(PORT, () => {
    console.log(`JSON сервер запущен на порту: ${PORT}`);
});