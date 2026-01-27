import Head from 'next/head'
import userInfo from "../../data/usersInfo.json"

export default function DomHead({ pageName = "Home Page" }) {

    return (
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>{userInfo.github_username} Portfolio - {pageName} </title>
            {/* meta tags begins */}
            {/* Primary Meta Tags */}
            <meta name="title" content="Doyoung Portfolio" />
            <meta name="description" content="김도영 포트폴리오 입니다🐹" />
            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://www.doyoung.me.kr/" />
            <meta property="og:title" content="Doyoung Portfolio" />
            <meta property="og:description" content="김도영 포트폴리오 입니다🐹" />
            <meta property="og:image" content="https://github.com/Benrobo/baaymax-assets/blob/main/app.png?raw=true" />
        </Head>
    )
}

