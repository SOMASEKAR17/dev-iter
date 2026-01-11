
import { motion } from "framer-motion"

const sliderImages = [
    {
      src: "https://images.unsplash.com/photo-1556745757-8d76bdb6984b?q=80&w=1200&auto=format&fit=crop",
      alt: "Finance dashboard",
    },
    {
      src: "https://images.unsplash.com/photo-1556155092-8707de31f9c4?q=80&w=1200&auto=format&fit=crop",
      alt: "Startup workspace",
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
      alt: "Amazon",
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg",
      alt: "Samsung",
    },
    {
      src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop",
      alt: "App showcase",
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
