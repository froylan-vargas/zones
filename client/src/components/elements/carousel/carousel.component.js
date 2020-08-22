import React, { useState } from 'react';
import { Carousel, CarouselItem, CarouselControl, CarouselIndicators, CarouselCaption } from 'reactstrap';

const CustomCarousel = ({ data }) => {

    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === data.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    }

    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? data.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    }

    const goToIndex = (newIndex) => {
        if (animating) return;
        setActiveIndex(newIndex);
    }

    const slides = data.map((item) => {
        return (
            <CarouselItem
                key={item.key}
                className="carousel__item"
                onExiting={() => setAnimating(true)}
                onExited={() => setAnimating(false)}
                autoPlay
            >
                {item}
                <CarouselCaption captionText={""} captionHeader={item.key} />
            </CarouselItem>
        );
    });

    return (
        <Carousel
            className="carousel"
            activeIndex={activeIndex}
            next={next}
            previous={previous}
        >
            <CarouselIndicators items={data} activeIndex={activeIndex} onClickHandler={goToIndex} />
            {slides}
            <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
            <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
        </Carousel>
    );
}

export default CustomCarousel;