import { useState } from "react";
import Preloader from "./components/Preloader";
import CustomCursor from "./components/CustomCursor";
import Background from "./components/Background";
import Nav from "./components/Nav";
import Hero from "./sections/Hero";
import Founder from "./sections/Founder";
import BuildMe from "./sections/BuildMe";
import OpenSource from "./sections/OpenSource";
import Projects from "./sections/Projects";
import Skills from "./sections/Skills";
import Path from "./sections/Path";
import Contact from "./sections/Contact";

const hasSeenPreloader = () => {
  try {
    return sessionStorage.getItem("bp-seen") === "1";
  } catch {
    return false;
  }
};

export default function App() {
  const [booted, setBooted] = useState(hasSeenPreloader);

  const handleDone = () => {
    try {
      sessionStorage.setItem("bp-seen", "1");
    } catch {
      /* private mode — ignore */
    }
    setBooted(true);
  };

  return (
    <div className="grain relative min-h-screen overflow-x-clip bg-navy-950 text-ink">
      <Background />
      <CustomCursor />
      {!booted && <Preloader onDone={handleDone} />}
      <Nav />
      <main className="relative">
        <Hero started={booted} />
        <Founder />
        <BuildMe />
        <OpenSource />
        <Projects />
        <Skills />
        <Path />
        <Contact />
      </main>
    </div>
  );
}