

import Link from "next/link"

import skills from "../../data/skills.json"
import usersInfo from "../../data/usersInfo.json"
import { useState, useEffect } from "react"
import myPhoto from "../../public/images/me.png"

import languages from "../../data/languages.json"
import TxtRotate from "../Header/TxtRotate"


export default function Intro() {

    const [resumeActive, setResumeActive] = useState(false)
    const [reposcount, setReposCount] = useState(0)
    const [avatar, setAvatar] = useState("")

    const userName = usersInfo.github_username;

    function openResume() {

        setResumeActive(!resumeActive)
    }

    // fetch github repos count
    async function getReposCount() {
        let res;
        if (localStorage.getItem("repo_counts") === null) {

            res = await fetch(`https://api.github.com/users/${userName}`)
            let data = await res.json()

            if (data && data.public_repos !== undefined) {
                const { public_repos, avatar_url } = data;
                localStorage.setItem("repo_counts", JSON.stringify(public_repos))
                // store github user avatar
                localStorage.setItem("github_avatar", JSON.stringify(avatar_url))
                setReposCount(public_repos)
            }
        }

        // get data from cahched localstorage
        let data = JSON.parse(localStorage.getItem("repo_counts"))
        let useravatar = JSON.parse(localStorage.getItem("github_avatar"))

        setReposCount(data)
        setAvatar(useravatar)

        return data
    }

    useEffect(() => {

        (async () => {
            await getReposCount()

        })()

    }, [])

    return (
        <>

            {/* shows on desktop */}
            <div className={`intro w-full mx-auto md:w-[80%] h-[70vmin] bg-white-100 flex align-center items-center justify-center flex-row p-[20px] flex-wrap mt-16`}>
                <div data-aos="fade-left" className={`main w-full h-auto hidden md:block md:w-[50%] relative `}>
                    <div className={`img-cont w-[250px] h-[250px] p-[15vmin] flex flex-col items-center justify-center bg-cover bg-center  rounded-[50%] `}>
                        <style jsx>{`
                            .img-cont{
                                background-image: url("../../public/images/me.png");
                            }
                        `}</style>
                        {/* <img data-aos="zoom-in-up" src={myPhoto} className={`avatar rounded-[50%] `} /> */}
                    </div>
                    <div data-aos="fade-up" className={`circleA`}>
                        <img src={languages.languages.length === 0 && languages.languages.length > 2 ? "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" : languages.languages[0]} className={`langImgA`} />
                    </div>
                    <div data-aos="fade-right" className={`circleB`}>
                        <img src={languages.languages.length === 0 && languages.languages.length > 2 ? "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" : languages.languages[1]} className={`langImgB`} />
                    </div>
                    <div data-aos="fade-left" className={`circleC`}>
                        <img src={languages.languages.length === 0 && languages.languages.length > 2 ? "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" : languages.languages[2]} className={`langImgC`} />
                    </div>
                </div>
                <div className={`w-full h-full mb-[50px] relative md:w-[50%]`}>
                    <div className={``}>
                        <p data-aos="fade-up" className={`py-[2px] px-[8px] bg-blue-50 text-blue-100 rounded-[3px] text-[12px] text-capitalize mb-5 w-fit `}>
                            {usersInfo.user_skill}
                        </p>
                        <h1 data-aos="fade-right" className={` text-[8vmin] md:text-[4vmin] break-keep font-semibold mb-3`}>
                            {usersInfo.tag_line}
                        </h1>
                        <span data-aos="fade-in" className={` text-[20px] md:text-[2vmin] `}>
                            {usersInfo.subTitle}
                        </span>
                    </div>
                    <div className={`relative top-[50px] flex flex-col align-start items-start justify-start gap-4 w-full`}>
                        <div data-aos="zoom-in-right" className="w-full flex items-center">
                            <div className={`w-[50%] mr-[20px] flex flex-row items-center justify-start`}>
                                <span className={` w-24 text-white-300 text-sm `}>
                                    Name
                                </span>
                                <h1 className={` text-xl pt-[10px] pr-[10px] pb-0 pl-0 `}>
                                    김도영
                                </h1>
                            </div>
                            <div className={`w-[50%] mr-[20px] flex flex-row items-center justify-start`}>
                                <span className={` w-24 text-white-300 text-sm `}>
                                    Age
                                </span>
                                <h1 className={` text-xl pt-[10px] pr-[10px] pb-0 pl-0 `}>
                                    1996.03.18
                                </h1>
                            </div>

                        </div>
                        <div data-aos="zoom-in-right" className={`w-full mr-[20px] flex flex-row items-center justify-start`}>
                            <span className={` w-24 text-white-300 text-sm `}>
                                Phone
                            </span>
                            <h1 className={` text-xl pt-[10px] pr-[10px] pb-0 pl-0 `}>
                                010-3155-3402
                            </h1>
                        </div>
                        <div data-aos="zoom-in-left" className={`w-full mr-[20px] flex flex-row items-center justify-start`}>
                            <span className={` w-24 text-white-300 text-sm `}>
                                Address
                            </span>
                            <h1 className={` text-xl pt-[10px] pr-[10px] pb-0 pl-0 `}>
                                서울특별시 영등포구 대림동
                            </h1>
                        </div>
                        <div className="w-full flex items-center">
                            <div data-aos="zoom-in-left" className={`w-[50%] mr-[20px] flex flex-row items-center justify-start`}>
                                <span className={` w-24 text-white-300 text-sm `}>
                                    Years of Experience
                                </span>
                                <h1 className={` text-[35px] pt-[10px] pr-[10px] pb-0 pl-0 `}>
                                    {(new Date().getFullYear() - parseInt(usersInfo.tech_year))+1}
                                </h1>
                            </div>
                            <div data-aos="zoom-in-right" className={`w-[50%] mr-[20px] flex flex-row items-center justify-start`}>
                                <span className={` w-24 text-white-300 text-sm `}>
                                    Projects
                                </span>
                                <h1 className={` text-[35px] pt-[10px] pr-[10px] pb-0 pl-0 `}>
                                    {reposcount}
                                </h1>
                            </div>
                        </div>
                    </div>
                    <button className="w-[150px] text-lg mt-24 border-[2px] border-solid border-blue-100 px-5 py-3 bg-dark-100 text-blue-50 rounded-full scale-[.90] hover:scale-[.95] transition-all  " onClick={openResume}>이력서 보기</button>

                    {resumeActive && <ResumeViewer openResume={openResume} />}
                </div>
            </div>
            <div className={`w-full mx-auto md:w-[80%] h-auto p-0 relative top-[50px] mb-[100px]`}>
                <div className={`w-full flex items-start justify-between flex-row flex-wrap-reverse`}>
                    <div className={`w-full h-auto p-[10px] relative container md:w-[50%]`}>
                        {/* boxes */}
                        <IntroCards data={skills.skill} />
                    </div>
                    <div className={`w-full h-auto relative top-[20px] p-[10px] mb-[30px] md:mb-0 md:w-[45%]`}>
                        <p className={`text-[12px] text-white-200 `}>Introduce</p>
                        <div className={`relative top-[20px]`}>
                            <h1 data-aos="zoom-in-up" className={`text-[35px] font-bold mb-[20px]`}>
                                {usersInfo.greeting_type}  I'm {usersInfo.full_name}.
                            </h1>
                            <br />
                            <br />
                            <p data-aos="zoom-in-right" className={`text-[15px] text-white-200 italic px-3 py-2 bg-dark-300 border-l-[3px] border-solid border-l-green-200 `}>
                                {usersInfo.intro_tagline}
                            </p>
                            <br />
                            <p data-aos="fade-up" className={`text-[14px] mb-5 text-white-200`}>
                                {usersInfo.bio_desc[0]}
                            </p>

                            <Link href="/about">
                                <a data-aos="zoom-in-up" className={`text-[14px] font-bold text-green-200 underline`}>Read More</a>
                            </Link>
                        </div>
                    </div>
                </div>
                {/* <div className={styles.companies}>
                    <img src="https://avatars.githubusercontent.com/u/104397777?s=200&v=4" className={styles.compImage} alt="" />
                    <img src="" className={styles.compImage} alt="" />
                </div>
                <br /> */}
            </div>
        </>
    )
}

