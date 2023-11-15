import { useState, useRef, useEffect } from "react";
import { serverPath } from "../helpers/variables";

const Login = () => {
    const userRef = useRef();
    const passRef = useRef();

    const [email, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const response = await fetch(serverPath + 'users', {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password})
            });
            //console.log(response);
            setSuccess(true);
        } catch (error) {
            if (!error?.response) {
                console.log("Нет ответа от сервера");
            } else {
                console.log("Ошибка входа");
            }
        }
    };

    return (
        <>
            {success ? (
                <h1 className="title success-title">Авторизация пройдена успешно!</h1>
            ) : (
            <>
                <h1 className="title">Авторизация</h1>
                <form onSubmit={handleSubmit}>
                                <input
                                    type="email"
                                    placeholder="почта"
                                    ref={userRef}
                                    autoComplete="on"
                                    value={email}
                                    onChange={(e) => setUsername(e.target.value)}
                                    onKeyDown={(e) => {
                                        const { key } = e;
                                        if (key === "Enter") {
                                            passRef.current.focus();
                                        }
                                    }}
                                    required
                                    className="form__input"
                                />
                                <input
                                    type="password"
                                    placeholder="пароль"
                                    ref={passRef}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="form__input"
                                />
                                <button
                                    disabled={
                                        !userRef.current?.value || !passRef.current?.value
                                            ? true
                                            : false
                                    }
                                    type="submit"
                                >
                                    Войти
                                </button>
                                <p className="message">
                                    Не зарегистрированы?{" "}
                                    <a href="/">Создать аккаунт</a>
                                </p>
                </form>
            </>)}
        </>
    );
};

export default Login;
