
import { Container } from ".."
import TxtRotate from "./TxtRotate"
import { BsMouse } from "react-icons/bs";

export default function Header({ children }) {

    return (
        <header className={`header w-full h-screen relative after:content-[""] after:w-1/2 after:h-full after:bg-blue-50 after:absolute after:-z-10 after:left-0 after:top-0 before:content-[""] before:w-1/2 before:h-full before:bg-white before:absolute before:-z-10 before:right-0`}>
            <Container>
                {children}

            <div className={`w-full h-screen flex align-center items-center justify-center flex-row p-[20px] flex-wrap `}>
                <div className="text text-center mb-16">
                    <span className="subheading text-lg font-black mb-3 block text-blue-100 tracking-[4px]">HEY! I AM</span>
                    <h1 className="text-6xl font-black mb-5">김도영</h1>
                    <div className="text-2xl font-extrabold">
                        <span className="pr-1">I'm a</span>
                        <TxtRotate period={500} toRotate={["프론트앤드", "4년차", "ISTP"]}/>
                    </div>
                </div>
                <div className="absolute bottom-28 left-1/2 -translate-x-1/2 bg-blue-50 w-20 h-20 rotate-45 flex items-center justify-center">
                <span className="absolute rotate-[315deg] mt-1"><BsMouse className="text-blue-100 animate-bounce text-4xl"/></span>
                    
                </div>
            </div>
            </Container>
        </header>
    )
}



