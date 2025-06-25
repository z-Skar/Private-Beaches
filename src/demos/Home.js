import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Hero from "components/hero/FullWidthWithImage.js";
import MainFeature from "components/features/TwoColSingleFeatureWithStats.js";
import SliderCard from "components/cards/ThreeColSlider.js";
import TrendingCard from "components/cards/TwoTrendingPreviewCardsWithImage.js";
import FAQ from "components/faqs/SimpleWithSideImage.js";
import Footer from "components/footers/MiniCenteredFooter.js";

export default () => (
  <AnimationRevealPage>
    <Hero />
    <SliderCard />
    <TrendingCard />
    <MainFeature />
    {/*<Blog />*/}
    {/*<Testimonial textOnLeft={true}/>*/}
    <FAQ />
    {/*<SubscribeNewsLetterForm />*/}
    <Footer />
  </AnimationRevealPage>
);
