export default function Login() {
    return (
        <div className={"d-flex justify-content-center align-items-center"}>
            <div className={"card p-3 py-4 col-md-8 col-sm-11 my-5"}>
                <form method={"POST"}>
                    <div className={"fw-bolder fs-2"}>
                        My ToDo App
                    </div>
                    <div className="text-muted mb-4">
                        Login to your account to manage your tasks.
                    </div>
                    <div className="form-floating mb-3">
                        <input type="email" className="form-control" id="email" name="email" placeholder="name@example.com"/>
                        <label htmlFor="email">Email address</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="password" className="form-control" id="password" name="password" placeholder="Password"/>
                        <label htmlFor="password">Password</label>
                    </div>
                    <div>
                        <button className={"btn btn-primary"} type="submit">
                            <i className={"fa-solid fa-right-to-bracket"}></i> Login
                        </button>
                        <p className={"small mt-3"}>
                            Dont have an account ?? <a href={"/register/"} className={"text-decoration-none"}>Register</a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}