function IntroCards({ data }) {

    return (
        <>
            {
                data.length > 0 ?
                    data.map((skill, i) => {
                        return (
                            <div data-aos="zoom-in-up" key={i} className={`w-full h-[120px] p-[20px] rounded-[5px] bg-dark-200 m-[0px] relative transition-all mt-4 hover:shadow-2xl `}>
                                <div className={`flex flex-col items-start justify-start`}>
                                    <p className={`m-0 font-extrabold text-green-100 `}>
                                        {skill.name}
                                    </p>
                                    <span className={`text-[12px] text-white-300 pt-[10px]  `}>
                                        {skill.description}
                                    </span>
                                </div>
                                <div className={`absolute bottom-[10px]`}>
                                    <a className={` text-[14px] text-white-200 font-bold underline `}>
                                        {skill.projects_completed} Projects
                                    </a>
                                </div>
                                <ion-icon name="color-wand" class={`absolute top-[10px] right-[10px] text-green-400 p-[5px] `}></ion-icon>
                            </div>
                        )
                    })
                    :
                    <div data-aos="zoom-in-up" className={`w-full h-[120px] p-[20px] rounded-[5px] bg-dark-200 m-[0px] relative transition-all mt-4 hover:shadow-2xl `}>
                        <div className={`flex flex-col items-start justify-start`}>
                            <p className={`m-0 font-extrabold text-green-100 `}>
                                Frontend Development
                            </p>
                            <span className={`text-[12px] text-white-300 pt-[10px]  `}>
                                Development of beautiful and unique user interfaces.
                            </span>
                        </div>
                        <div className={`absolute bottom-[10px]`}>
                            <a className={` text-[14px] text-white-200 font-bold underline `}>
                                60 Projects
                            </a>
                        </div>
                        <ion-icon name="color-wand" class={`absolute top-[10px] right-[10px] text-green-400 p-[5px] `}></ion-icon>
                    </div>
            }
        </>
    )
}


function ResumeViewer({ openResume }) {

    function dowloadCv() {
        let link = document.createElement("a")
        link.href = resume;
        link.download = "resume.pdf"
        link.click()
    }

    return (
        <div className="fixed top-0 left-0 w-screen h-screen bg-dark-400 z-[1500] flex flex-row items-center justify-center">
            <div id="box" className="w-[100%] h-[99%] mx-auto bg-dark-100 overflow-hidden rounded-md md:w-[70%]">
                <div id="head" className="w-full h-auto p-3 bg-dark-200 flex items-start justify-start">
                    <h2>My Resume / CV</h2>
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