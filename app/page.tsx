import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Background } from "@/components/background"
import CountdownComponent from "@/components/countdown"

export default function Home() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <Background />
      <Header />
      <main className="h-screen w-full flex items-center justify-center pt-14 pb-16">
        <CountdownComponent />
      </main>
      <Footer />
    </div>
  )
}