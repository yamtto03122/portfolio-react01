
import React, { useContext, useState } from 'react'
import { Container } from '..'
import { AiFillMessage, AiOutlineClose } from 'react-icons/ai'
import DataContext from '../../context/DataContext'
import emailjs from '@emailjs/browser';
import { Notification, validateEmail } from '../../helpers'
import { EMAILJS_TEMPLATE_ID, EMAILJS_SERVICE_ID, EMAILJS_PUBLIC_KEY } from '../../config';

const notif = new Notification(3000)

function Contact() {

    const { contactActive, closeContactForm, openContactForm } = useContext(DataContext)

    return (
        <div className="w-full bg-blue-100 h-auto px-4 py-14 md:py-20 md:px-[10%] ">
            <Container>
                <div className="w-full h-auto flex flex-col items-start justify-start ">
                    <h1 data-aos="fade-right" className="text-2xl md:text-3xl text-white leading-normal">
                        함께 고민하고, 함께 성장하며<br/>
                        <span className="text-green-200 font-extrabold">가치를 만들어갈 팀</span>을 찾고 있습니다.
                    </h1>
                    <br />
                    <a id='contact'></a>
                    <p data-aos="fade-right" className=" text-lg text-white ">
                        언제든 부담 없이 편하게 연락 주세요!
                    </p>
                    <span data-aos="fade-right" className=" text-green-200 underline cursor-pointer " onClick={openContactForm}>Saying Hi! 👋🏻</span>
                </div>
            </Container>


            {/* contact form */}
            <ContactForm closeContactForm={closeContactForm} contactActive={contactActive} />

            <div id="floating-btn" className="fixed bottom-20 right-5 z-[100] flex flex-col items-center justify-center md:bottom-10 ">
                <span className={`flex flex-col items-center justify-center p-[12px] bg-dark-400 rounded-[50%] border-green-2003 transition-all scale-[.80] hover:scale-[.95] cursor-pointer `}>
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

        if (userInput.name === "") {
            return notif.error("username cant be blank.")
        }
        if (userInput.email === "") {
            return notif.error("email cant be blank.")
        }
        if (userInput.message === "") {
            return notif.error("message cant be blank.")
        }

        // validate phonenumber
        if (validateEmail(userInput.email) == false) {
            return notif.error("email is invalid.")
        }

        const { name, email, message } = userInput

        const templateParams = {
            from_name: name,
            sender_email: email,
            message
        };

        // check if EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY isnt empty

        if (EMAILJS_TEMPLATE_ID === "" || EMAILJS_SERVICE_ID === "" || EMAILJS_PUBLIC_KEY === "") {
            console.error(`
                FAILED TO SEND MESSAGE: missing some configurations. check your config file.

                check your config/index.js file
            `)
            return notif.error(` FAILED TO SEND MESSAGE: something went wrong.`)
        }

        setLoading(true)
        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY)
            .then((response) => {
                setLoading(false)
                notif.success("MESSAGE SENT.")
                userInput.email = ""
                userInput.name = ""
                userInput.message = ""
                return console.log(response);
            }, (err) => {
                setLoading(false)
                notif.error(`Something went wrong, could not send message.`)
                console.error(err)
            });

    }

    return (
        <div className="w-full ">
            <div className={`w-[380px] ${contactActive ? "h-[100vh]" : "h-0 overflow-hidden"} max-h-[450px] bg-dark-300 shadow-xl z-[999] fixed bottom-[90px] right-1 px-3 rounded-md transition-all md:right-5 md:bottom-[20px] md:w-[350px]`} id="form">
                <div id="head" className='w-full flex flex-row items-start justify-start'>
                    <h1 className="text-[20px] py-4 ">
                        Contact Me
                    </h1>
                    <AiOutlineClose className={`p-2 text-[35px] absolute top-[-16px] right-[-5px] text-red-200 bg-red-900 rounded-[50%] cursor-pointer ${contactActive ? "flex" : "hidden"} `} onClick={closeContactForm} />
                </div>
                <div id="inputs" className="w-full flex flex-col items-start justify-start">
                    <input type="text" name="name" className="w-full px-2 py-[12px] mb-4 rounded-md bg-dark-100 border-[2px] border-none outline-none " placeholder='Full Name' value={userInput.name} onChange={handleInput} />

                    <input type="mail" name="email" className="w-full px-2 py-[12px] mb-4 rounded-md bg-dark-100 border-[2px] border-none outline-none " placeholder='johndoe@mail.com' value={userInput.email} onChange={handleInput} />

                    <textarea cols="30" rows="5" name="message" className="w-full h-full bg-dark-100 resize-none rounded-md outline-none px-2 py-2 mb-3" placeholder='Message' onChange={handleInput} value={userInput.message}></textarea>
                    <button className="w-full px-2 py-3 text-center transition-all bg-dark-200 rounded-md hover:bg-dark-400" onClick={sendMessage}>
                        {loading ? <span className="text-green-200">Sending Message..</span> : "Send Message"}
                    </button>
                </div>
            </div>
        </div>
    )
}
