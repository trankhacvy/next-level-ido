import dayjs from "dayjs";
import { Project, ProjectStatus, ProjectTimeline } from "types/common";

export const getProjectStatus = (proj: Project): ProjectStatus => {
  if (proj.is_closed) return "ended";
  if (!proj.whitelist_start) return "upcoming";
  return "live";
};

export const getProjectStatusLabel = (proj: Project): String => {
  const status = getProjectStatus(proj);
  if (status === "upcoming") return "Preparation";
  if (status === "ended") return "Ended";
  return "Live";
};

export const getProjectTimeline = (proj: Project): ProjectTimeline => {
  const now = dayjs();
  if (now.isBefore(proj.whitelist_start)) return "preparation";

  if (now.isBetween(proj.whitelist_start, proj.whitelist_end))
    return "whitelist";

  if (now.isBetween(proj.sale_start, proj.sale_end)) return "sale";

  if (now.isAfter(proj.claim_start)) return "distribution";

  return "unknow";
};
