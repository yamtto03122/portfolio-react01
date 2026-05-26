import Head from 'next/head'
import userInfo from "../../data/usersInfo.json"

export default function DomHead({ pageName = "Home Page" }) {

    return (
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            {/* [수정 로그] github_username → display_name 으로 변경 (타이틀에 API용 계정명 노출 방지) */}
            <title>{userInfo.display_name} Portfolio - {pageName} </title>

            {/* favicon */}
            <link rel="icon" href="/favicon/favicon.ico" />
            <link
                rel="icon"
                type="image/png"
                sizes="32x32"
                href="/favicon/favicon-32x32.png"
            />
            <link
                rel="icon"
                type="image/png"
                sizes="16x16"
                href="/favicon/favicon-16x16.png"
            />
            
            {/* meta tags begins */}
            {/* Primary Meta Tags */}
            <meta name="title" content="Doyoung Portfolio" />
            <meta name="description" content="김도영 포트폴리오 입니다 🐹" />
            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://www.doyoung.me.kr/" />
            <meta property="og:title" content="Doyoung Portfolio" />
            <meta property="og:description" content="김도영 포트폴리오 입니다 🐹" />
            <meta property="og:image" content="https://www.doyoung.me.kr/og/og-image.png" />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
        </Head>
    )
}

