"use client";

import * as React from "react";
import Image from "next/image";

import {
  ScrollArea,
  ScrollBar,
} from "@/components/ui/scroll-area";

export interface Artwork {
  artist: string;
  art: string;
}

export const works: Artwork[] = [
  {
    artist: "Ornella Binni",
    art: "https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?auto=format&fit=crop&w=600&q=80",
  },
  {
    artist: "Tom Byrom",
    art: "https://images.unsplash.com/photo-1548516173-3cabfa4607e9?auto=format&fit=crop&w=600&q=80",
  },
  {
    artist: "Vladimir Malyavko",
    art: "https://images.unsplash.com/photo-1494337480532-3725c85fd2ab?auto=format&fit=crop&w=600&q=80",
  },
];

const infiniteWorks = [...works, ...works];

{infiniteWorks.map((artwork, index) => (
  <figure key={`${artwork.artist}-${index}`}>
    {/* ... */}
  </figure>
))}
export function ScrollAreaHorizontalDemo() {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const container = scrollRef.current;

    if (!container) return;

    let animationId: number;

    const scroll = () => {
      if (
        container.scrollLeft + container.clientWidth >=
        container.scrollWidth - 1
      ) {
        container.scrollLeft = 0;
      } else {
        container.scrollLeft += 0.5;
      }

      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div className="w-full">
      <ScrollArea className="w-full">
        <div
          ref={scrollRef}
          className="
            flex
            w-full
            gap-3
            overflow-x-auto
            px-3
            py-4
            sm:gap-4
            sm:px-4
            scroll-smooth
            [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden
          "
        >
          {works.map((artwork) => (
            <figure
              key={artwork.artist}
              className="
                group
                  w-[75vw]
  shrink-0
  sm:w-[45vw]
  md:w-[30vw]
  lg:w-[24vw]
  xl:w-[20vw]
              "
            >
              <div className="overflow-hidden rounded-lg">
                <Image
                  src={artwork.art}
                  alt={`Photo by ${artwork.artist}`}
                  width={600}
                  height={800}
                  sizes="
                    (max-width: 640px) 160px,
                    (max-width: 768px) 200px,
                    (max-width: 1024px) 230px,
                    (max-width: 1280px) 260px,
                    280px
                  "
                  className="
                    aspect-[3/4]
                    w-full
                    object-cover
                    transition-transform
                    duration-300
                    group-hover:scale-105
                  "
                />
              </div>

              <figcaption className="pt-2 text-xs text-muted-foreground sm:text-sm">
                Photo by{" "}
                <span className="font-semibold text-foreground">
                  {artwork.artist}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}