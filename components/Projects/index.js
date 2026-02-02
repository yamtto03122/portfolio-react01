
import { useEffect, useState } from "react"
import Link from "next/link"
import { FaStar, FaArrowRight, FaQuoteRight } from "react-icons/fa"
import { AiFillGithub } from "react-icons/ai"
import { GoDotFill } from "react-icons/go";
import projects from "../../data/projects.json"
import userInfo from "../../data/usersInfo.json"
import { IoArrowForwardOutline } from "react-icons/io5"

function Projects() {

    const [repo, setRepo] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    console.log(projects.projects)

    async function fetchRepos() {
        let res;
        let url = `https://api.github.com/users/${userInfo.github_username}/repos`
        if (localStorage.getItem("user_repos") === null) {
            try {
                setLoading(true)
                res = await fetch(url)
                let data = await res.json()
                setLoading(false)
                if (data && data.length > 0) {
                    localStorage.setItem("user_repo", JSON.stringify(data))
                    setRepo(data)
                    return
                }
                setLoading(false)
                setError(`No github repos found.`)
            }
            catch (err) {
                console.error(`FAILED: ${err.message}`)
                setLoading(false)
                setError(`Failed fetching repo: ${err.message}`)
            }
        }

        let userReopos = JSON.parse(localStorage.getItem("user_repos"))

        setRepo(userReopos)
    }

    useEffect(() => {

        (async () => {
            await fetchRepos()
        })()

    }, [])

    return (
        <div className={`projectCont w-full px-4 md:px-[10%] py-20 relative flex flex-col items-center justify-center bg-blue-50`}>

                
            <div className={`w-full flex flex-row items-center justify-center gap-5 mb-10`}>
                <span data-aos="zoom-in" className={`flex-1 h-[2px] rounded-[30px] bg-blue-100 max-w-[80px] md:max-w-[120px]`}></span>
                <p data-aos="fade-up" className={`text-3xl md:text-4xl font-bold`}>Projects</p>
                <span data-aos="zoom-in" className={`flex-1 h-[2px] rounded-[30px] bg-blue-100 max-w-[80px] md:max-w-[120px]`}></span>
            </div>
            

            <div className={`projects w-full grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6 mb-10`}>
                {
                    projects.projects.length > 0 ?
                        projects.projects.slice(0, 9).map((list, i) => {
                            const isMobilePeek = i === 6;
                            const hideOnMobile = i >= 7;
                            const isDesktopPeek = i >= 6;

                            return (
                                <a href={list.project_url} target="_blank" data-aos="zoom-in" key={i} className={`box w-full h-auto bg-white rounded-md relative transition-all md:!opacity-[0.75] md:hover:!opacity-[1] overflow-hidden md:shadow-none md:hover:shadow-md ${hideOnMobile ? "hidden md:block" : ""} ${isMobilePeek ? "h-[70px] md:h-auto pointer-events-none" : "shadow-md"} ${isDesktopPeek ? "md:h-[70px] pointer-events-none" : "h-auto"}`}>
                                    <div className={`imgCont relative w-full h-[190px] ${isMobilePeek ? "md:blur-0 blur-sm" : ""} ${isDesktopPeek ? "md:blur-sm" : ""}`}>
                                        <div className="h-1/2 absolute bottom-0 p-3 w-full bg-hero-gradient flex flex-col justify-end">
                                            <p className="text-xs text-white/70 mb-0.5">{list.date}</p>
                                            <p className={`text-base font-semibold text-white`}>{list.title === "" ? "Project Title" : list.title}</p>
                                        </div>
                                    </div>
                                    <style jsx>{`
                                        .imgCont{
                                            background-image: url(${list.imageUrl === "" || list.imageUrl === null ? "https://www.wallpapertip.com/wmimgs/136-1369543_laptop-coding.jpg" : list.imageUrl});
                                            background-size: cover;
                                            background-repeat: no-repeat;
                                            background-position: center;
                                        }
                                    `}</style>

                                    <div className={`pointer-events-none absolute inset-0 bg-blue-50-gradient ${isDesktopPeek && isDesktopPeek ? "block" : isMobilePeek ? "block md:hidden" : isDesktopPeek ? "hidden md:block" : "hidden"}`}></div>
                                    <div className={`w-full h-[calc(100%-190px)] p-3 flex flex-col justify-between gap-4`}>
                                        <div className="w-full leading-tight">
                                            <div className="flex items-center gap-2.5 text-xs text-slate-500 mb-1">
                                                <p>{list.type}</p> <p className="text-slate-400">|</p> 
                                                <p><span>기여</span> <span>{list.contribution}%</span></p>
                                            </div>
                                            <p className="text-base font-medium text-slate-800 break-keep mb-1.5">{list.sub_title === "" ? "some dummy description" : list.sub_title}</p>
                                            <span className="text-sm text-slate-700 break-keep">{list.description === "" ? "some dummy description" : list.description}</span>
                                            
                                        </div>

                                        <div className="flex items-end justify-between gap-3">
                                            <div className={`flex flex-wrap items-start justify-start gap-1`}>
                                                {
                                                    list.tags.length > 0 ?
                                                        list.tags.map((tag, i) => {
                                                            return (
                                                                <span key={i} className={`text-[10px] py-0.5 px-2 bg-blue-50 rounded-sm text-slate-700`}>{tag}</span>
                                                            )
                                                        })
                                                        :
                                                        ""
                                                }
                                            </div>
                                            <div className={`text-xs flex items-center gap-2`}>
                                                {
                                                    list.project_url !== "" ?
                                                        <>
                                                            <p className={`text-slate-600 hover:underline hover:text-slate-800`}>
                                                                View
                                                            </p>
                                                            <IoArrowForwardOutline className={``} />
                                                        </>
                                                        :
                                                        ""
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            )
                        })
                        :
                        ""
                }
            </div>

            <Link href="/projects" data-aos="zoom-in-up" className={`text-lg flex items-center gap-2 w-fit border-[2px] border-solid border-blue-100 px-5 py-3 bg-dark-100 text-blue-50 rounded-full scale-[.90] hover:scale-[.95] transition-all`}>
                All Projects +{projects.projects.length}
            </Link>
        </div>
    )
}

export default Projects
