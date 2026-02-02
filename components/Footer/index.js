import { Container } from ".."
import { FaTwitter, FaGithub, FaFacebook, FaVoicemail } from 'react-icons/fa'
import { AiFillMail } from "react-icons/ai"

import socials from "../../data/socials.json"
import usersInfo from "../../data/usersInfo.json"

function Footer() {

  return (
    <div id="footer" className="relative w-full h-[25vh] py-5 px-4 md:px-[10%] bg-blue-100 ">
      <Container>
        <div className="relative flex flex-row items-center justify-between">
          <div className="left flex flex-row items-center">
            <h1 className=" text-base text-white ">
              <span className="font-extrabold">{usersInfo.github_username}</span>
            </h1>
            <small className="ml-10 text-white/70 ">
              &copy; {new Date().getFullYear()} All Right Reserved.
            </small>
          </div>

        </div>
      </Container>
    </div>
  )
}

export default Footer

function SocialLink({ url, children }) {

  return (
    <a href={url} target="_blank" className=" no-underline text-white decoration-none hover:text-green-200 mr-4 ">
      {children}
    </a>
  )
}