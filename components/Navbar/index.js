import React, { useEffect, useState } from "react"

import Link from "next/link"
import { FaGithub, FaTwitter } from "react-icons/fa"
import { FiMail } from "react-icons/fi"
import usersInfo from "../../data/usersInfo.json"
import socials from "../../data/socials.json"
import avatar from "../../public/images/avatar/avatar.png"
import { IoCubeOutline, IoHomeOutline, IoMailOutline, IoPersonOutline } from "react-icons/io5"
import { useRouter } from "next/router"

function NavBar() {

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
                <div className={`left w-auto flex align-start items-start justify-start`}>
                    <p className={`font-extrabold mr-[20px]`}>{usersInfo.github_username.charAt(0).toUpperCase() + usersInfo.github_username.slice(1)}</p>

                    <ul className={`relative ml-[10px] hidden md:flex`}>
                        <li className={`mt-[5px] mr-[10px] mb-[0px] ml-[10px] transition-all hover:text-blue-100 hover:font-extrabold cursor-pointer text-sm`}>
                            <Link href="/"><a>Home</a></Link>
                        </li>
                        <li className={`mt-[5px] mr-[10px] mb-[0px] ml-[10px] transition-all hover:text-blue-100 hover:font-extrabold cursor-pointer text-sm`}>
                            <Link href="/about"><a>About</a></Link>
                        </li>
                        <li className={`mt-[5px] mr-[10px] mb-[0px] ml-[10px] transition-all hover:text-blue-100 hover:font-extrabold cursor-pointer text-sm`}>
                            <Link href="/projects"><a>Projects</a></Link>
                        </li>
                        <li className={`mt-[5px] mb-[0px] ml-[10px] transition-all hover:text-blue-100 hover:font-extrabold cursor-pointer text-sm`}>
                            <Link href="/#contact"><a>Contact</a></Link>
                        </li>
                    </ul>
                </div>
                <div className={`relative right w-[50vmin] hidden md:flex `}>
                    <div className={`flex flex-row align-center justify-end items-center w-full`}>
                            {socials["email"] !== "" &&
                            <a href={`mailto:${socials["email"]}`} className={`w-[100px] text-[17px] flex flex-row align-center justify-end items-center decoration-none  hover:text-white `}>
                                <FiMail className={`mr-[10px] icon mail`} />
                                <small>Email</small>
                            </a>}

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
                        <a><IoHomeOutline className={`icon`} /></a>
                    </Link>
                    <label className={`label`}>Home</label>
                </li>
                <li className={active === "projects" ? `active` : `li`} data-name="projects" onClick={handleActive}>
                    <Link href="/projects">
                        <a><IoCubeOutline className={`icon`} /></a>
                    </Link>
                    <label className={`label`}>
                        Projects
                    </label>
                </li>
                <li className={active === "about" ? `active` : `li`} data-name="about" onClick={handleActive}>
                    <Link href="/about">
                        <a><IoPersonOutline className={`icon`} /></a>
                    </Link>
                    <label className={`label`}>About</label>
                </li>
                <li className={active === "contact" ? `active` : `li`} data-name="contact" onClick={handleActive}>
                    <Link href={pageName === "" ? "#contact" : "/#contact"}>
                        <a><IoMailOutline className={`icon`} /></a>
                    </Link>
                    <label className={`label`}>Contact</label>
                </li>
            </div>
        </div>
    )
}