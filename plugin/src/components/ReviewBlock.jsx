import React, { useState, Fragment } from "react";
import styled from "styled-components";
import Cart from "./Cart";
import Heading from "./Heading";
import RatingView from "./RatingView";
import Thumbs from "./Thumbs";

const content = `Hello Guys,

I purchased this phone recently and here goes my honest review.

Pros:
1. I love the way it looks and feels in hand. Its design is just beautiful. Over all it is a BIG phone but you wont feel it while using, its very convenient to use.
2. Display is the best I've known so far! The display will SPOIL you, just cant get enough of it.
3. Battery stands brilliant, over a day.
4. I wasn't expecting the phone to have such fast charging capability. 30-40 mins of charge per day, you are good to go. Take s about an hour to full charge, that's it!!!
5. S Pen: Handwriting to text. I love the way it can convert my handwriting to text! Something I did not think would be so useful, but you can end up exporting the Samsung notes to Word documents. Brilliant!
6. Air Actions are something I would use only for selfies. Its very convenient. Haven't tried more air actions as I never needed them.
7. Samsung's ONE UI is a LOT better than the one we used to see on Samsung devices. No more SAMSUNG LAG! The phone is very snappy. P.S: I come from OnePlus which was Snappy but not as fast as this one.
8. Gaming, heavy usage anything, this phone handles it very well.
9. You get a phone case, headphones in the box unlike any other manufacturer these days.
10. Insanely stable videos, and the editing mode. Just a boon I say!

Cons:
1. Finger print scanner could have been better.
2. Facial recolonization is a joke. Phone will unlock with my eyes closed. Like seriously Samsung? Anyone can unlock my phone while I am asleep.
3. Lack of headphone jack is a pain but the fact they provide decent pair of headphones in the box covers it up.
4. Camera is not what you expect from a Flagship company like Samsung on a Flagship device. The shutter speed is low and that means you cant have snappy pictures. Having said that, the phone takes decent pictures. I just hope they increase the shutter speed in future updates.

Overall experience:
This is the best NOTE Samsung have made so far, its a complete package. If you have a budget of 80k (74k if you can avail cashback from ICICI and HDFC) for a phone, this is the best phone you can get. Not to forget its cheaper than the Iphone. I love the fact that Samsung launches the products on same price as in US when compared to Apple which sells at a premium of 20-30k min. Samsung gives you the best for the buck.
I would rate it 5 stars.
Hope my review helps! :)`;

const Container = styled.div`
  border: 1px solid #e8e8e8;
  padding: 15px;
  border-radius: 5px;
`;

const Metadata = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
`;

const Time = styled.span`
  font-size: 12px;
  color: #999999;
`;

const Content = styled.pre`
  margin-top: 10px;
  font-size: 15px;
  white-space: pre-wrap;
  font-family: "Lato", sans-serif !important;
`;

const Verified = styled.p`
  font-size: 12px;
  display: flex;
  align-items: center;
  padding: 8px 0;
  border-radius: 22px;
  color: #7e9e00;
  font-weight: 700;
`;

const Helpful = styled.p`
  font-size: 12px;
  color: #626262;
  display: flex;
  align-items: center;
`;

const ActionButton = styled.button`
  outline: none;
  border: none;
  background-color: transparent;
  padding: 6px 8px;
  cursor: pointer;

  &:hover {
    background: #dbdbdb;
    border-radius: 100px;
  }
`;

const ExpandButton = styled.a`
  cursor: pointer;
  color: #4b4bcf;
  text-decoration: none;
  cursor: pointer;
`;

const ReviewBlock = () => {
  const [expanded, setExpanded] = useState(false);

  const handleExpansion = (e) => {
    e.preventDefault();
    setExpanded(!expanded);
  };

  return (
    <Container>
      <Metadata>
        <RatingView rating={3.4} size={15}></RatingView>
        <Time>3 days ago</Time>
      </Metadata>
      <Heading.H4>Awesome Review</Heading.H4>
      <Content>
        {expanded ? content : content.substring(0, 250)}
        {content.length > 250 && (
          <Fragment>
            &nbsp;&nbsp;{" "}
            <ExpandButton href="#" onClick={handleExpansion}>
              {expanded ? "Read Less" : "Read More"}
            </ExpandButton>
          </Fragment>
        )}
      </Content>
      <Actions>
        <Verified>
          <Cart /> &nbsp;&nbsp; Verified Purchase
        </Verified>
        <Helpful>
          <ActionButton>
            <Thumbs />
          </ActionButton>
          &nbsp;&nbsp; 145 People found it useful
        </Helpful>
      </Actions>
    </Container>
  );
};

export default ReviewBlock;
