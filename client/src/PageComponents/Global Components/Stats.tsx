'use client'

import React from "react"
import CountUp from "react-countup"
import { useInView } from "react-intersection-observer"

const Stats = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.4, 
  })

  return (
    <div className="flex items-center justify-center py-8" ref={ref}>
      <div className="max-w-(--breakpoint-xl) mx-auto w-full px-6 xl:px-0">
        <div className="mt-16 sm:mt-18 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-10 gap-y-16 justify-center">
          
          {/* Stat 1: Clients */}
          <div>
            <span className="text-5xl md:text-6xl tracking-tight text-blue-700 font-semibold">
              {inView ? <CountUp end={150} duration={3} /> : 0}+
            </span>
            <p className="mt-6 font-medium text-xl">Happy Clients</p>
            <p className="mt-2 text-muted-foreground">
              Partnering with innovative brands globally to drive digital success.
            </p>
          </div>

          {/* Stat 2: Campaigns */}
          <div>
            <span className="text-5xl md:text-6xl tracking-tight font-semibold text-muted-foreground">
              {inView ? <CountUp end={1200} duration={3.5} separator="," /> : 0}+
            </span>
            <p className="mt-6 font-medium text-xl">Campaigns Launched</p>
            <p className="mt-2 text-muted-foreground">
              Delivering targeted, data-driven marketing campaigns that convert.
            </p>
          </div>

          {/* Stat 3: ROI */}
          <div>
            <span className="text-5xl md:text-6xl tracking-tight text-blue-700 font-semibold">
              {inView ? <CountUp end={350} duration={2.8} /> : 0}%
            </span>
            <p className="mt-6 font-medium text-xl">Average Client ROI</p>
            <p className="mt-2 text-muted-foreground">
              Maximizing returns on ad spend through optimized strategic scaling.
            </p>
          </div>

          {/* Stat 4: Revenue */}
          <div>
            <span className="text-5xl md:text-6xl tracking-tight font-semibold text-muted-foreground">
              ${inView ? <CountUp end={50} duration={3.2} /> : 0}M+
            </span>
            <p className="mt-6 font-medium text-xl">Revenue Generated</p>
            <p className="mt-2 text-muted-foreground">
              Driving real, measurable financial growth and leads for our partners.
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Stats