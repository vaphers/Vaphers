import React from "react"
import CountUp from "react-countup"
import { useInView } from "react-intersection-observer"

const Stats = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.4, 
  })

  return (
    <div className="flex items-center justify-center" ref={ref}>
      <div className="max-w-(--breakpoint-xl) mx-auto w-full pb-12 px-6 xl:px-0">
        <div className="mt-16 sm:mt-18 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-10 gap-y-16 justify-center">
          <div>
            <span className="text-5xl md:text-6xl tracking-tight text-blue-700 font-semibold">
              {inView ? <CountUp end={900} duration={3} separator="," /> : 0}+
            </span>
            <p className="mt-6 font-medium text-xl">Global styles + variables</p>
            <p className="mt-2 text-muted-foreground">
              Super smart global color, typography and effects styles + variables!
            </p>
          </div>
          <div>
            <span className="text-5xl md:text-6xl tracking-tight font-semibold text-muted-foreground">
              {inView ? <CountUp end={10000} duration={3.5} separator="," /> : 0}+
            </span>
            <p className="mt-6 font-medium text-xl">Components and variants</p>
            <p className="mt-2 text-muted-foreground">
              We&apos;ve thought of everything you need so you don&apos;t have to.
            </p>
          </div>
          <div>
            <span className="text-5xl md:text-6xl tracking-tight text-blue-700 font-semibold">
              {inView ? <CountUp end={420} duration={2.8} separator="," /> : 0}+
            </span>
            <p className="mt-6 font-medium text-xl">Page design examples</p>
            <p className="mt-2 text-muted-foreground">
              A whopping 420+ ready-to-go desktop and mobile page examples.
            </p>
          </div>
          <div>
            <span className="text-5xl md:text-6xl tracking-tight font-semibold text-muted-foreground">
              {inView ? <CountUp end={2000} duration={3.2} separator="," /> : 0}+
            </span>
            <p className="mt-6 font-medium text-xl">Icons and logos</p>
            <p className="mt-2 text-muted-foreground">
              All the icons you&apos;ll need, including country flags and payments.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Stats
