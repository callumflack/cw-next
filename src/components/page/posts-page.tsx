"use client";

import { LinkWithArrow } from "@/components/elements";
import {
  PostsList,
  PostsListBlock,
  StyledSortButton,
  sortButtonStyle,
  useSortedPosts,
} from "@/components/post";
import type { PostCategory, SortMethod } from "@/types/content";
import type { Post } from "content-collections";
import { cx } from "cva";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";

interface PostsPageProps {
  posts: Record<PostCategory, Post[]>;
  kind: PostCategory;
  initialSort: string;
}

export function PostsPage({ posts, kind, initialSort }: PostsPageProps) {
  const router = useRouter();
  const [currentSort, setCurrentSort] = useState<string>(initialSort);
  const [showGrid, setShowGrid] = useState(
    initialSort === kind ||
      initialSort === "projects" ||
      initialSort === "writing"
  );

  // Log received posts
  // console.log("Posts page received posts:", {
  //   kind,
  //   projectsCount: posts.projects?.length || 0,
  //   writingCount: posts.writing?.length || 0,
  // });

  const sortedPostsMap = useSortedPosts(
    posts,
    kind as PostCategory,
    currentSort as SortMethod
  );

  // const sortBy = [kind, "year", "topic", "a-to-z"];
  const sortBy = [kind, "year", "a-to-z"];

  const handleSortButtonClick = (sortKind: string) => {
    setCurrentSort(sortKind);
    router.push(`?sort=${sortKind}`, { scroll: false });

    if (sortKind === "projects" || sortKind === "writing") {
      setShowGrid((prev) => !prev);
    } else {
      setShowGrid(false);
    }
  };

  const getSortLabel = (sort: string): string => {
    if (sort === "projects" || sort === "writing") return " Selected";
    if (sort === "a-to-z") return "A-Z";
    if (sort === "year") return "Chrono";
    return sort.replace(/-/g, " ");
  };

  return (
    <main className="container">
      <ListHeader
        rhsNode={
          kind === "projects" && (
            <LinkWithArrow
              className={cx(sortButtonStyle, "text-solid pr-0")}
              href="/gallery"
              iconClassName="!translate-y-[-0.2em]"
            >
              Show me
            </LinkWithArrow>
          )
        }
      >
        {sortBy.map((sort) => (
          <Fragment key={sort}>
            <StyledSortButton
              initialSortBy={kind}
              key={sort}
              onClick={() => handleSortButtonClick(sort)}
              searchParamsValue={currentSort}
              sortBy={sort}
            >
              {getSortLabel(sort)}
            </StyledSortButton>
          </Fragment>
        ))}
      </ListHeader>

      {showGrid ? (
        <PostsListBlock
          kind={kind as PostCategory}
          sortBy={currentSort}
          sortedPostsMap={sortedPostsMap}
          wrapperClassName={cx("flex flex-col gap-w8 pt-w8")}
        />
      ) : (
        <PostsList
          kind={kind as PostCategory}
          sortBy={currentSort}
          sortedPostsMap={sortedPostsMap}
          wrapperClassName={cx(
            currentSort === "a-to-z" ? "pt-4 space-y-0" : "pt-0"
          )}
        />
      )}
    </main>
  );
}

export const ListHeader = ({
  children,
  rhsNode,
  className,
}: {
  children: React.ReactNode;
  rhsNode?: React.ReactNode;
  className?: string;
}) => (
  <nav
    className={cx(
      "bg-canvas top-nav sticky z-10",
      "translate-y-px transform",
      "before:w-inset before:-left-inset before:absolute before:top-0 before:bottom-0 before:z-1 before:bg-inherit before:content-['']",
      className
    )}
  >
    <div className="flex justify-between">
      <div className="flex items-center justify-start gap-2.5">{children}</div>
      {rhsNode}
    </div>
    <hr className="-mt-px" />
  </nav>
);
