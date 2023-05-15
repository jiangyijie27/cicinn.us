import { useState, useRef, useEffect } from "react"
import JSConfetti from "js-confetti"
import lottie from "lottie-web"
import { useSpring, animated, to } from "@react-spring/web"
import { useDrag } from "@use-gesture/react"
// import rainbow from "./assets/rainbow.json"
// import rocket from "./assets/rocket.json"
// import sun from "./assets/sun.json"

const colors = ["red", "blue", "green", "black", "white", "purple"]
const footerColors = ["red", "blue", "yellow", "black", "white", "purple"]
const carouselImages = [
  "https://wxa.wxs.qq.com/wxad-design/cpy/ccns.png",
  "https://wxa.wxs.qq.com/wxad-design/cpy/pic-0.jpg",
  "https://wxa.wxs.qq.com/wxad-design/cpy/pic-1.jpg",
  "https://wxa.wxs.qq.com/wxad-design/cpy/pic-2.jpg",
  "https://wxa.wxs.qq.com/wxad-design/cpy/pic-3.jpg",
  "https://wxa.wxs.qq.com/wxad-design/cpy/pic-4.jpg",
]

function App() {
  const intervalRef = useRef(0)
  const intervalIndex = useRef(0)
  const lottie1Mounted = useRef(false)
  const lottie2Mounted = useRef(false)
  const confetting = useRef(false)
  const carouselIndex = useRef(0)
  const [{ x: textX }] = useSpring(
    () => ({
      from: { x: 0 },
      to: { x: 50 },
      config: {
        duration: 8000,
      },
      loop: true,
    }),
    []
  )

  const [{ carouselX }, api] = useSpring(() => ({
    carouselX: 0,
    // config: {
    //   tension: 280,
    //   friction: 60,
    //   precision: 0.001,
    //   mass: 1,
    //   velocity: 0,
    // },
  }))

  const bindDrag = useDrag(
    ({ movement: [mx], active, event, swipe: [swipeX] }) => {
      event.preventDefault()

      if (swipeX !== 0) {
        if (swipeX === 1 && carouselIndex.current === 0) {
          api.start({
            carouselX: 0,
          })
        } else if (
          swipeX === -1 &&
          carouselIndex.current === carouselImages.length - 1
        ) {
          api.start({
            carouselX: carouselIndex.current * -280,
          })
        } else {
          carouselIndex.current -= swipeX
          api.start({
            carouselX: carouselIndex.current * -280,
          })
        }
      } else {
        if (active) {
          api.start({
            carouselX:
              -carouselIndex.current * 280 +
              mx *
                ((carouselIndex.current < 1 && mx > 0) ||
                (carouselIndex.current > carouselImages.length - 2 && mx < 0)
                  ? 0.4
                  : 1),
            immediate: true,
          })
        } else {
          if (mx > 0) {
            if (carouselIndex.current > 0) {
              carouselIndex.current -= 1
              api.start({
                carouselX: carouselIndex.current * -280,
              })
            } else {
              api.start({
                carouselX: 0,
              })
            }
          } else {
            if (carouselIndex.current < carouselImages.length - 1) {
              carouselIndex.current += 1
              api.start({
                carouselX: carouselIndex.current * -280,
              })
            } else {
              api.start({
                carouselX: carouselIndex.current * -280,
              })
            }
          }
        }
      }
    },
    {
      axis: "x",
      pointer: { touch: true },
      eventOptions: { passive: false },
    }
  )

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 2 &&
      !confetting.current
    ) {
      confetting.current = true
      const jsConfetti = new JSConfetti()
      jsConfetti.addConfetti({
        emojis: ["🌈", "⚡️", "💥", "✨", "💫", "🌸"],
        confettiNumber: 40,
      })

      setTimeout(() => {
        confetting.current = false
      }, 1000)
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)

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
          path: "https://cicinn.us/assets/rainbow.json",
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
          path: "https://cicinn.us/assets/rocket.json",
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
        <animated.div
          className="lines-inner"
          style={{
            transform: to([textX], (x) => `translate3d(-${x}%, 0, 0)`),
          }}
        >
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
        </animated.div>
      </div>
      <div className="lines line-2">
        <animated.div
          className="lines-inner"
          style={{
            transform: to([textX], (x) => `translate3d(-${50 - x}%, 0, 0)`),
          }}
        >
          {Array.from(new Array(2), (_, i) => i).map((o) => {
            return (
              <div key={o}>
                <div>HAVE A</div>
                <div className="lotties lottie-2" />
                <div>JOYFUL DAY</div>
                <section />
              </div>
            )
          })}
        </animated.div>
      </div>
      <div className="lines line-3">
        <animated.div
          className="lines-inner"
          style={{
            transform: to([textX], (x) => `translate3d(-${x}%, 0, 0)`),
          }}
        >
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
        </animated.div>
      </div>
      <div className="carousel">
        <div className="carousel-bg">
          <div>
            <span className="carousel-letter">c</span>
            <span className="carousel-letter">i</span>
            <span className="carousel-letter">c</span>
            <span className="carousel-letter">i</span>
            <span className="carousel-letter">n</span>
            <span className="carousel-letter">n</span>
            <span className="carousel-letter">u</span>
            <span className="carousel-letter">s</span>
          </div>

          <div>
            <span className="carousel-text">c</span>
            <span className="carousel-text">i</span>
            <span className="carousel-text">c</span>
            <span className="carousel-text">i</span>
            <span className="carousel-text">n</span>
            <span className="carousel-text">n</span>
            <span className="carousel-text">u</span>
            <span className="carousel-text">s</span>
          </div>
        </div>
        <div className="carousel-inner-wrapper" {...bindDrag()}>
          <animated.div
            className="carousel-inner"
            style={{
              transform: to([carouselX], (x) => `translate3d(${x}px, 0, 0)`),
            }}
          >
            {carouselImages.map((o, i) => (
              <animated.div
                key={o}
                className={`carousel-item carousel-item-${i + 1}`}
                style={{
                  transformOrigin: to(
                    [carouselX],
                    (x) => `${(-(x + 280 * (i - 1)) / 280) * 50}% 100%`
                  ),
                  transform: to(
                    [carouselX],
                    (x) =>
                      `translate3d(${
                        8 + ((x + 280 * (i - 1)) / 280) * 8
                      }%, 0, 0) rotate(${((x + 280 * i - 1) / 280) * 10}deg)`
                  ),
                }}
              >
                <img src={o} />
              </animated.div>
            ))}
          </animated.div>
        </div>
        {/* <div className="carousel-arrow carousel-arrow-left" /> */}
        {/* <div className="carousel-arrow carousel-arrow-right" /> */}
      </div>
      <div className="footer">
        <div>
          <span className="footer-link">cicinn.us</span> is a tiny page made for
          celebrating the birthday of <span className="footer-aragakey">Cicinnus Cheng</span> who's an individual
          possesses both inner and outer beauty, and most importantly a
          supportive teammate and friend of mine.
        </div>
        <div>
          <span className="footer-link">cicinn.us</span> is designed &
          handcrafted by <span className="footer-aragakey">Aragakey</span> who
          paid ¥53.95 for this domain name. It'll expire on January 31, 2024. If
          you need to renew it, you can contact me then.
        </div>
        <div>
          <span className="footer-link">cicinn.us</span> may load relatively
          slowly, cuz it's hosted on github which is free. If you want it to be
          faster, you'll have to figure it out yourself (or pay me).
        </div>
        <div>
          Or one day you want to turn it into your own personal site, you can
          pay me as well.
        </div>
        <div>Anyway, happy birthday to you <span className="footer-aragakey">Cicinnus</span>. Hope you like it (if you don't, I'll never talk to you for the rest of my life).</div>

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
