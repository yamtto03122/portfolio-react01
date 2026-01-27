import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Container, DomHead, Footer, NavBar } from "../components"
import { FaArrowLeft } from 'react-icons/fa'
import { ResponsiveNavbar } from '../components/Navbar'

import userInfo from "../data/usersInfo.json"

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
            link.download = "resume.pdf"
            link.click()
        }

        return (
            <div className="fixed top-0 left-0 w-full h-screen bg-dark-400 z-[1500] flex flex-row items-center justify-center">
                <div id="box" className="w-[100%] h-[99%] mx-auto bg-dark-100 overflow-hidden rounded-md md:w-[70%]">
                    <div id="head" className="w-full h-auto p-3 bg-dark-200 flex items-start justify-start">
                        <h2>My Resume</h2>
                        <button className="px-3 py-1 flex flex-row items-center justify-center bg-green-300 ml-4 text-[12px] text-dark-300 font-bold rounded-[5px] scale-[.90] transition-all hover:scale-[.95]  " onClick={dowloadCv}>Download</button>
                        <button className="px-3 py-1 flex flex-row items-center justify-center bg-red-500 ml-4 text-[12px] text-dark-300 font-bold rounded-[5px] scale-[.90] transition-all hover:scale-[.95] " onClick={openResume}>Close</button>
                    </div>
                    <iframe src={"/CV/resume.pdf"} frameborder="0" className="w-full h-full overflow-scroll bg-white-200 mt-0"></iframe>
                    <br />
                    <br />
                    <br />
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
            <div id="top-head" className=" w-full pt-[70px] px-[10%] h-[25vh] bg-blue-50 p-3 flex flex-col items-start justify-start ">
                <Container className="">
                    <Link href={"/"}>
                        <a><FaArrowLeft className='px-3 py-1 text-white text-[35px] bg-dark-100 rounded-[4px] cursor-pointer' /></a>
                    </Link>
                    <h1 className="text-[50px] font-bold ">
                        About
                    </h1>
                    <p className="text-[15px] text-slate-400 ">
                        About Me.
                    </p>
                </Container>
            </div>

            <div className="w-full h-auto ">
                <Container>
                    <div className="w-full md:px-[10%] h-auto flex flex-col items-center justify-between p-10 md:flex-row">
                        <div className="w-full md:w-[50%] ">
                            <div className="w-full h-[450px] bg-cover bg-center bg-no-repeat md:w-[350px] rounded-md" style={{
                                backgroundImage: `url("/images/me.png")`
                            }}></div>
                        </div>
                        <div className="w-full md:w-[50%] ">
                            <div className={`w-full h-auto relative mb-[30px] md:mb-0 md:top-0`}>
                                <p className={`text-sm text-slate-500 mb-3`}>Introduce</p>
                                <div className={`relative`}>
                                    <h1 className={`text-3xl font-bold mb-4`}>
                                        {userInfo.greeting_type}  I'm {userInfo.full_name}
                                    </h1>
                                    <p className={`mb-5 text-base text-slate-600 italic px-3 py-2 bg-slate-50 border-l-[3px] border-solid border-l-blue-100 break-keep`}>
                                        {userInfo.intro_tagline}
                                    </p>
                                    <p className={`text-sm mb-7 text-slate-500 break-keep`}>
                                        안녕하세요. 저는 디자인과 개발의 경계를 넘나드는 프론트엔드 개발자로,<br/>
                                        사용자의 다음 행동을 먼저 생각하고, 자연스러운 경험을 구현합니다.<br/>
                                        사용자 중심 사고와 디테일한 설계를 바탕으로 완성도 높은<br/>
                                        인터페이스를 구현하며 협업과 책임감을 강점으로 성장해왔습니다.
                                    </p>
                                                
                                </div>
                                <div className={`relative flex flex-col align-start items-start justify-start gap-4 w-full`}>
                                    <div className="w-full flex items-center">
                                        <div className={`w-[50%] mr-[20px] flex flex-row items-center justify-start`}>
                                            <span className={` w-20 text-slate-400 text-xs `}>
                                                Name
                                            </span>
                                            <h1 className={` text-base pt-[5px] pr-[10px] pb-0 pl-0 `}>
                                                김도영
                                            </h1>
                                        </div>
                                        <div className={`w-[50%] mr-[20px] flex flex-row items-center justify-start`}>
                                            <span className={` w-20 text-slate-400 text-xs `}>
                                                Birth date
                                            </span>
                                            <h1 className={` text-base pt-[5px] pr-[10px] pb-0 pl-0 `}>
                                                1996.03.18
                                            </h1>
                                        </div>
                                    </div>
                                    <div className="w-full flex items-center">
                                        <div className={`flex-1 mr-[20px] flex flex-row items-center justify-start`}>
                                            <span className={` w-20 text-slate-400 text-xs `}>
                                                Phone
                                            </span>
                                            <h1 className={` text-base pt-[5px] pr-[10px] pb-0 pl-0 `}>
                                                010-3155-3402
                                            </h1>
                                        </div>
                                        <div className={`flex-1 mr-[20px] flex flex-row items-center justify-start`}>
                                            <span className={` w-20 text-slate-400 text-xs `}>
                                                MBTI
                                            </span>
                                            <h1 className={` text-base pt-[5px] pr-[10px] pb-0 pl-0 `}>
                                                ISTP
                                            </h1>
                                        </div>
                                    </div>
                                    <div className={`w-full mr-[20px] flex flex-row items-center justify-start`}>
                                        <span className={` w-20 text-slate-400 text-xs `}>
                                            Education
                                        </span>
                                        <h1 className={` text-base pt-[5px] pr-[10px] pb-0 pl-0 `}>
                                            남서울대학교 시각정보디자인학과 학사 졸업
                                        </h1>
                                    </div>
                                    <div className={`w-full mr-[20px] flex flex-row items-center justify-start`}>
                                        <span className={` w-20 text-slate-400 text-xs `}>
                                            Address
                                        </span>
                                        <h1 className={` text-base pt-[5px] pr-[10px] pb-0 pl-0 `}>
                                            서울특별시 영등포구 대림동
                                        </h1>
                                    </div>
                                    <div className={`w-full mr-[20px] flex flex-row items-center justify-start`}>
                                        <span className={` w-20 text-slate-400 text-xs `}>
                                            Email
                                        </span>
                                        <h1 className={` text-base pt-[5px] pr-[10px] pb-0 pl-0 `}>
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
