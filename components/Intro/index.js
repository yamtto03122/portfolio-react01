

import Link from "next/link"

import careers from "../../data/careers.json"
import usersInfo from "../../data/usersInfo.json"
import { useState, useEffect, useMemo } from "react"
import { IoColorWand } from "react-icons/io5";
import languages from "../../data/languages.json"
import { FaArrowRight } from "react-icons/fa6";
import projects from "../../data/projects.json"
import skills from "../../data/skills.json";

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

    const categories = useMemo(
        () => [
            { key: "language", label: "Language" },
            { key: "frontEnd", label: "FrontEnd" },
            { key: "etc", label: "ETC" },
            ],
        []
    );

    const [activeKey, setActiveKey] = useState("language");

    const activeSkills = skills?.skill?.[activeKey] ?? [];
    const title = categories.find((c) => c.key === activeKey)?.label ?? "Skill Stack";
console.log(activeKey)
    return (
        <>

            {/* shows on desktop */}
            <div className={`intro w-full px-4 md:px-[10%] bg-white flex align-center items-center justify-center py-20 gap-5`}>
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
                <div className={`w-full h-full relative md:flex-1`}>
                    <div className={`mb-10`}>
                        <p data-aos="fade-up" className={`py-[2px] px-[8px] bg-blue-50 text-blue-100 rounded-[3px] text-sm text-capitalize mb-5 w-fit `}>
                            {usersInfo.user_skill}
                        </p>
                        <h1 data-aos="zoom-in-up" className={`text-3xl md:text-4xl font-bold mb-8`}>
                            {usersInfo.greeting_type}  I'm {usersInfo.full_name}.
                        </h1>
                        <p data-aos="zoom-in-right" className={`text-base text-slate-600 italic px-3 py-2 bg-blue-10 border-l-[3px] border-solid border-l-blue-100 break-keep mb-5`}>
                            {usersInfo.intro_tagline}
                        </p>
                        <p data-aos="fade-up" className={`text-sm mb-5 text-slate-500 break-keep`}>
                            안녕하세요. 저는 디자인과 개발의 경계를 넘나드는 프론트엔드 개발자로,<br/>
                            사용자의 다음 행동을 먼저 생각하고, 자연스러운 경험을 구현합니다.<br/>
                            사용자 중심 사고와 디테일한 설계를 바탕으로 완성도 높은<br/>
                            인터페이스를 구현하며 협업과 책임감을 강점으로 성장해왔습니다.
                        </p>
                    </div>
                    <div className={`relative flex align-start items-start justify-start w-full gap-5 mb-8`}>
                        <div data-aos="zoom-in-left" className={`w-full flex-1 flex flex-row items-center justify-start`}>
                            <span className={` w-24 text-white-300 text-xs `}>
                                Years of Experience
                            </span>
                            <h1 className={` text-[35px] pt-[10px] pr-[10px] pb-0 pl-0 `}>
                                {(new Date().getFullYear() - parseInt(usersInfo.tech_year))+1}
                            </h1>
                        </div>
                        <div data-aos="zoom-in-right" className={`w-full flex-1 flex flex-row items-center justify-start`}>
                            <span className={` w-24 text-white-300 text-xs `}>
                                Projects
                            </span>
                            <h1 className={` text-[35px] pt-[10px] pr-[10px] pb-0 pl-0 `}>
                                {projects.projects.length}
                            </h1>
                        </div>
                    </div>
                    <Link href="/about">
                        <a data-aos="zoom-in-up" className="text-base md:text-lg mt-14 flex items-center gap-2 w-fit border-[2px] border-solid border-blue-100 px-5 py-3 bg-dark-100 text-blue-50 rounded-full scale-[.90] hover:scale-[.95] transition-all ">
                        More Profile
                        <FaArrowRight />
                        </a>
                    </Link>
                    
                </div>
            </div>
            <div className={`w-full py-20 px-4 md:px-[10%] relative  bg-blue-10`}>
                <div className={`w-full flex flex-col md:flex-row gap-10`}>
                    <div className={``}>
                        <p className={`text-3xl md:text-4xl font-extrabold mb-6 text-blue-100 `}>Careers</p>
                        <h1 data-aos="fade-right" className={`text-2xl md:text-3xl break-keep font-semibold mb-4`}>
                            {usersInfo.tag_line}
                        </h1>
                        <span data-aos="fade-in" className={` text-base md:text-lg break-keep`}>
                            {usersInfo.subTitle}
                        </span>
                    </div>
                    <div className="w-full flex flex-col gap-12">
                        <div className={`w-full h-auto relative container flex flex-col gap-3`}>
                            {/* boxes */}
                            <IntroCards data={careers.career} />
                        </div>
                    </div>
                </div>
            </div>

            <div className={`w-full py-20 px-4 md:px-[10%] relative md:min-h-[70vh]  overflow-hidden`}>
                <div className={`w-full flex flex-row items-center gap-5 mb-5 md:mb-10`}>
                    <p data-aos="fade-up" className={`text-3xl md:text-4xl font-extrabold`}>Skills</p>
                    <span data-aos="zoom-in" className={`flex-1 h-[2px] rounded-[30px] bg-blue-100 max-w-[80px] md:max-w-[120px]`}></span>
                </div>
                <div className="flex flex-col md:flex-row gap-5 md:gap-12">
                    <div data-aos="fade-right" className="flex md:flex-col gap-1 md:gap-3">
                        {categories.map((c) => {
                            const isActive = activeKey === c.key;

                            return (
                                <button key={c.key} type="button"
                                onClick={() => setActiveKey(c.key)}
                                className={[
                                    "text-left px-3 py-2 rounded-md transition",
                                    isActive
                                    ? "bg-slate-900 text-white font-bold"
                                    : "text-slate-600 hover:bg-slate-100",
                                ].join(" ")}
                                >
                                {c.label}
                                </button>
                            );
                        })}
                    </div>
                    <div className="flex flex-col gap-7 md:gap-10">
                        <h2 data-aos="fade-up" className="text-xl">Skill Stack <span className="text-blue-100 font-extrabold">@{title}</span></h2>
                        <ul data-aos="zoom-in-left" className="grid grid-cols-1 md:grid-cols-2 gap-y-6 md:gap-y-7 gap-x-9">
                            {activeSkills.map((skill, i) => (
                                <li key={`${activeKey}-${i}`} className="flex items-center gap-4">
                                    <p className="w-20 h-20 bg-blue-10 rounded-full overflow-hidden">
                                        <img src={skill.icon} alt={skill.name} className="w-full h-full object-cover p-4"/>
                                    </p>
                                    <div className="flex-1 flex flex-col gap-1">
                                        <p className="text-base text-slate-800 font-bold">{skill.name}</p>
                                        <div className="text-slate-500 text-sm break-keep">
                                            {skill.description}
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
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
                    data.map((career, i) => {
                        return (
                            <div data-aos="zoom-in-up" key={i} className={`w-full px-6 py-4 rounded-md bg-white m-[0px] relative transition-all hover:shadow `}>
                                <div className={`flex flex-col items-start justify-start`}>
                                    <p className={`text-lg font-extrabold text-blue-100 mb-1`}>
                                        {career.name}
                                    </p>
                                    <p className="text-base mb-2 break-keep">{career.description}</p>
                                    <div className="flex flex-col md:flex-row md:items-center justify-between w-full">
                                        <div className="flex items-center gap-2">
                                            <span className={`text-sm text-slate-500`}>{career.job}</span>
                                            <span className="text-slate-300">|</span>
                                            <span className={`text-sm text-slate-500`}>{career.position}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className={` text-sm text-slate-500`}>
                                                {career.period}
                                            </span>
                                            <span className="text-slate-300">|</span>
                                            <span className={` text-sm text-slate-500 font-bold`}>
                                                {career.calculation}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <IoColorWand className="absolute top-5 text-xl right-5 text-slate-300" />
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