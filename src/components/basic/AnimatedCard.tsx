import React from 'react'

type Props = React.PropsWithChildren<{}>;

const AnimatedCard: React.FC<Props> = ({ children }) => {
  return (
    <section className="relative flex items-center justify-center w-[190px] h-[254px] bg-[#07182E] overflow-hidden rounded-[20px] group">
      {children}
      <div className="absolute w-[100px] h-[130%] bg-gradient-to-b from-cyan-500 to-pink-500 animate-rotate-slow"></div>
      <div className="absolute inset-[5px] bg-[#07182E] rounded-[15px]"></div>
    </section>
  )
}

export default AnimatedCard