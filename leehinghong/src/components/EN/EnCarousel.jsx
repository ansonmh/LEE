import React, { Component } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';

const items = [
  {
    src: 'https://firebasestorage.googleapis.com/v0/b/leehinghong-30b89.appspot.com/o/index%2F19300001263502134311585990273_950.jpg?alt=media&token=14cdd380-126a-4979-a256-2bca7ed9464c',
    id: 1,
    altText: 'Slide 1',
    caption: 'Slide 1'
  },
  {
    src:'https://firebasestorage.googleapis.com/v0/b/leehinghong-30b89.appspot.com/o/index%2Fimages%20(1).jpeg?alt=media&token=3f31aea6-5e98-4fe0-a83a-33d1db194392',
    id: 2,
    altText: 'Slide 2',
    caption: 'Slide 2'
  },
  {
    src:'https://firebasestorage.googleapis.com/v0/b/leehinghong-30b89.appspot.com/o/index%2Fimages.jpeg?alt=media&token=03822ccc-6ea0-44a6-b8bd-7cc0fcfd91c6',
    id: 3,
    altText: 'Slide 3',
    caption: 'Slide 3'
  }
];

class EnCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;

    const slides = items.map((item) => {
      return (
        <CarouselItem
          className="custom-tag"
          tag="div"
          key={item.id}
          onExiting={this.onExiting}
          onExited={this.onExited}
        >
        <img top width="100%" top height="100%" alt={item.id} src={item.src}/>
          <CarouselCaption className="text-danger" captionText={item.caption} captionHeader={item.caption} />
        </CarouselItem>
      );
    });

    return (
      <div>
        <style>
          {
            `.custom-tag {
                max-width: 100%;
                max-height: 100%;
                background: black;
              }`
          }
        </style>
        <Carousel
          activeIndex={activeIndex}
          next={this.next}
          previous={this.previous}
        >
          <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
          {slides}
          <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
          <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
        </Carousel>
      </div>
    );
  }
}

export default EnCarousel;