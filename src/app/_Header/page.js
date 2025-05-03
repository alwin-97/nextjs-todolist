import Link from "next/link";
import "./style.css"

export default function Header(){
    return(
        <div
            className={"header"}
        >
            <Link className={"logo"} href={"/"}>
                My ToDo App
            </Link>
            <Link href={"/login/"} className={"text-decoration-none"}>Login</Link>
        </div>
    )
}