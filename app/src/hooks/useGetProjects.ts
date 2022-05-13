import { ProjectsRepositoty } from 'libs/supabase'
import { Project } from 'types/common'
import { useFetchWithCache } from './useFetchWithCache'

export const useGetProjects = (status: 'upcoming' | 'live' | 'finished') => {
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