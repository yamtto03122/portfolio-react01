
import { useEffect, useState } from "react"
import Link from "next/link"
import { FaStar, FaArrowRight, FaQuoteRight } from "react-icons/fa"
import { AiFillGithub } from "react-icons/ai"

import projects from "../../data/projects.json"
import userInfo from "../../data/usersInfo.json"
import { IoArrowForwardOutline } from "react-icons/io5"

function Projects() {

    const [repo, setRepo] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

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
        <div className={`projectCont w-full mx-auto md:w-[80%] py-20 relative flex flex-col items-center justify-center`}>

            <div className="flex flex-col justify-end items-center mb-10">
                <Link href="/projects">
                <a data-aos="zoom-in-up" className={`text-center text-blue-100 underline text-[14px]`}>All Projects</a>
                </Link>
                <div className={`w-full flex flex-row items-center justify-center`}>
                    <span data-aos="zoom-in" className={`w-[100px] h-[2px] rounded-[30px] m-[20px] bg-blue-100 md:w-[120px]`}></span>
                    <p data-aos="fade-up" className={`text-slate-600 text-lg font-extrabold`}>Projects</p>
                    <span data-aos="zoom-in" className={`w-[100px] h-[2px] rounded-[30px] m-[20px] bg-blue-100 md:w-[120px]`}></span>
                </div>
            </div>
            

            <div className={`projects w-full grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-6`}>
                {
                    projects.length > 0 ?
                        projects.slice(0, 6).map((list, i) => {
                            return (
                                <a href={list.project_url} data-aos="zoom-in" key={i} className={`box w-full h-auto bg-blue-50 rounded-md relative transition-all !opacity-[0.7] hover:!opacity-[1] overflow-hidden hover:shadow-md`}>
                                    <div className="imgCont"></div>
                                    <style jsx>{`
                                        .imgCont{
                                            width: 100%;
                                            height: 190px;
                                            background-image: url(${list.imageUrl === "" || list.imageUrl === null ? "https://www.wallpapertip.com/wmimgs/136-1369543_laptop-coding.jpg" : list.imageUrl});
                                            background-size: cover;
                                            background-repeat: no-repeat;
                                            background-position: center;
                                        }
                                    `}</style>
                                    <div className={`w-full h-[calc(100%-190px)] p-[10px] flex flex-col justify-between gap-5`}>
                                        <div className="w-full h-auto">
                                            <p className={`text-lg text-slate-600 mb-2`}>{list.title === "" ? "Project Title" : list.title}</p>
                                            <span className="text-sm">{list.description === "" ? "some dummy description" : list.description}</span>
                                        </div>
                                        <div className="flex items-end justify-between gap-4">
                                            <div className={`flex flex-wrap items-start justify-start gap-1`}>
                                                {
                                                    list.tags.length > 0 ?
                                                        list.tags.slice(0, 3).map((tag, i) => {
                                                            return (
                                                                <span key={i} className={`text-[10px] py-[3px] px-[9px] bg-white rounded-[2px] text-slate-800`}>{tag}</span>
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
                                                            <IoArrowForwardOutline className={`p-[10px]`} />
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
        </div>
    )
}

export default Projects


function StarRatings({ count = 1, size = 3, title = "star" }) {

    return (
        <>
            {
                title === "star" ?

                    Array(1).fill(1).map((i) => {
                        return (
                            <FaStar key={i * Math.floor(Math.random() * 1000)} className={`text-blue-100 text-[${size}px] `} />
                        )
                    })
                    :
                    <AiFillGithub className={`text-blue-100 text-[${size}px] `} />
            }
            <small className="ml-2 text-slate-600 font-extrabold">{count}</small>
            <small className="ml-2 text-slate-600">{title}</small>
        </>
    )
}
