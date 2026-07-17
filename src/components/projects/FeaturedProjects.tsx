import { FEATURED_PROJECTS } from '../../config/featuredProjects';
import { ProjectShowcase } from './ProjectShowcase';

type Props = {
  className?: string;
};

export function FeaturedProjects({ className = '' }: Props) {
  return (
    <div className={`grid items-stretch gap-8 lg:grid-cols-2 lg:gap-10 ${className}`}>
      {FEATURED_PROJECTS.map((project, i) => (
        <ProjectShowcase key={project.id} project={project} index={i} />
      ))}
    </div>
  );
}
