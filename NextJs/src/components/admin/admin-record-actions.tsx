"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function AdminRecordActions({
  entity,
  recordId,
  viewHref,
  editHref,
  deleted
}: {
  entity: "enquiries" | "partners" | "landing-pages";
  recordId: string;
  viewHref: string;
  editHref: string;
  deleted: boolean;
}) {
  const router = useRouter();
  const [isBusy, setIsBusy] = useState(false);

  const runAction = async (action: "delete" | "restore" | "permanent-delete") => {
    const confirmed = window.confirm(
      action === "delete"
        ? "Do you want to move this record to deleted items?"
        : action === "restore"
          ? "Do you want to restore this record?"
          : "Do you want to permanently delete this record? This cannot be undone."
    );

    if (!confirmed) {
      return;
    }

    setIsBusy(true);

    try {
      const method = action === "permanent-delete" ? "DELETE" : "PATCH";
      const response = await fetch(`/api/admin/records/${entity}/${recordId}`, {
        method,
        headers: { "Content-Type": "application/json" },
        body: action === "permanent-delete" ? undefined : JSON.stringify({ action })
      });

      if (!response.ok) {
        window.alert("The action could not be completed.");
        return;
      }

      router.refresh();
    } catch {
      window.alert("The action could not be completed.");
    } finally {
      setIsBusy(false);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      <button type="button" onClick={() => router.push(viewHref)} className="admin-button-secondary px-3 py-2">
        View
      </button>
      <button type="button" onClick={() => router.push(editHref)} className="admin-button-secondary px-3 py-2">
        Edit
      </button>
      {deleted ? (
        <>
          <button type="button" onClick={() => runAction("restore")} disabled={isBusy} className="admin-button-secondary px-3 py-2">
            Restore
          </button>
          <button
            type="button"
            onClick={() => runAction("permanent-delete")}
            disabled={isBusy}
            className="rounded-2xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Permanent Delete
          </button>
        </>
      ) : (
        <button
          type="button"
          onClick={() => runAction("delete")}
          disabled={isBusy}
          className="rounded-2xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm font-semibold text-amber-700 transition hover:bg-amber-100 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Delete
        </button>
      )}
    </div>
  );
}
