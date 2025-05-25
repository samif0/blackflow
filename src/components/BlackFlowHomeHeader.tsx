"use client";
import BlackFlowNavbar from './BlackFlowNavbar';
import { RedHatDisplay } from '../styles/fonts';
import AnimatedSlogan from './AnimatedSlogan';

const slogan = "Track, Test, and Thrive.";

export default function BlackFlowHomeHeader() {
  return (
    <div className="flex flex-col min-h-screen p-12 text-white bg-black bg-opacity-50 backdrop-blur-sm bg-gradient-to-b from-black to-emerald-900">
      <BlackFlowNavbar />
      <h1 className={`${RedHatDisplay.className} mt-16 text-center text-5xl font-bold`}>
        <AnimatedSlogan text={slogan} />
      </h1>
    </div>
  );
}