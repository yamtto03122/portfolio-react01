import React, { useEffect, useState } from "react"

import Link from "next/link"
import { FaGithub, FaTwitter } from "react-icons/fa"
import { FiInstagram, FiMail } from "react-icons/fi"
import usersInfo from "../../data/usersInfo.json"
import socials from "../../data/socials.json"
import avatar from "../../public/images/avatar/avatar.png"
import { IoCubeOutline, IoHomeOutline, IoMailOutline, IoPersonOutline } from "react-icons/io5"
import { useRouter } from "next/router"

function NavBar() {
    const router = useRouter();
    const [active, setActive] = useState("home")

    useEffect(() => {
        if (router.pathname === "/") setActive("home");
        else if (router.pathname === "/projects") setActive("projects");
        else if (router.pathname === "/about") setActive("about");
        else if (router.pathname === "/#contact") setActive("contact");
    }, [router.pathname]);

    const [scrolled, setScrolled] = useState(false)
    useEffect(() => {
        const handleScroll = () => {
        setScrolled(window.scrollY > 0)
        }

        window.addEventListener("scroll", handleScroll)
        handleScroll() // 초기 체크

        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <React.Fragment>
            <div className={`navbar fixed top-0 h-auto w-screen left-0 px-4 md:px-[10%] flex align-center justify-between py-[20px] transition-all duration-300 ${scrolled ? "bg-white/60 shadow-sm backdrop-blur-md z-10" : ""}`}>
                <div className={`left w-auto flex items-center justify-start gap-12`}>
                    <p className={`font-extrabold text-xl md:text-2xl pl-[7px]`}><span className="text-white relative before:w-7 before:h-7 md:before:w-8 md:before:h-8 before:bg-blue-100 before:rounded-full before:absolute before:-z-10 before:left-[45%] before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2">D</span>oYoung</p>

                    <ul className={`relative hidden md:flex gap-9`}>
                        <li className={`transition-all hover:text-blue-100 hover:font-extrabold cursor-pointer text-base ${active === "home" ? `text-blue-100 font-extrabold` : ``}`}>
                            <Link href="/">Home</Link>
                        </li>
                        <li className={`transition-all hover:text-blue-100 hover:font-extrabold cursor-pointer text-base ${active === "about" ? `text-blue-100 font-extrabold` : ``}`}>
                            <Link href="/about">About</Link>
                        </li>
                        <li className={`transition-all hover:text-blue-100 hover:font-extrabold cursor-pointer text-base ${active === "projects" ? `text-blue-100 font-extrabold` : ``}`}>
                            <Link href="/projects">Projects</Link>
                        </li>
                        <li className={`transition-all hover:text-blue-100 hover:font-extrabold cursor-pointer text-base ${active === "contact" ? `text-blue-100 font-extrabold` : ``}`}>
                            <Link href="/#contact">Contact</Link>
                        </li>
                    </ul>
                </div>
                <div className={`relative right w-[50vmin] hidden md:flex `}>
                    <div className={`flex flex-row align-center justify-end items-center w-full gap-6`}>
                        <a href={`mailto:${socials.socials["email"]}`} className={`text-sm flex gap-2 align-center justify-end items-center decoration-none  hover:text-blue-100 `}>
                            <FiMail className={`icon mail`} />
                            Email
                        </a>
                        <a href={`https://www.instagram.com/celsius_o/`} className={`text-sm flex gap-2 align-center justify-end items-center decoration-none  hover:text-blue-100 `}>
                            <FiInstagram className={`icon`} />
                            Instagram
                        </a>

                    </div>
                </div>
                <div className={`absolute top-[15px] right-[12px] md:hidden `}>
                    <img src={'/images/me.png'} className={` w-[40px] h-[40px] rounded-[50%] border-[2px] border-solid border-blue-100 object-cover `} />
                </div>
            </div>
        </React.Fragment>
    )
}

export default NavBar

export function ResponsiveNavbar({ activePage, pageName = "" }) {
    const router = useRouter();
    const [active, setActive] = useState(activePage || "home")

    useEffect(() => {
        if (router.pathname === "/") setActive("home");
        else if (router.pathname === "/projects") setActive("projects");
        else if (router.pathname === "/about") setActive("about");
        else if (router.pathname === "/#contact") setActive("contact");
    }, [router.pathname]);

    function handleActive(e) {
        setActive(e.currentTarget.dataset.name);
    }

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
        <div className={`mobileNav ${scrolled ? "active" : ""}`}>
            <div className={`main`}>
                <li className={active === "home" ? `active` : `li`} data-name="home" onClick={handleActive}>
                    <Link href="/">
                        <IoHomeOutline className={`icon`} />
                    </Link>
                    <label className={`label`}>Home</label>
                </li>
                <li className={active === "projects" ? `active` : `li`} data-name="projects" onClick={handleActive}>
                    <Link href="/projects">
                        <IoCubeOutline className={`icon`} />
                    </Link>
                    <label className={`label`}>
                        Projects
                    </label>
                </li>
                <li className={active === "about" ? `active` : `li`} data-name="about" onClick={handleActive}>
                    <Link href="/about">
                        <IoPersonOutline className={`icon`} />
                    </Link>
                    <label className={`label`}>About</label>
                </li>
                <li className={active === "contact" ? `active` : `li`} data-name="contact" onClick={handleActive}>
                    <Link href={pageName === "" ? "#contact" : "/#contact"}>
                        <IoMailOutline className={`icon`} />
                    </Link>
                    <label className={`label`}>Contact</label>
                </li>
            </div>
        </div>
    )
}