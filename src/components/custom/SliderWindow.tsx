
import { motion } from "framer-motion"

const sliderImages = [
    {
      src: "https://res.cloudinary.com/di97k34d0/image/upload/v1768238807/Screenshot_2026-01-12_223816_mcvnwq.png",
      alt: "OCHI clone",
    },
    {
      src: "https://res.cloudinary.com/di97k34d0/image/upload/v1768238806/Screenshot_2026-01-12_223341_ydfj1u.png",
      alt: "MOVIE vault",
    },
    {
      src: "https://res.cloudinary.com/di97k34d0/image/upload/v1768238819/Screenshot_2026-01-12_200557_knuk0n.png",
      alt: "AGENCY website",
    },
    {
      src: "https://res.cloudinary.com/di97k34d0/image/upload/v1768238809/Screenshot_2026-01-12_223848_df2qyq.png",
      alt: "OCHI clone",
    },
    {
      src: "https://res.cloudinary.com/di97k34d0/image/upload/v1768238813/Screenshot_2026-01-12_223353_yszttn.png",
      alt: "MOVIE vault",
    },
  ];

const SliderRow = () => (
  <motion.div
    initial={{ x: 0 }}
    animate={{ x: "-100%" }}
    transition={{ ease: "linear", repeat: Infinity, duration: 20 }}
    className="flex gap-4 mb-20"
    >
    {sliderImages.map((img, i) => (
        <div
        key={i}
        className="
            flex
            shrink-0
            w-[clamp(220px,30vw,400px)]
            h-[clamp(140px,18vw,260px)]
        "
        >
        <img
            className="w-full h-full object-cover rounded-xl"
            src={img.src}
            alt={img.alt}
        />
        </div>
    ))}
    </motion.div>

);

export default SliderRow
