
import React, { useContext, useState, useEffect } from 'react'
import { Container } from '..'
import { AiFillMessage, AiOutlineClose } from 'react-icons/ai'
import DataContext from '../../context/DataContext'
import emailjs from '@emailjs/browser';
import { Notification, validateEmail } from '../../helpers'
export const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
export const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
export const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;


const notif = new Notification(3000)

function Contact() {

    const { contactActive, closeContactForm, openContactForm } = useContext(DataContext)
    const [scrolled, setScrolled] = useState(false)
    useEffect(() => {
        let prevScrollY = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // 아래로 스크롤 → true
            if (currentScrollY > prevScrollY) {
            setScrolled(true);
            }
            // 위로 스크롤 → false
            else {
            setScrolled(false);
            }

            prevScrollY = currentScrollY;
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div className="w-full bg-blue-100 h-auto px-4 py-14 md:py-20 md:px-[10%] ">
            <Container>
                <div className="w-full h-auto flex flex-col items-start justify-start ">
                    <h1 data-aos="fade-right" className="text-2xl md:text-3xl text-white">
                        함께 고민하고, 함께 성장하며<br/>
                        <span className="text-green-200 font-extrabold">가치를 만들어갈 팀</span>을 찾고 있습니다.
                    </h1>
                    <br />
                    <a id='contact'></a>
                    <p data-aos="fade-right" className=" text-lg text-white mb-1">
                        언제든 부담 없이 편하게 연락 주세요!
                    </p>
                    <span data-aos="fade-right" className=" text-green-200 text-lg underline cursor-pointer " onClick={openContactForm}>Saying Hi! 👋🏻</span>
                </div>
            </Container>


            {/* contact form */}
            <ContactForm closeContactForm={closeContactForm} contactActive={contactActive} />

            <div id="floating-btn" className={`fixed ${scrolled ? "bottom-20" : "bottom-8" }  right-4 z-[100] flex flex-col items-center justify-center md:bottom-10 transition-all`}>
                <span className={`flex flex-col items-center justify-center p-[12px] bg-dark-400 rounded-[50%] transition-all md:scale-[.80] md:hover:scale-[.95] cursor-pointer `}>
                    <AiFillMessage className='text-[30px] text-white ' onClick={openContactForm} />
                </span>
            </div>

        </div>
    )
}

export default Contact

function ContactForm({ contactActive, closeContactForm }) {

    const [loading, setLoading] = useState(false)
    const [userInput, setUserInputs] = useState({
        name: "",
        email: "",
        message: ""
    })

    function handleInput(e) {
        let inputName = e.target.name;
        let inputVal = e.target.value;

        setUserInputs((prev) => {
            return {
                ...prev, [inputName]: inputVal
            }
        })
    }

    function sendMessage() {

        if (!userInput.name) return notif.error("이름을 입력해주세요.");
        if (!userInput.email) return notif.error("이메일을 입력해주세요.");
        if (!userInput.message) return notif.error("내용을 입력해주세요.");
        if (!validateEmail(userInput.email)) return notif.error("email is invalid.");

        if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
            console.error("EmailJS config missing");
            return notif.error("메일 설정 오류");
        }

        const { name, email, message } = userInput

        const templateParams = {
            from_name: name,
            sender_email: email,
            message
        };

        setLoading(true)
        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY)
            .then((response) => {
                setLoading(false)
                notif.success("메일이 전송되었습니다.")
                userInput.email = ""
                userInput.name = ""
                userInput.message = ""
                return console.log(response);
            }, (err) => {
                setLoading(false)
                notif.error("메일 전송 실패")
                console.error(err)
            });

    }

    return (
        <div className="w-full ">
            <div className={`w-[380px] ${contactActive ? "h-[100vh] border border-slate-200" : "h-0 overflow-hidden"} max-h-[400px] bg-white shadow-xl z-[999] fixed bottom-[90px] right-1 px-3 rounded-md transition-all md:right-5 md:bottom-[20px] md:w-[350px]`} id="form">
                <div id="head" className='w-full flex flex-row items-start justify-start'>
                    <h1 className="text-[20px] py-4 font-semibold">
                        Contact Me
                    </h1>
                    <AiOutlineClose className={`p-2 text-[35px] absolute top-[-16px] right-[-5px] text-white bg-red-700 rounded-full cursor-pointer ${contactActive ? "flex" : "hidden"} `} onClick={closeContactForm} />
                </div>
                <div id="inputs" className="w-full flex flex-col items-start justify-start">
                    <input type="text" name="name" className="w-full px-2 py-[12px] mb-4 rounded-md bg-blue-50 border-[2px] border-none outline-none " placeholder='Company' value={userInput.name} onChange={handleInput} />

                    <input type="email" name="email" className="w-full px-2 py-[12px] mb-4 rounded-md bg-blue-50 border-[2px] border-none outline-none " placeholder='Email@mail.com' value={userInput.email} onChange={handleInput} />

                    <textarea cols="30" rows="5" name="message" className="w-full h-full bg-blue-50 resize-none rounded-md outline-none px-2 py-2 mb-3" placeholder='Message' onChange={handleInput} value={userInput.message}></textarea>
                    <button className="w-full px-2 py-3 text-center transition-all bg-blue-100 text-white rounded-md hover:bg-black" onClick={sendMessage}>
                        {loading ? <span className="text-green-200">Sending Message..</span> : "Send Message"}
                    </button>
                </div>
            </div>
        </div>
    )
}
