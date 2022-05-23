import { ProjectsRepositoty } from 'libs/supabase'
import { Project, ProjectStatus } from 'types/common'
import { useFetchWithCache } from './useFetchWithCache'

export const useGetProjects = (status: ProjectStatus) => {
  const { data, isFirstLoading, error } = useFetchWithCache<Project[]>(
    ['getProjects', status],
    () => new ProjectsRepositoty().findByStatus(status, 10),
  )
  
  return { 
      projects: data ?? [],
      isLoading: isFirstLoading,
      error
   }
}