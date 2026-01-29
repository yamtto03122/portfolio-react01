import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Container, DomHead, Footer, NavBar } from "../components"
import { FaArrowLeft } from 'react-icons/fa'
import { ResponsiveNavbar } from '../components/Navbar'
import { FaStar, FaArrowRight, FaQuoteRight } from "react-icons/fa"
import { AiFillGithub } from "react-icons/ai"

import projects from "../data/projects.json"
import userInfo from "../data/usersInfo.json"
import { IoArrowForwardOutline } from 'react-icons/io5'


function Projects() {
    const [windowWidth, setWindowWidth] = useState(0)

    useEffect(() => {
        setWindowWidth(window.innerWidth)
        window.addEventListener("resize", () => {
            setWindowWidth(window.innerWidth)
        })
    }, [windowWidth])


    return (
        <div>
            <DomHead pageName='Projects' />
            <Container>
                <NavBar />
            </Container>
            <div id="top-head" className=" w-full pt-[70px] px-4 md:px-[10%] h-[25vh] bg-blue-50 p-3 flex flex-col items-start justify-start ">
                <Container className="">
                    <Link href={"/"}>
                        <a><FaArrowLeft className='p-2 md:p-3 text-white text-[30px] md:text-[35px] bg-dark-100 rounded-[4px] cursor-pointer mb-3' /></a>
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-bold mb-3 ">
                        Projects
                    </h1>
                    <p className="text-sm md:text-base text-slate-400 ">
                        Here are my completed projects.
                    </p>
                </Container>
            </div>
            <div className="w-full h-auto px-4 md:px-[10%] py-20">
                <Container>
                    <div className="w-full grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-6">
                        {/* <Categories /> */}
                        <ProjectsCard />
                    </div>
                </Container>
            </div>
            <Footer />
            {windowWidth <= 700 && <ResponsiveNavbar pageName={"projects"} />}
        </div>
    )
}

export default Projects

function ProjectsCard() {

    return (
        <>
            {
                projects.projects.length > 0 ?
                    projects.projects.map((list, i) => {
                        return (
                            <a href={list.project_url} key={i} className={`box w-full h-auto bg-blue-50 rounded-md relative transition-all !opacity-[0.75] hover:!opacity-[1] overflow-hidden hover:shadow-md`}>
                                    <div className="imgCont relative">
                                        <div className="h-1/2 absolute bottom-0 p-3 w-full bg-hero-gradient flex flex-col justify-end">
                                            <p className="text-xs text-white/70 mb-0.5">{list.date}</p>
                                            <p className={`text-base font-semibold text-white`}>{list.title === "" ? "Project Title" : list.title}</p>
                                        </div>
                                    </div>
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
                                    <div className={`w-full h-[calc(100%-190px)] p-3 flex flex-col justify-between gap-4`}>
                                        <div className="w-full">
                                            <div className="flex items-center gap-2.5 text-xs text-slate-500 mb-1">
                                                <p>{list.type}</p> <p className="text-slate-400">|</p> 
                                                <p><span>기여</span> <span>{list.contribution}%</span></p>
                                            </div>
                                            <p className="text-base text-slate-800 break-keep mb-1.5">{list.sub_title === "" ? "some dummy description" : list.sub_title}</p>
                                            <span className="text-sm text-slate-700 break-keep">{list.description === "" ? "some dummy description" : list.description}</span>
                                            
                                        </div>
                                        <div className="flex items-end justify-between gap-3">
                                            <div className={`flex flex-wrap items-start justify-start gap-1`}>
                                                {
                                                    list.tags.length > 0 ?
                                                        list.tags.map((tag, i) => {
                                                            return (
                                                                <span key={i} className={`text-[10px] py-0.5 px-2 bg-white rounded-sm text-slate-700`}>{tag}</span>
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
        </>
    )
}


function GithubRepo() {
    const [repos, setRepo] = useState([])
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
                setError("No github repo found")
                setLoading(false)
            } catch (err) {
                setError(`FAILED FETCHING REPO'S: ${err.message}`)
                setLoading(false)
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
        <>
            {
                loading ? "Loading..." : error !== null ? <p>{error}</p> : repos.length > 0 ?
                    repos.map((rep, i) => {
                        return (
                            <div key={i} className="relative w-full h-[180px] bg-dark-200 flex flex-col items-start justify-start px-4 py-3 mt-2 rounded-md md:w-[300px]">
                                <h2 className="w-full text-[20px] ">{rep.name}</h2>
                                <p className=" w-full text-[15px] text-white-300 ">{rep.description && rep.description.length > 50 ? rep.description.slice(0, 80) + "..." : rep.description}</p>
                                <br />
                                <div className="ratings absolute bottom-4 w-full flex flex-row items-start justify-start">
                                    <span className="mr-2 flex flex-row items-start justify-start">
                                        <StarRatings title="star" count={rep.stargazers_count} />
                                    </span>
                                    <span className="mr-2 flex flex-row items-start justify-start">
                                        <StarRatings title="fork" count={rep.forks} />
                                    </span>
                                </div>

                                <a href={rep.html_url} target={"_blank"} className="absolute right-3 top-2 flex flex-row items-center">
                                    <small className="underline">View</small>
                                    <FaArrowRight className="ml-2 text-[12px] " />
                                </a>
                            </div>
                        )
                    })
                    :
                    "Opps, No Github Repo was found."
            }
        </>
    )
}

function StarRatings({ count = 1, size = 3, title = "star" }) {

    return (
        <>
            {
                Array(1).fill(1).map((i) => {
                    return (
                        <>
                            {title === "star" ?
                                <FaStar key={i * Math.random()} className={`text-green-200 text-[${size}px] `} />
                                :
                                title === "fork" ?
                                    <AiFillGithub key={i * Math.random()} className={`text-green-200 text-[${size}px] `} />
                                    :
                                    ""
                            }
                        </>
                    )
                })

            }
            <small className="ml-2 text-white-200 font-extrabold">{count}</small>
            <small className="ml-2 text-white-200">{title}</small>
        </>
    )
}