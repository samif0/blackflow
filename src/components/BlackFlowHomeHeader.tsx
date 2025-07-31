"use client";
import BlackFlowNavbar from './BlackFlowNavbar';
import { RedHatDisplay } from '../styles/fonts';
import AnimatedSlogan from './AnimatedSlogan';

export default function BlackFlowHomeHeader() {
  return (
    <div className="flex flex-col min-h-screen py-5 text-white">
      <BlackFlowNavbar />
      <h1 className={`${RedHatDisplay.className} mt-16 text-center text-4xl font-bold`}>
        <AnimatedSlogan slogans={[
          "We noticed you googled 'is ramen a food group?' Time to talk investing.",
          "We've done the math. Your coffee budget could buy a small country. Let's redirect that energy.",
          "15 minutes could save you from explaining why you own 47 houseplants.",
          "Your money shouldn't have commitment issues.",
          "Because 'it was on sale' isn't an investment strategy.",
          "Because your Pinterest board isn't a retirement plan.",
          "We calculated your DoorDash spending. The delivery drivers know your pets' names.",
          "We saw you finance a standing desk you never stand at. Time to stand up for your financial future.",
          "We noticed you bought 'healing crystals' for financial abundance. We use math instead.",
          "The banana slicer at 3am was a cry for help.",
          "Because 'HODL' isn't a complete investment strategy."
        ]} />
      </h1>
    </div>
  );
}