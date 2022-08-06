import * as Popover from "@radix-ui/react-popover";
import { styled, keyframes } from "@stitches/react";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import { Cross2Icon } from "@radix-ui/react-icons";
const slideUpAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateY(2px)" },
  "100%": { opacity: 1, transform: "translateY(0)" },
});

const slideRightAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateX(-2px)" },
  "100%": { opacity: 1, transform: "translateX(0)" },
});

const slideDownAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateY(-2px)" },
  "100%": { opacity: 1, transform: "translateY(0)" },
});

const slideLeftAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateX(2px)" },
  "100%": { opacity: 1, transform: "translateX(0)" },
});
const StyledContent = styled(Popover.Content, {
  borderRadius: 4,
  padding: 20,
  // width: 260,
  backgroundColor: "white",
  boxShadow:
    "hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px",
  "@media (prefers-reduced-motion: no-preference)": {
    animationDuration: "400ms",
    animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
    animationFillMode: "forwards",
    willChange: "transform, opacity",
    '&[data-state="open"]': {
      '&[data-side="top"]': { animationName: slideDownAndFade },
      '&[data-side="right"]': { animationName: slideLeftAndFade },
      '&[data-side="bottom"]': { animationName: slideUpAndFade },
      '&[data-side="left"]': { animationName: slideRightAndFade },
    },
  },
  "&:focus": {
    boxShadow: `hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px, 0 0 0 2px hsl(206 22% 7% / 20%)`,
  },
});
export default ({ content }) => (
  <Popover.Root>
    <Popover.Trigger
      className="btn bg-neutral btn-square"
      aria-label="Add filters"
    >
      <MixerHorizontalIcon />
    </Popover.Trigger>

    <StyledContent
      className="bg-neutral p-4 rounded"
      align="start"
      alignOffset={0}
      sideOffset={5}
    >
      {content}
      <Popover.Arrow className=" fill-white" offset={12} />
      <Popover.Close
        aria-label="close"
        className="absolute top-2 right-2 btn btn-ghost btn-circle btn-xs text-gray-900"
      >
        <Cross2Icon />
      </Popover.Close>
    </StyledContent>
  </Popover.Root>
);
