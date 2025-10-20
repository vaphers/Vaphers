'use client'

import React, { CSSProperties } from "react"
import Image from "next/image"
import { motion, Variants } from "framer-motion"

// Use public folder image path
const SpiralUp = '/agancy-girl.png'

// Animation variants for infinite horizontal scroll
const marqueeVariants: Variants = {
  animateLeft: {
    x: ["0%", "-50%"],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: "loop" as const,
        duration: 30,
        ease: "linear"
      }
    }
  },
  animateRight: {
    x: ["-50%", "0%"],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: "loop" as const,
        duration: 30,
        ease: "linear"
      }
    }
  }
}

const containerStyle: CSSProperties = {
  position: "relative",
  width: "100%",
  height: "70vh",
  minHeight: "400px",
  overflow: "hidden",
  background: "linear-gradient(180deg, #b7e3f7, #82bad5)"
}

const marqueeContainerStyle: CSSProperties = {
  position: 'absolute',
  left: 0,
  width: '200%',
  overflow: 'hidden',
  pointerEvents: 'none',
  whiteSpace: 'nowrap',
}

const topMarqueeStyle: CSSProperties = {
  ...marqueeContainerStyle,
  top: '12%',
  zIndex: 0,
}

const bottomMarqueeStyle: CSSProperties = {
  ...marqueeContainerStyle,
  bottom: '22%',
  zIndex: 2,
}

const textStyleTop: CSSProperties = {
  fontSize: "8vw",
  fontWeight: 800,
  color: "#fff",
  letterSpacing: 1,
  paddingRight: '50%',
  display: 'inline-block'
}

const textStyleBottom: CSSProperties = {
  fontSize: "8vw",
  fontWeight: 900,
  color: "#fff",
  opacity: 0.98,
  letterSpacing: 2,
  paddingRight: '50%',
  display: 'inline-block'
}

const imageContainerStyle: CSSProperties = {
  position: "absolute",
  top: 0,
  left: "50%",
  transform: "translateX(-50%)",
  height: "100%",
  width: "auto",
  zIndex: 1,
}

const BannerMarqee: React.FC = () => {
  return (
    <section style={containerStyle}>
      {/* Top Marquee - behind image */}
      <div style={topMarqueeStyle}>
        <motion.div variants={marqueeVariants} animate="animateRight" style={{ display: 'inline-block' }}>
          <span style={textStyleTop}>
            Virtual Orbit * SEO * Virtual Orbit * SEO * Virtual Orbit * SEO *
          </span>
        </motion.div>
      </div>

      {/* Full height image */}
      <div style={imageContainerStyle}>
        <Image 
          src={SpiralUp} 
          alt="Agency Girl" 
          width={600}
          height={800}
          style={{
            height: "100%",
            width: "auto",
            objectFit: "cover",
          }}
          priority
        />
      </div>

      {/* Bottom Marquee - in front of image */}
      <div style={bottomMarqueeStyle}>
        <motion.div variants={marqueeVariants} animate="animateLeft" style={{ display: 'inline-block' }}>
          <span style={textStyleBottom}>
            Local SEO * AI SEO * Technical SEO * Ecommerce SEO *
          </span>
        </motion.div>
      </div>
    </section>
  )
}

export default BannerMarqee
