"use client";
import BlackFlowNavbar from './BlackFlowNavbar';
import { RedHatDisplay } from '../styles/fonts';
import AnimatedSlogan from './AnimatedSlogan';

const slogan = "Track, Test, and Thrive.";

export default function BlackFlowHomeHeader() {
  return (
    <div className="flex flex-col min-h-screen py-5 text-white">
      <BlackFlowNavbar />
      <h1 className={`${RedHatDisplay.className} mt-16 text-center text-5xl font-bold`}>
        <AnimatedSlogan text={slogan} />
      </h1>
    </div>
  );
}