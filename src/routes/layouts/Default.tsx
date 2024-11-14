import Header from '../../components/Header'
import { useOutlet, ScrollRestoration, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

export default function DefaultLayout() {
  const location = useLocation()
  //동적 == 반응형
  const outlet = useOutlet()
  return (
    <>
      <Header />
      <AnimatePresence>
        <motion.div
          key={location.pathname}
          //나타나기 전
          initial={{ opacity: 0 }}
          //나타나기 후
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, position: 'absolute' }}
          //초 단위
          transition={{ duration: 0.3 }}>
          {outlet}
        </motion.div>
      </AnimatePresence>
      <ScrollRestoration />
    </>
  )
}
