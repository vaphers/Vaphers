'use client'

import React, { CSSProperties } from "react"
import Image from "next/image"
import { motion, Variants } from "framer-motion"

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
 background: "linear-gradient(135deg, #0b254f 0%, #0e2f63 100%)"
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
  bottom: '18%',
  zIndex: 2,
}

const textStyleTop: CSSProperties = {
  fontSize: "8vw",
  fontWeight: 400,
  color: "#fff",
  letterSpacing: 1,
  paddingRight: '50%',
  display: 'inline-block'
}

const textStyleBottom: CSSProperties = {
  fontSize: "8vw",
  fontWeight: 400,
  color: "#ffffffff",
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
      {/* Top Marquee */}
      <div style={topMarqueeStyle}>
        <motion.div variants={marqueeVariants} animate="animateRight" style={{ display: 'inline-block' }} className="bungee-inline-regular">
          <span style={textStyleTop}>
            Vaphers - SEO - Vaphers - Web Design - Vaphers - Paid Ads -
          </span>
        </motion.div>
      </div>

      {/* image */}
      <div style={imageContainerStyle}>
        <Image 
          src="https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto/v1761047473/agancy-girl_zwh79q.png"
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

      {/* Bottom Marquee */}
      <div style={bottomMarqueeStyle}>
        <motion.div variants={marqueeVariants} animate="animateLeft" style={{ display: 'inline-block' }} className="bungee-inline-regular">
          <span style={textStyleBottom}>
            SEO - Paid Ads - Website Dev - Social Media - Ai SEO -
          </span>
        </motion.div>
      </div>
    </section>
  )
}

export default BannerMarqee
