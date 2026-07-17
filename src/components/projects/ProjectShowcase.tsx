import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MapPinIcon,
  ShieldIcon,
  RouteIcon,
  TrendingUpIcon,
  StoreIcon,
  UtensilsIcon,
  UsersIcon,
  ArrowRightIcon,
} from 'lucide-react';
import type { FeaturedProject } from '../../config/featuredProjects';
import { VERTEX_BRAND_PROMO } from '../../config/margallaAssets';
import { WhatsAppContactButton } from '../ui/WhatsAppContactButton';
import { whatsAppMessageForProject } from '../../lib/whatsapp';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

const MARGALLA_ICONS = [MapPinIcon, ShieldIcon, RouteIcon, TrendingUpIcon];
const HORIZON_ICONS = [MapPinIcon, StoreIcon, UtensilsIcon, UsersIcon];

type Props = {
  project: FeaturedProject;
  index?: number;
};

export function ProjectShowcase({ project, index = 0 }: Props) {
  const [imgSrc, setImgSrc] = useState(project.image);
  const reduceMotion = usePrefersReducedMotion();
  const icons = project.id === 'horizon-mall' ? HORIZON_ICONS : MARGALLA_ICONS;
  const projectHref =
    project.guidePath && project.guideHash
      ? `${project.guidePath}#${project.guideHash}`
      : project.guidePath;
  const imageFit = project.imageFit ?? 'cover';

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={reduceMotion ? undefined : { y: -6 }}
      className="group flex h-full flex-col"
    >
      <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-navy-100/80 bg-white ring-1 ring-navy-100/40 transition-all duration-300 group-hover:border-white/20 group-hover:shadow-luxury-card-hover dark:border-navy-700 dark:bg-navy-900 dark:ring-navy-700/80 dark:group-hover:border-accent-green-border">
        {/* Image hero */}
        {projectHref ? (
          <Link
            to={projectHref}
            className="relative block shrink-0 overflow-hidden"
            aria-label={`Open ${project.name} project page`}
          >
            <div className="relative h-44 shrink-0 overflow-hidden sm:h-48 md:h-52 lg:h-56">
              {imgSrc ? (
                <img
                  src={imgSrc}
                  alt={project.imageAlt}
                  className={`h-full w-full bg-navy-950 transition-transform duration-700 ease-out group-hover:scale-105 ${
                    imageFit === 'contain' ? 'object-contain p-4 sm:p-6' : 'object-cover'
                  }`}
                  loading="lazy"
                  decoding="async"
                  onError={() => {
                    if (imgSrc !== VERTEX_BRAND_PROMO) setImgSrc(VERTEX_BRAND_PROMO);
                  }}
                />
              ) : null}

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/25 to-navy-950/10" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent-green/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              {/* Badge */}
              <span
                className={`absolute left-4 top-4 z-20 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] shadow-lg backdrop-blur-sm ${
                  project.badgeVariant === 'new'
                    ? 'bg-accent-green text-white'
                    : 'border border-white/20 bg-black/50 text-white'
                }`}
              >
                {project.badge}
              </span>

              {/* Amenity strip */}
              <div className="absolute inset-x-0 bottom-0 z-10 border-t border-white/10 bg-navy-950/85 px-2 py-2 backdrop-blur-md sm:px-3 sm:py-3">
                <div className="grid grid-cols-2 gap-1 sm:grid-cols-4 sm:gap-2">
                  {project.highlights.slice(0, 4).map((item, i) => {
                    const Icon = icons[i] ?? MapPinIcon;
                    return (
                      <div key={item.label} className="flex flex-col items-center gap-1 text-center">
                        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/10 text-zinc-200 sm:h-8 sm:w-8">
                          <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden />
                        </span>
                        <span className="line-clamp-2 text-[8px] font-bold uppercase leading-tight tracking-wide text-zinc-400 sm:text-[9px]">
                          {item.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Hover reveal */}
              <div className="pointer-events-none absolute inset-x-0 bottom-[4.5rem] z-20 flex translate-y-4 items-center justify-between px-5 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 sm:bottom-[5rem]">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/90">
                  View project
                </span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm">
                  <ArrowRightIcon className="h-4 w-4" aria-hidden />
                </span>
              </div>
            </div>
          </Link>
        ) : null}

        {/* Body */}
        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <div className="mb-1 inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-green" aria-hidden />
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-500">
              {project.tagline}
            </p>
          </div>

          {projectHref ? (
            <Link to={projectHref} className="group/title">
              <h3 className="font-display text-xl font-bold leading-snug text-navy-900 transition-colors group-hover/title:text-accent-green dark:text-cream sm:text-2xl">
                {project.name}
              </h3>
            </Link>
          ) : (
            <h3 className="font-display text-xl font-bold text-navy-900 dark:text-cream sm:text-2xl">
              {project.name}
            </h3>
          )}

          <div className="mt-2 flex items-center gap-1.5 text-navy-600 dark:text-zinc-400">
            <MapPinIcon className="h-3.5 w-3.5 shrink-0" aria-hidden />
            <span className="text-sm">{project.location}</span>
          </div>

          <p className="mt-3 line-clamp-2 flex-1 text-sm leading-relaxed text-navy-600 dark:text-zinc-400">
            {project.description}
          </p>

          <div className="mt-5 space-y-3 border-t border-navy-100 pt-5 dark:border-navy-700">
            <WhatsAppContactButton
              message={whatsAppMessageForProject(project.whatsAppProjectName)}
              size="sm"
              label="Ask on WhatsApp"
              variant="soft"
              className="w-full"
              onClick={(e) => e.stopPropagation()}
            />
            {projectHref && (
              <Link
                to={projectHref}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-navy-200/80 py-2.5 text-xs font-bold uppercase tracking-[0.12em] text-navy-800 transition-colors hover:border-accent-green-border hover:bg-accent-green-soft hover:text-navy-900 dark:border-navy-600 dark:text-cream dark:hover:border-accent-green-border dark:hover:text-white"
              >
                {project.guideLabel ?? 'Learn more'}
                <ArrowRightIcon className="h-3.5 w-3.5" aria-hidden />
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
