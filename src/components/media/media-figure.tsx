import { cva, cx, type VariantProps } from "cva";
import type { ComponentProps } from "react";
import { Caption } from "./caption";

export const mediaFigureVariants = cva({
  base: [
    "MediaFigure relative overflow-hidden space-y-3",
    // "[&_img]:max-h-[70vh] [&_video]:max-h-[70vh]",
  ],
  variants: {
    figureIntent: {
      inGrid: "",
      inDialogTrigger: "hover:cursor-zoom-in",
      inMdx: "py-w4 first:pt-0",
      inMdxDialog: "py-w4 hover:cursor-zoom-in",
      mobileInset: "mx-auto max-w-[280px]",
      outset: "-mx-inset md:mx-[-3vw]",
      superOutset: [
        // "-mx-inset",
        "lg:mx-[calc((var(--container-hero)-var(--container-text)-var(--spacing-inset))/2*-1)]",
        // lg:w-hero
      ],
    },
    isPortrait: {
      // these styles allow control when images are within dialogs
      true: [
        "isPortrait flex flex-col justify-center",
        "[&_img]:max-h-[70vh] [&_video]:max-h-[70vh]",
        "[&_img]:h-[-webkit-fill-available] [&_video]:h-[-webkit-fill-available]",
        "[&_img]:mx-auto [&_video]:mx-auto",
      ],
    },
  },
  compoundVariants: [
    {
      isPortrait: true,
      figureIntent: "inGrid",
      className: "[&_img]:max-w-full [&_video]:max-w-full",
    },
    {
      isPortrait: true,
      figureIntent: "inMdxDialog",
      className: "[&_img]:max-w-[280px] [&_video]:max-w-[280px]",
    },
    {
      isPortrait: true,
      figureIntent: "superOutset",
      className: "[&_img]:sm:max-w-fit [&_video]:sm:max-w-fit",
    },
    {
      isPortrait: false,
      className: "[&_img]:w-full [&_video]:w-full",
    },
  ],
});

export interface MediaFigureProps
  extends ComponentProps<"figure">,
    VariantProps<typeof mediaFigureVariants> {
  caption?: React.ReactNode | string;
  // captionIntent?: VariantProps<typeof mediaFigureVariants>["figureIntent"];
}

export const MediaFigure = ({
  caption,
  children,
  ...props
}: MediaFigureProps) => (
  <figure
    data-component="MediaFigure"
    className={cx(mediaFigureVariants(props))}
  >
    {children}
    {caption ? (
      <Caption
      // className={cx(
      //   mediaFigureVariants({
      //     figureIntent: captionIntent,
      //   })
      // )}
      >
        {caption}
      </Caption>
    ) : null}
  </figure>
);
