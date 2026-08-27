import { Download } from "lucide-react";
import { Button } from "@/components/common/Button.jsx";
import { personalInfo } from "@/data/personal.js";
import { cx } from "@/utils/helpers.js";

function ResumeFileLink({ file, className, children }) {
  return (
    <a href={file.href} download={file.filename} className={className}>
      {children}
    </a>
  );
}

export function ResumeDownload({ variant = "group", size = "sm", className }) {
  const files = personalInfo.resumeFiles;

  if (variant === "stack") {
    return (
      <div className={cx("space-y-3", className)}>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-text-muted">
          Download resume
        </p>
        <div className="grid grid-cols-2 gap-2" role="group" aria-label="Download resume">
          {files.map((file) => (
            <Button
              key={file.id}
              as="a"
              href={file.href}
              download={file.filename}
              variant="secondary"
              className="w-full hover:border-accent hover:bg-accent hover:text-bg active:bg-accent-hover"
            >
              <Download size={16} aria-hidden="true" />
              {file.label}
            </Button>
          ))}
        </div>
      </div>
    );
  }

  if (variant === "links") {
    return (
      <div className={cx("space-y-2", className)}>
        <p className="flex items-center gap-2 text-sm text-text-secondary">
          <Download size={16} className="shrink-0" aria-hidden="true" />
          Download resume
        </p>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Resume format">
          {files.map((file) => (
            <ResumeFileLink
              key={file.id}
              file={file}
              className="inline-flex min-h-10 items-center rounded-full border border-border px-4 text-sm text-text-secondary hover:border-accent hover:text-accent"
            >
              {file.label}
            </ResumeFileLink>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cx(
        "inline-flex max-w-full items-stretch overflow-hidden rounded-full border border-border-strong",
        size === "lg" && "min-h-12",
        className,
      )}
      role="group"
      aria-label="Download resume"
    >
      <span
        className={cx(
          "inline-flex shrink-0 items-center gap-1.5 px-3.5 text-sm text-text-secondary",
          size === "lg" && "px-4",
        )}
      >
        <Download size={14} aria-hidden="true" />
        Resume
      </span>
      {files.map((file) => (
        <ResumeFileLink
          key={file.id}
          file={file}
          className={cx(
            "inline-flex min-h-10 items-center border-l border-border-strong px-3.5 text-sm font-medium text-text hover:bg-white/5 hover:text-accent",
            size === "lg" && "min-h-12 px-4",
          )}
        >
          {file.label}
        </ResumeFileLink>
      ))}
    </div>
  );
}
