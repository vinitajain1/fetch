import LoginForm from "./components/LoginForm";

export default function Login(){
    return(
        <div className="p-8 flex flex-col">
            <header className="text-6xl font-bold">
                <span className="text-customPurple">FETCH</span>
            </header>
            <section>
                <div className="flex gap-10 items-center justify-center">
                    <LoginForm/>
                    <img src="./login-background_processed.jpg" alt="dogs image" className="h-full"></img>
                </div>
            </section>
        </div>
    )
}