import "../styles/global.css"
import "aos/dist/aos.css";
import { Poppins } from "next/font/google";
import localFont from "next/font/local";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100","200","300","400","500","600","700","800","900"],
  display: "swap",
});

const pretendard = localFont({
  src: "../public/fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  display: "swap",
});

export default function App({ Component, pageProps }) {
    
    return (
         <main className={`${poppins.className} ${pretendard.variable}`}>
            <Component {...pageProps} />
         </main>
        
    )
}

