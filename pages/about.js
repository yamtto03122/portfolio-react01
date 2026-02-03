import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Container, DomHead, Footer, NavBar } from "../components"
import { FaArrowLeft } from 'react-icons/fa'
import { ResponsiveNavbar } from '../components/Navbar'

import userInfo from "../data/usersInfo.json"
import { IoClose } from 'react-icons/io5'

function About() {
    const [windowWidth, setWindowWidth] = useState(0)
    const [avatar, setAvatar] = useState("")
    const [resumeActive, setResumeActive] = useState(false)
    const [reposcount, setReposCount] = useState(0)

    function openResume() {
        setResumeActive(!resumeActive)
    }

    useEffect(() => {
        setWindowWidth(window.innerWidth)
        window.addEventListener("resize", () => {
            setWindowWidth(window.innerWidth)
        })
    }, [windowWidth])

    useEffect(() => {
        let useravatar = JSON.parse(localStorage.getItem("github_avatar"))
        setAvatar(useravatar)
    }, [])


    function ResumeViewer({ openResume }) {

        function dowloadCv() {
            let link = document.createElement("a")
            link.href = resume;
            link.download = "resume_kimdoyoung.pdf"
            link.click()
        }

        return (
            <div className="fixed top-0 left-0 w-full px-4 h-screen bg-dark-400 z-[1500] flex flex-row items-center justify-center">
                <div id="box" className="w-[100%] h-[95vh] mx-auto bg-white overflow-hidden rounded-md md:w-[70%]">
                    <div id="head" className="w-full h-auto p-3 bg-white flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <h2 className="font-bold">김도영 이력서✨</h2>
                            <button className="px-3 py-1 flex flex-row items-center justify-center bg-blue-100 text-[12px] text-white font-bold rounded-[5px] scale-[.90] transition-all hover:scale-[.95]  " onClick={dowloadCv}>Download</button>
                        </div>
                        <button className="text-2xl text-slate-600" onClick={openResume}><IoClose/></button>
                    </div>
                    <iframe src={"/CV/resume_kimdoyoung.pdf"} frameborder="0" className="w-full h-full overflow-scroll bg-white mt-0"></iframe>
                </div>
            </div>
        )
    }

    return (
        <div>
            <DomHead pageName='About' />
            <Container>
                <NavBar />
            </Container>
            <div id="top-head" className=" w-full pt-[70px] px-4 md:px-[10%] h-[25vh] bg-blue-50 p-3 flex flex-col items-start justify-start ">
                <Container className="">
                    <Link href={"/"}>
                        <FaArrowLeft className='p-2 md:p-3 text-white text-[30px] md:text-[35px] bg-dark-100 rounded-[4px] cursor-pointer mb-3' />
                    </Link>
                    <h1 className="text-3xl md:text-4xl font-bold mb-3 ">
                        About
                    </h1>
                    <p className="text-sm md:text-base text-slate-400 ">
                        About Me.
                    </p>
                </Container>
            </div>

            <div className="w-full h-auto ">
                <Container>
                    <div className="w-full md:px-[10%] h-auto flex flex-col items-center justify-between px-4 py-10 md:p-10 md:flex-row gap-7 md:gap-2">
                        <div className="flex-1 w-full">
                            <div className="w-full aspect-square md:h-[450px] bg-cover bg-center bg-no-repeat md:w-[30vw] rounded-md" style={{
                                backgroundImage: `url("/images/me.png")`}}>

                            </div>
                        </div>
                        <div className="flex-1 w-full">
                            <div className={`w-full h-auto relative mb-[30px] md:mb-0 md:top-0`}>
                                <p className={`text-sm text-slate-500 mb-3`}>Introduce</p>
                                <div className={`relative`}>
                                    <h1 className={`text-3xl font-bold mb-4`}>
                                        {userInfo.greeting_type}  I'm {userInfo.full_name}
                                    </h1>
                                    <p className={`mb-5 text-base text-slate-600 italic px-3 py-2 bg-blue-10 border-l-[3px] border-solid border-l-blue-100 break-keep`}>
                                        {userInfo.intro_tagline}
                                    </p>
                                    <p className={`text-sm mb-7 text-slate-500 break-keep leading-relaxed`}>
                                        안녕하세요.<br/>
                                        저는 디자인과 개발의 경계를 넘나드는 프론트엔드 개발자로,<br/>
                                        사용자의 다음 행동을 먼저 생각하고,<br/>
                                        자연스러운 경험을 구현합니다.<br/>
                                        사용자 중심 사고와 디테일한 설계를 바탕으로<br/>
                                        완성도 높은 인터페이스를 구현하며<br/>
                                        협업과 책임감을 강점으로 성장해왔습니다.
                                    </p>
                                                
                                </div>
                                <div className={`relative flex flex-col align-start items-start justify-start gap-4 w-full`}>
                                    <div className="w-full flex items-center gap-5">
                                        <div className={`flex-1 flex flex-row items-center justify-start`}>
                                            <span className={` w-[70px] md:w-20 text-slate-400 text-xs `}>
                                                Name
                                            </span>
                                            <h1 className={`  text-[15px] md:text-base pt-[5px]  `}>
                                                김도영
                                            </h1>
                                        </div>
                                        <div className={`flex-1 flex flex-row items-center justify-start`}>
                                            <span className={` w-[70px] md:w-20 text-slate-400 text-xs `}>
                                                Birth date
                                            </span>
                                            <h1 className={`  text-[15px] md:text-base pt-[5px]  `}>
                                                1996.03.18
                                            </h1>
                                        </div>
                                    </div>
                                    <div className="w-full flex items-center gap-5">
                                        <div className={`flex-1 flex flex-row items-center justify-start`}>
                                            <span className={` w-[70px] md:w-20 text-slate-400 text-xs `}>
                                                Phone
                                            </span>
                                            <h1 className={`  text-[15px] md:text-base pt-[5px]  `}>
                                                010.3155.3402
                                            </h1>
                                        </div>
                                        <div className={`flex-1 flex flex-row items-center justify-start`}>
                                            <span className={` w-[70px] md:w-20 text-slate-400 text-xs `}>
                                                MBTI
                                            </span>
                                            <h1 className={`  text-[15px] md:text-base pt-[5px]  `}>
                                                ISTP
                                            </h1>
                                        </div>
                                    </div>
                                    <div className={`w-full flex flex-row items-center justify-start`}>
                                        <span className={` w-[70px] md:w-20 text-slate-400 text-xs `}>
                                            Education
                                        </span>
                                        <h1 className={`  text-[15px] md:text-base pt-[5px]  `}>
                                            남서울대학교 시각정보디자인학과 학사 졸업
                                        </h1>
                                    </div>
                                    <div className={`w-full flex flex-row items-center justify-start`}>
                                        <span className={` w-[70px] md:w-20 text-slate-400 text-xs `}>
                                            Address
                                        </span>
                                        <h1 className={`  text-[15px] md:text-base pt-[5px]  `}>
                                            서울특별시 영등포구 대림동
                                        </h1>
                                    </div>
                                    <div className={`w-full flex flex-row items-center justify-start`}>
                                        <span className={` w-[70px] md:w-20 text-slate-400 text-xs `}>
                                            Email
                                        </span>
                                        <h1 className={`  text-[15px] md:text-base pt-[5px]  `}>
                                            hell03122@naver.com
                                        </h1>
                                    </div>
                                </div>
                                <button className="w-[150px] text-lg mt-10 border-[2px] border-solid border-blue-100 px-5 py-3 bg-dark-100 text-blue-50 rounded-full scale-[.90] hover:scale-[.95] transition-all  " onClick={openResume}>이력서 보기</button>

                                {resumeActive && <ResumeViewer openResume={openResume} />}
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
            <br />
            <Footer />
            {windowWidth <= 700 && <ResponsiveNavbar pageName={"projects"} />}
        </div>
    )
}

export default About
