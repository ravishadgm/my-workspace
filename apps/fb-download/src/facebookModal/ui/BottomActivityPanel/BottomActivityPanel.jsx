"use client";

import React from "react";
import PostCaption from "@/facebookModal/ui/PostCaption/PostCaption";
import { handleShareAll, handleDownloadAll } from "shared/hooks";
import { FaRegHeart, FaRegComment } from "shared/icons";
import styles from "./BottomActivityPanel.module.scss";

export default function BottomActivityPanel({ data }) {
  const {
    mediaUrls = [],
    likes = 0,
    views = 0,
    comments = 0,
    username,
    caption,
  } = data;

  const displayUsername = username || "facebook_user";

  return (
    <div className={styles.bottomAcitivity}>
      <div className={styles.counterSection}>
        {caption && (
          <PostCaption username={displayUsername} caption={caption} />
        )}

        <div className={styles.shareDownload}>
          <button
            className={styles.shareBtn}
            onClick={() => handleDownloadAll(mediaUrls)}
          >
            {mediaUrls.length > 1
              ? `Download All (${mediaUrls.length})`
              : "Download"}
          </button>
          <button
            className={styles.shareBtn}
            onClick={() => handleShareAll(mediaUrls)}
          >
            {mediaUrls.length > 1 ? `Share All (${mediaUrls.length})` : "Share"}
          </button>
        </div>
      </div>
    </div>
  );
}
