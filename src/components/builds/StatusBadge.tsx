"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import type { BuildStatus } from "@/app/builds/actions";

type StatusBadgeProps = {
  status: BuildStatus;
};

const statusStyles: Record<BuildStatus, { bg: string; text: string; dot: string }> = {
  draft: {
    bg: "bg-gray-100",
    text: "text-gray-600",
    dot: "text-gray-400",
  },
  active: {
    bg: "bg-green-100",
    text: "text-green-700",
    dot: "text-green-500",
  },
  archived: {
    bg: "bg-orange-100",
    text: "text-orange-700",
    dot: "text-orange-500",
  },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const styles = statusStyles[status] || statusStyles.draft;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${styles.bg} ${styles.text}`}
    >
      <FontAwesomeIcon icon={faCircle} className={`w-2 h-2 ${styles.dot}`} />
      <span className="capitalize">{status}</span>
    </span>
  );
}
