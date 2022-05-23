import { Project, ProjectStatus } from "types/common";

export const getProjectStatus = (proj: Project): ProjectStatus => {
    if(proj.is_closed) return 'ended';
    if(!proj.whitelist_start) return 'upcoming'
    return 'live'
}

export const getProjectStatusLabel = (proj: Project): String => {
    const status = getProjectStatus(proj);
    if(status === 'upcoming') return 'Preparation';
    if(status === 'ended') return 'Ended';
    return 'Live'
}