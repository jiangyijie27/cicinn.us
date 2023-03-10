import { useState, useRef, useEffect } from "react"
import lottie from "lottie-web"
// import rainbow from "./assets/rainbow.json"
// import rocket from "./assets/rocket.json"
// import sun from "./assets/sun.json"

const colors = ["red", "blue", "green", "black", "white", "purple"]
const footerColors = ["red", "blue", "yellow", "black", "white", "purple"]

function App() {
  const [count, setCount] = useState(0)
  const intervalRef = useRef(0)
  const intervalIndex = useRef(0)
  const lottie1Mounted = useRef(false)
  const lottie2Mounted = useRef(false)

  useEffect(() => {
    const letters = [
      ...document.querySelectorAll("[data-role='header-letters']"),
    ].reverse()

    const footerLetters = [
      ...document.querySelectorAll("[data-role='footer-letters']"),
    ].reverse()

    intervalRef.current = setInterval(() => {
      intervalIndex.current = (intervalIndex.current + 1) % colors.length

      letters.forEach((letter, index) => {
        letter.style.color = `var(--${
          colors[(intervalIndex.current + index) % colors.length]
        })`
      })

      footerLetters.forEach((letter, index) => {
        letter.style.color = `var(--${
          footerColors[(intervalIndex.current + index) % footerColors.length]
        })`
      })
    }, 500)

    if (!lottie1Mounted.current) {
      lottie1Mounted.current = true
      ;[...document.querySelectorAll(".lottie-1")].forEach((el) => {
        lottie.loadAnimation({
          container: el,
          renderer: "svg",
          loop: true,
          autoplay: true,
          path: 'https://raw.githubusercontent.com/jiangyijie27/cicinn.us/master/src/assets/rainbow.json',
        })
      })
    }

    if (!lottie2Mounted.current) {
      lottie2Mounted.current = true
      ;[...document.querySelectorAll(".lottie-2")].forEach((el) => {
        lottie.loadAnimation({
          container: el,
          renderer: "svg",
          loop: true,
          autoplay: true,
          path: 'https://raw.githubusercontent.com/jiangyijie27/cicinn.us/master/src/assets/sun.json',
        })
      })
    }

    return () => {
      clearInterval(intervalRef.current)
    }
  }, [])

  return (
    <div className="App">
      <header>
        <span data-role="header-letters">c</span>
        <span data-role="header-letters">i</span>
        <span data-role="header-letters">c</span>
        <span data-role="header-letters">i</span>
        <span data-role="header-letters">n</span>
        <span data-role="header-letters">n</span>
        <span data-role="header-letters">.</span>
        <span data-role="header-letters">u</span>
        <span data-role="header-letters">s</span>
      </header>
      {/* <div className="block-g">
        <div>to</div>
        <div>peiyao</div>
      </div>
      <div className="block-y">
        HAPPY
      </div> */}
      <div className="lines line-1">
        <div className="lines-inner">
          {Array.from(new Array(2), (_, i) => i).map((o) => {
            return (
              <div key={o}>
                <div>MANY HAPPY</div>
                <div className="lotties lottie-1" />
                <div>RETURNS</div>
                <section />
              </div>
            )
          })}
        </div>
      </div>
      <div className="lines line-2">
        <div className="lines-inner">
          {Array.from(new Array(2), (_, i) => i).map((o) => {
            return (
              <div key={o}>
                <div>HAVE A</div>
                <div className="lotties lottie-2" />
                <div>SPECIAL DAY</div>
                <section />
              </div>
            )
          })}
        </div>
      </div>
      <div className="lines line-3">
        <div className="lines-inner">
          {Array.from(new Array(2), (_, i) => i).map((o) => {
            return (
              <div key={o}>
                <div>MY FRIEND</div>
                <img src="https://wxa.wxs.qq.com/wxad-design/cpy/heart.svg" />
                <div>CPY</div>
                <section />
              </div>
            )
          })}
        </div>
      </div>
      <div className="carousel">
        <div className="carousel-bg" />
      </div>
      <div className="footer">
        <div>
          <span className="footer-link">cicinn.us</span> is a diminutive site
          made for celebrating the birthday of Cicinnus Cheng who's a friend of
          mine.
        </div>
        <div>
          <span className="footer-link">cicinn.us</span> is designed &
          handcrafted by <span className="footer-aragakey">Aragakey</span> who
          paid ¥53.95 for this domain name. And it will expire on January 31,
          2024. If you need to renew it, you can contact me then.
        </div>
        <div>
          <span className="footer-link">cicinn.us</span> is hosted on github. It
          loads relatively slow, cuz it's free. If you want it to be faster,
          you'll have to figure it out yourself (or pay me).
        </div>
        <div>
          Or one day you want to turn it into your own personal site, you can
          pay me as well.
        </div>
        <div>Anyway, happy birthday to you Cicinnus. Hope you like it. 🫰🏻</div>

        <section className="cake">
          <div className="velas">
            <div className="fuego"></div>
            <div className="fuego"></div>
            <div className="fuego"></div>
            <div className="fuego"></div>
            <div className="fuego"></div>
          </div>
          <div className="cobertura"></div>
          <div className="bizcocho"></div>
        </section>

        <footer>
          <span data-role="footer-letters">c</span>
          <span data-role="footer-letters">i</span>
          <span data-role="footer-letters">c</span>
          <span data-role="footer-letters">i</span>
          <span data-role="footer-letters">n</span>
          <span data-role="footer-letters">n</span>
          <span data-role="footer-letters">.</span>
          <span data-role="footer-letters">u</span>
          <span data-role="footer-letters">s</span>
        </footer>
      </div>
    </div>
  )
}

export default App
