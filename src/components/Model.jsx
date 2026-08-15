import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";

import ModelView from "./ModelView";
import { yellowImg } from "../Utils";
import { models } from "../constants/index";
import { animateWithGsapTimeline } from "../Utils/animations";

function Model() {
  const [size, setSize] = useState("small");
  const [model, setModel] = useState({
    title: "iPhone 15 Pro in Natural Titanium",
    color: ["#8F8A81", "#FFE7B9", "#6F6C64"],
    img: yellowImg,
  });

  // Camera Controls for each individual model view
  const cameraControllSmall = useRef();
  const cameraControllLarge = useRef();

  // Model reference targets
  const small = useRef(new THREE.Group());
  const large = useRef(new THREE.Group());

  // Rotational state tracking
  const [smallRotation, setSmallRotation] = useState(0);
  const [largeRotation, setLargeRotation] = useState(0);

  // Global Page Entrance Animations
  useGSAP(() => {
    gsap.to("#heading", { y: 0, opacity: 1, delay: 0.2 });
  }, []);

  // View-switching Animation Logic
  useGSAP(() => {
    const tl = gsap.timeline();

    if (size === "large") {
      // Transition out the small model view to the left, slide the large in
      animateWithGsapTimeline(tl, small, smallRotation, "#view1", "#view2", {
        transform: "translateX(-100%)",
        duration: 2,
      });
    }

    if (size === "small") {
      // Transition out the large model view to the right, slide the small back in
      animateWithGsapTimeline(tl, large, largeRotation, "#view2", "#view1", {
        transform: "translateX(0)",
        duration: 2,
      });
    }
  }, [size, smallRotation, largeRotation]);

  return (
    <section className="common-padding">
      <div className="screen-max-width">
        <h1 id="heading" className="section-heading">
          Take a closer Look.
        </h1>

        <div className="flex flex-col items-center mt-5">
          {/* Main 3D Container viewport */}
          <div className="w-full h-[75vh] md:h-[90vh] overflow-hidden relative">
            {/* View Viewport 1 (Small Screen Scale Model) */}
            <ModelView
              index={1}
              groupRef={small}
              gsapType="view1"
              controlRef={cameraControllSmall}
              setRotationState={setSmallRotation}
              item={model}
              size={size}
            />

            {/* View Viewport 2 (Large Screen Scale Model) */}
            <ModelView
              index={2}
              groupRef={large}
              gsapType="view2"
              controlRef={cameraControllLarge}
              setRotationState={setLargeRotation}
              item={model}
              size={size}
            />

            {/* Global Shared Single WebGL Canvas Framework */}
            <Canvas
              className="w-full h-full"
              style={{
                position: "fixed",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                overflow: "hidden",
                pointerEvents: "none",
              }}
              eventSource={document.getElementById("root")}
            >
              {/* Event handler tunnel for View rendering */}
              <View.Port />
            </Canvas>
          </div>

          {/* --- ULTRA SLEEK CONTROL PANEL --- */}
          <div className="flex-center mt-8 w-full">
            <div className="flex justify-between items-center bg-zinc-800/80 backdrop-blur px-5 py-4 rounded-full w-full max-w-[420px] shadow-xl border border-zinc-700/30">
              {/* 1. Color Circles (Grouped tightly together) */}
              <ul className="flex items-center gap-3">
                {models.map((item, i) => (
                  <li
                    key={i}
                    className="w-6 h-6 rounded-full cursor-pointer transition-all duration-300 border-2"
                    style={{
                      backgroundColor: item.color[0],
                      borderColor:
                        model.title === item.title ? "#ffffff" : "transparent",
                      transform:
                        model.title === item.title ? "scale(1.1)" : "scale(1)",
                    }}
                    onClick={() => setModel(item)}
                  />
                ))}
              </ul>

              {/* 2. Size Switcher (Sleek, pill-shaped design) */}
              <div className="flex p-1 bg-black/40 rounded-full border border-zinc-700/50 backdrop-blur-sm">
                <button
                  onClick={() => setSize("small")}
                  className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 ${
                    size === "small"
                      ? "bg-white text-black shadow-md scale-105"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  6.1"
                </button>
                <button
                  onClick={() => setSize("large")}
                  className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 ${
                    size === "large"
                      ? "bg-white text-black shadow-md scale-105"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  6.7"
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Model;
