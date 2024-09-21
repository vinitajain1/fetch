import LoginForm from "./components/LoginForm";

export default function Login(){
    return(
        <div className="p-8 flex flex-col gap-9">
            <header className="text-6xl font-bold">
                <span className="text-customPurple">FETCH</span>
            </header>
            <section>
                <div className="flex flex-wrap gap-10 items-center justify-center">
                    <LoginForm/>
                    <img src="./login-background_processed.jpg" alt="dogs" className="h-full hidden md:block"></img>
                </div>
            </section>
        </div>
    )
}