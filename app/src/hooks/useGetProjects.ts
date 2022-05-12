import useSWR from 'swr'
import { ProjectsRepositoty } from 'libs/supabase'
import { Project } from 'types/common'

export const useGetProjects = (status: 'upcoming' | 'live' | 'finished') => {
  const { data, isValidating, error } = useSWR<Project[]>(
      ['getProjects', status],
      () => new ProjectsRepositoty().findByStatus(status, 10),
  )
  
  return { 
      projects: data ?? [],
      isLoading: isValidating,
      error
   }
}