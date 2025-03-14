"use client";

import { Link } from "@/components/atoms";
import { cx } from "cva";
import { useMemo } from "react";
import type { Post } from "content-collections";
import type { GroupedPosts } from "@/types/content";
import { PostLine } from "./post-line";
import { sortButtonStyle } from "../sort";
import { hideFeaturedDotStyle } from "../post.styles";

interface PostsListGroupedProps {
  groupedPosts: GroupedPosts;
  sortOrder?: string[];
}

export const PostsListGrouped = ({
  groupedPosts,
  sortOrder,
}: PostsListGroupedProps) => {
  const sortedGroups = useMemo(() => {
    if (sortOrder) {
      return sortOrder
        .map((group) => [group, groupedPosts[group]])
        .filter(([, posts]) => Array.isArray(posts)) as [string, Post[]][];
    }

    // Default sorting (for years, sort numerically descending)
    return Object.entries(groupedPosts).sort((a, b) => {
      // Try numeric sort first (for years)
      const numA = parseInt(a[0]);
      const numB = parseInt(b[0]);

      if (!isNaN(numA) && !isNaN(numB)) {
        return numB - numA;
      }

      // Fall back to alphabetical
      return a[0].localeCompare(b[0]);
    });
  }, [groupedPosts, sortOrder]);

  return (
    <>
      {sortedGroups.map(([group, posts]) => (
        <div
          data-component="PostsListGrouped"
          className="relative space-y-3"
          key={group}
        >
          <div
            className={cx(
              "bg-canvas sticky z-9",
              "top-[calc(var(--spacing-nav)+var(--spacing-tab))]",
              hideFeaturedDotStyle
            )}
          >
            <div
              className={cx(
                sortButtonStyle,
                "h-[calc(theme(spacing.tab)-9px)]",
                // 42px is the height of the featured dot + padding
                // No idea why scroll-mt works here but no on the parent div…
                "scroll-mt-[calc(theme(spacing.nav)+theme(spacing.tab)+42px)]"
              )}
              id={group}
            >
              {group}
            </div>
            <hr className="-mt-px" />
          </div>
          <div className="space-y-0 pb-1.5">
            {Array.isArray(posts) &&
              posts.map((post: Post) => (
                <Link href={post.thumbnailLink ?? post.slug} key={post._id}>
                  <PostLine
                    isFeatured={post.tags?.includes("featured")}
                    post={post}
                  />
                </Link>
              ))}
          </div>
        </div>
      ))}
    </>
  );
};

/* CURRENTLY UNUSED */
// export const PostsListCardGrouped = ({
//   groupedPosts,
//   sortOrder,
// }: PostsListGroupedProps) => {
//   const sortedGroups = useMemo(() => {
//     if (sortOrder) {
//       return sortOrder
//         .map((group) => [group, groupedPosts[group]])
//         .filter(([, posts]) => Array.isArray(posts)) as [string, Post[]][];
//     }
//     return Object.entries(groupedPosts).sort(
//       (a, b) => parseInt(b[0]) - parseInt(a[0])
//     );
//   }, [groupedPosts, sortOrder]);

//   return (
//     <>
//       {sortedGroups.map(([group, posts]) => (
//         <div className="PostsListCardGrouped space-y-w4 relative" key={group}>
//           <div className="top-[calc(theme(spacing.nav)+theme(spacing.tab))] bg-canvas sticky z-[9]">
//             <div className={cx(sortButtonStyle)}>{group}</div>
//             <hr className="-mt-px" />
//           </div>
//           <div className="space-y-w24 pb-2.5">
//             {Array.isArray(posts) &&
//               posts.map((post: Post) => (
//                 // <HomeCard
//                 //   key={post.title}
//                 //   post={post}
//                 //   className=""
//                 //   captionClassName="pt-w4"
//                 // >
//                 //   <PostCard
//                 //     post={post}
//                 //     theme="default"
//                 //     aspectClassName="aspect-[1440/880]"
//                 //   ></PostCard>
//                 // </HomeCard>
//                 <PostCard
//                   captionClassName="absolute bottom-[-2em] translate-y-[0.6em] pt-1.5"
//                   className="rounded-card bg-background lg:p-[7em]"
//                   key={post.title}
//                   post={post}
//                 />
//               ))}
//           </div>
//         </div>
//       ))}
//     </>
//   );
// };
