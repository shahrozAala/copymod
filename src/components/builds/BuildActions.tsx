"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faToggleOn,
  faToggleOff,
  faTrash,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { updateBuildStatus, deleteBuild, type BuildStatus } from "@/app/builds/actions";

type BuildActionsProps = {
  buildId: string;
  currentStatus: BuildStatus;
  showView?: boolean;
};

export function BuildActions({ buildId, currentStatus, showView = false }: BuildActionsProps) {
  const nextStatus: BuildStatus = currentStatus === "active" ? "draft" : "active";
  const statusIcon = currentStatus === "active" ? faToggleOn : faToggleOff;
  const statusTitle = currentStatus === "active" ? "Set to Draft" : "Publish";

  const updateStatusAction = updateBuildStatus.bind(null, buildId, nextStatus);
  const deleteAction = deleteBuild.bind(null, buildId);

  return (
    <div className="flex items-center gap-2">
      {showView && (
        <Link
          href={`/builds/${buildId}`}
          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          title="View"
        >
          <FontAwesomeIcon icon={faEye} className="w-4 h-4" />
        </Link>
      )}
      <Link
        href={`/builds/${buildId}/edit`}
        className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
        title="Edit"
      >
        <FontAwesomeIcon icon={faPenToSquare} className="w-4 h-4" />
      </Link>
      <form action={updateStatusAction}>
        <button
          type="submit"
          className={`p-2 rounded-lg transition-colors cursor-pointer ${
            currentStatus === "active"
              ? "text-green-600 hover:text-orange-600 hover:bg-orange-50"
              : "text-gray-600 hover:text-green-600 hover:bg-green-50"
          }`}
          title={statusTitle}
        >
          <FontAwesomeIcon icon={statusIcon} className="w-4 h-4" />
        </button>
      </form>
      <form
        action={deleteAction}
        onSubmit={(e) => {
          if (!confirm("Are you sure you want to delete this build?")) {
            e.preventDefault();
          }
        }}
      >
        <button
          type="submit"
          className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
          title="Delete"
        >
          <FontAwesomeIcon icon={faTrash} className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
