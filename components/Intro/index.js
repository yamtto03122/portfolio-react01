

import Link from "next/link"

import skills from "../../data/skills.json"
import usersInfo from "../../data/usersInfo.json"
import { useState, useEffect } from "react"
import { IoColorWand } from "react-icons/io5";
import languages from "../../data/languages.json"
import { FaArrowRight } from "react-icons/fa6";

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
            <div className={`intro w-full px-3 md:px-[10%] bg-white flex align-center items-center justify-center py-20 gap-5`}>
                <div className={`w-full h-full relative md:flex-1`}>
                    <div className={`mb-10`}>
                        <p data-aos="fade-up" className={`py-[2px] px-[8px] bg-blue-50 text-blue-100 rounded-[3px] text-sm text-capitalize mb-5 w-fit `}>
                            {usersInfo.user_skill}
                        </p>
                        <h1 data-aos="zoom-in-up" className={`text-4xl font-bold mb-8`}>
                            {usersInfo.greeting_type}  I'm {usersInfo.full_name}.
                        </h1>
                        <p data-aos="zoom-in-right" className={`text-base text-slate-600 italic px-3 py-2 bg-slate-50 border-l-[3px] border-solid border-l-blue-100 break-keep mb-5`}>
                            {usersInfo.intro_tagline}
                        </p>
                        <p data-aos="fade-up" className={`text-sm mb-5 text-slate-500 break-keep`}>
                            안녕하세요. 저는 디자인과 개발의 경계를 넘나드는 프론트엔드 개발자로,<br/>
                            사용자의 다음 행동을 먼저 생각하고, 자연스러운 경험을 구현합니다.<br/>
                            사용자 중심 사고와 디테일한 설계를 바탕으로 완성도 높은<br/>
                            인터페이스를 구현하며 협업과 책임감을 강점으로 성장해왔습니다.
                        </p>
                    </div>
                    <div className={`relative flex align-start items-start justify-start w-full mb-8`}>
                        <div data-aos="zoom-in-left" className={`w-[50%] mr-[20px] flex flex-row items-center justify-start`}>
                            <span className={` w-24 text-white-300 text-xs `}>
                                Years of Experience
                            </span>
                            <h1 className={` text-[35px] pt-[10px] pr-[10px] pb-0 pl-0 `}>
                                {(new Date().getFullYear() - parseInt(usersInfo.tech_year))+1}
                            </h1>
                        </div>
                        <div data-aos="zoom-in-right" className={`w-[50%] mr-[20px] flex flex-row items-center justify-start`}>
                            <span className={` w-24 text-white-300 text-xs `}>
                                Projects
                            </span>
                            <h1 className={` text-[35px] pt-[10px] pr-[10px] pb-0 pl-0 `}>
                                {reposcount}
                            </h1>
                        </div>
                    </div>
                    <Link href="/about">
                        <a data-aos="zoom-in-up" className="text-lg mt-14 flex items-center gap-2 w-fit border-[2px] border-solid border-blue-100 px-5 py-3 bg-dark-100 text-blue-50 rounded-full scale-[.90] hover:scale-[.95] transition-all ">
                        More Profile
                        <FaArrowRight />
                        </a>
                    </Link>
                    
                </div>
                <div data-aos="fade-left" className={`main w-full h-auto hidden md:block md:flex-1 relative `}>
                    <div className={`img-cont w-[350px] h-[350px] p-[15vmin] flex flex-col items-center justify-center bg-cover bg-center  rounded-[50%] `}>
                        <style jsx>{`
                            .img-cont{
                                background-image: url("/images/me.png");
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
            </div>
            <div className={`w-full py-20 px-3 md:px-0 relative  bg-blue-10`}>
                <div className={`w-full mx-auto md:w-[80%] flex flex-col md:flex-row items-start justify-between`}>

                    <div className={`w-full mb-8 md:mb-0 md:w-[45%]`}>
                        <p className={`text-sm text-slate-500 `}>Career</p>
                        <div className={``}>

                            <h1 data-aos="fade-right" className={` text-[8vmin] md:text-[4vmin] break-keep font-semibold mb-4`}>
                                {usersInfo.tag_line}
                            </h1>
                            <span data-aos="fade-in" className={` text-[20px] md:text-[2.5vmin] break-keep`}>
                                {usersInfo.subTitle}
                            </span>
                        </div>
                    </div>
                    <div className={`w-full h-auto relative container md:w-[55%] flex flex-col gap-3`}>
                        {/* boxes */}
                        <IntroCards data={skills.skill} />
                    </div>
                </div>
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
                            <div data-aos="zoom-in-up" key={i} className={`w-full p-[20px] rounded-[5px] bg-white m-[0px] relative transition-all hover:shadow `}>
                                <div className={`flex flex-col items-start justify-start`}>
                                    <p className={`text-lg font-extrabold text-blue-100 mb-2`}>
                                        {skill.name}
                                    </p>
                                    <p className="text-base mb-3 break-keep">{skill.description}</p>
                                    <div className="flex flex-col md:flex-row md:items-center justify-between w-full">
                                        <div className="flex items-center gap-2">
                                            <span className={`text-sm text-slate-500`}>{skill.job}</span>
                                            <span className="text-slate-300">|</span>
                                            <span className={`text-sm text-slate-500`}>{skill.position}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className={` text-sm text-slate-500`}>
                                                {skill.period}
                                            </span>
                                            <span className="text-slate-300">|</span>
                                            <span className={` text-sm text-slate-500 font-bold`}>
                                                {skill.calculation}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <IoColorWand className="absolute top-[10px] text-xl right-[10px] text-slate-300" />
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
                        <IoColorWand className="absolute top-[10px] text-xl right-[10px] text-slate-300 p-[5px]" />
                    </div>
            }
        </>
    )
}