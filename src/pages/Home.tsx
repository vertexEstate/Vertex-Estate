import type { ReactNode } from 'react';
import { lazy, Suspense, useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowRightIcon, ArrowUpIcon } from 'lucide-react';
import { Hero } from '../components/home/Hero';
import { Categories } from '../components/home/Categories';
import { Stats } from '../components/home/Stats';
import { CTA } from '../components/home/CTA';
import { ProjectGallery } from '../components/home/ProjectGallery';
import { PremiumVideoPreview } from '../components/home/PremiumVideoPreview';
import { LocationShowcase } from '../components/home/LocationShowcase';
import { MargallaMasterPlanMap } from '../components/margalla/MargallaMasterPlanMap';
import { FeaturedProjects } from '../components/projects/FeaturedProjects';
import { WhatsAppInquiryCard } from '../components/contact/WhatsAppInquiryCard';
import { AmenitiesShowcase } from '../components/home/AmenitiesShowcase';
import { WhyChooseVertex } from '../components/home/WhyChooseVertex';
import { InvestmentBenefits } from '../components/home/InvestmentBenefits';
import { MasterPlanOverview } from '../components/margalla/MasterPlanOverview';
import { HorizonMallOverview } from '../components/projects/HorizonMallOverview';
import { HomeFaq } from '../components/home/HomeFaq';
import { ResidentialPlotCategories } from '../components/margalla/ResidentialPlotCategories';
import { SectionHeading } from '../components/ui/SectionHeading';
const Testimonials = lazy(() =>
  import('../components/home/Testimonials').then((m) => ({ default: m.Testimonials }))
);
const MultiStepForm = lazy(() =>
  import('../components/ui/MultiStepForm').then((m) => ({ default: m.MultiStepForm }))
);
import { Button } from '../components/ui/Button';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

const revealSoft = {
  hidden: { opacity: 0, y: 36 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.62, ease: [0.22, 1, 0.36, 1] },
  },
};

const revealReduced = {
  hidden: { opacity: 1, y: 0 },
  show: { opacity: 1, y: 0, transition: { duration: 0 } },
};

function SectionShell({
  children,
  className = '',
  id,
  pattern = false,
  beam = false,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  pattern?: boolean;
  /** Soft animated top highlight */
  beam?: boolean;
}) {
  return (
    <section
      id={id}
      className={`relative scroll-mt-header overflow-hidden px-3 py-10 sm:px-6 sm:py-20 lg:px-8 lg:py-24 ${className}`}
    >
      {beam && (
        <motion.div
          className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-px bg-gradient-to-r from-transparent via-gold-400/50 to-transparent"
          initial={{ opacity: 0, scaleX: 0.3 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        />
      )}
      {pattern && (
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.28] dark:opacity-[0.12]"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(100, 116, 139, 0.09) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(100, 116, 139, 0.09) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
      )}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_0%,rgba(0,188,254,0.06),transparent_62%)]" />
      <div className="relative z-[2]">{children}</div>
    </section>
  );
}

function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const reduce = usePrefersReducedMotion();
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -12% 0px', amount: 0.12 }}
      variants={reduce ? revealReduced : revealSoft}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function AmbientBackdrop({ active }: { active: boolean }) {
  if (!active) return null;
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <motion.div
        className="absolute -left-[18%] top-[8%] h-[min(72vw,520px)] w-[min(72vw,520px)] rounded-full bg-gold-500/[0.09] blur-[120px] will-change-transform"
        animate={{ x: [0, 24, 0], y: [0, -18, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -right-[12%] top-[38%] h-[min(60vw,440px)] w-[min(60vw,440px)] rounded-full bg-navy-500/[0.12] blur-[100px] will-change-transform dark:bg-gold-600/[0.06]"
        animate={{ x: [0, -20, 0], y: [0, 28, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="fixed left-0 right-0 top-0 z-[95] h-px origin-left bg-white/30"
      style={{ scaleX: scrollYProgress, willChange: 'transform' }}
      aria-hidden
    />
  );
}

function SectionDeferredFallback() {
  return (
    <div
      className="flex min-h-[12rem] items-center justify-center gap-2"
      aria-hidden
    >
      <span className="h-1 w-10 animate-pulse rounded-full bg-gold-500/35" />
      <span className="h-1 w-6 animate-pulse rounded-full bg-gold-500/25 [animation-delay:120ms]" />
      <span className="h-1 w-14 animate-pulse rounded-full bg-gold-500/30 [animation-delay:240ms]" />
    </div>
  );
}

export function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showTop, setShowTop] = useState(false);
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 520);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const id = location.hash.replace(/^#/, '');
    if (!id) return;
    const scrollToTarget = () => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    const frame = requestAnimationFrame(scrollToTarget);
    const retry = window.setTimeout(scrollToTarget, 120);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(retry);
    };
  }, [location.hash]);

  return (
    <main className="relative isolate overflow-x-hidden bg-cream text-charcoal dark:diyweb-mesh dark:text-zinc-100">
      <AmbientBackdrop active={!reduceMotion} />
      <ScrollProgress />

      <div className="relative z-10">
        <Hero />

        <SectionShell
          beam
          id="highlights"
          className="border-t border-navy-100/60 bg-white dark:border-navy-800 dark:bg-navy-900"
        >
          <div className="relative mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Our projects"
              title="Premium developments in Islamabad"
              subtitle="DHA-supervised residential living at Margalla Orchards and commercial retail investment at Horizon Mall — both backed by Vertex Estate."
            />
            <Reveal className="mt-10 sm:mt-12">
              <FeaturedProjects />
            </Reveal>
          </div>
        </SectionShell>

        <SectionShell
          beam
          id="video-preview"
          className="border-y border-navy-100/60 bg-black dark:border-navy-800"
        >
          <div className="relative mx-auto max-w-7xl [&_h2_span]:text-white [&_p]:text-zinc-400">
            <SectionHeading
              eyebrow="Experience Vertex"
              title="See our projects in motion"
              subtitle="A silent cinematic preview of DHA Margalla Orchards and Horizon Mall — premium real estate in Islamabad."
            />
            <Reveal className="mt-10 sm:mt-12">
              <PremiumVideoPreview />
            </Reveal>
          </div>
        </SectionShell>

        <SectionShell id="why-vertex" className="bg-cream dark:bg-navy-950">
          <div className="relative mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Why Vertex Estate"
              title="A luxury experience you can trust"
              subtitle="We combine international-grade service with deep local expertise across Islamabad's premium developments."
            />
            <Reveal className="mt-12 sm:mt-14">
              <WhyChooseVertex />
            </Reveal>
          </div>
        </SectionShell>

        <SectionShell id="investment" className="border-y border-navy-100/60 bg-white dark:border-navy-800 dark:bg-navy-900">
          <div className="relative mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Investment benefits"
              title="Built for lasting value"
              subtitle="Strategic locations, flexible plans, and transparent guidance for buyers and investors alike."
            />
            <Reveal className="mt-12 sm:mt-14">
              <InvestmentBenefits />
            </Reveal>
          </div>
        </SectionShell>

        <SectionShell
          beam
          pattern
          id="plots"
          className="border-y border-navy-100/60 bg-cream dark:border-navy-800 dark:bg-navy-950"
        >
          <div className="relative mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Residential plot categories"
              title="Plot sizes at DHA Margalla Orchard"
              subtitle="DHA Margalla Orchard offers multiple residential plot categories to accommodate varying family sizes and investment objectives."
            />
            <Reveal className="mt-10 sm:mt-12">
              <ResidentialPlotCategories showIntro={false} />
            </Reveal>
            <Reveal className="mt-10 flex justify-center sm:mt-12">
              <Button
                variant="outline"
                className="shrink-0 bg-white/90 backdrop-blur-sm dark:bg-navy-900/70"
                onClick={() => navigate('/listings')}
              >
                View all listings
                <ArrowRightIcon className="h-4 w-4" aria-hidden />
              </Button>
            </Reveal>
          </div>
        </SectionShell>

        <SectionShell id="master-plan" className="bg-white dark:bg-navy-900">
          <div className="relative mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Master plan"
              title="A vision carefully designed for future generations"
              subtitle="DHA Margalla Orchard spans approximately 8,380 Kanals of thoughtfully planned land in Islamabad's Zone-IV. Every element of the master plan has been designed under DHA planning standards, ensuring an organized, sustainable, and future-ready community."
            />
            <Reveal className="mt-12 sm:mt-14">
              <MasterPlanOverview showIntro={false} />
            </Reveal>

            <Reveal className="mt-12 sm:mt-14 lg:mt-16">
              <HorizonMallOverview />
            </Reveal>
          </div>
        </SectionShell>

        <SectionShell
          beam
          id="gallery"
          className="border-t border-navy-100/80 bg-white dark:border-navy-700 dark:bg-navy-900"
        >
          <div className="relative mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Project visuals"
              title="See Margalla Orchards"
              subtitle="Official Vertex Estate × DHA Margalla Orchard promo — Park Road, Islamabad."
            />
            <Reveal className="mt-10 sm:mt-12">
              <ProjectGallery />
            </Reveal>
          </div>
        </SectionShell>

        <SectionShell
          beam
          id="master-plan-map"
          className="border-y border-navy-100/80 bg-gradient-to-b from-white to-cream dark:border-navy-700 dark:from-navy-900 dark:to-navy-950"
        >
          <div className="relative mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Master plan"
              title="DHA Margalla Orchards map"
              subtitle="See every block, plot size, road, park, and commercial zone on Park Road, Islamabad."
            />
            <Reveal className="mt-10 sm:mt-12">
              <MargallaMasterPlanMap showProjectLink />
            </Reveal>
          </div>
        </SectionShell>

        <SectionShell
          beam
          id="location"
          className="bg-cream dark:bg-navy-950"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_42%_at_50%_-8%,rgba(201,162,39,0.08),transparent_58%)]" />
          <div className="relative mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Park Road, Islamabad"
              title="Prime location at Margalla Orchards"
              subtitle="Opposite COMSATS University with Margalla Hills views, and a short drive to Islamabad’s main business areas."
            />
            <Reveal className="mt-10 sm:mt-12">
              <LocationShowcase />
            </Reveal>
          </div>
        </SectionShell>

        <SectionShell
          beam
          id="pricing"
          className="border-t border-navy-100/70 bg-cream/90 dark:border-white/[0.06] dark:bg-navy-950/90"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_42%_at_50%_-8%,rgba(201,162,39,0.06),transparent_58%)]" />
          <div className="relative mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Contact us"
              title="Speak with a property consultant"
              subtitle="10 Marla, 14 Marla, and 1 Kanal plots with DHA planning. Our team replies with today's availability and a clear quote."
            />
            <Reveal className="mt-12 sm:mt-14 lg:mt-16">
              <WhatsAppInquiryCard />
            </Reveal>
          </div>
        </SectionShell>

        <SectionShell
          beam
          pattern
          id="amenities"
          className="bg-cream dark:bg-navy-950"
        >
          <div className="relative mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Society amenities"
              title="Built for modern family living"
              subtitle="DHA-standard infrastructure, security, and green spaces. Everything you expect from a supervised housing society."
            />
            <Reveal className="mt-12 sm:mt-14 lg:mt-16">
              <AmenitiesShowcase />
            </Reveal>
            <Reveal className="mt-14 lg:mt-16">
              <Categories />
            </Reveal>
          </div>
        </SectionShell>

        <SectionShell
          beam
          pattern
          id="noc"
          className="border-y border-navy-100/80 bg-white/90 dark:border-navy-700/80 dark:bg-navy-800/95"
        >
          <div className="relative mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="NOC and approvals"
              title="DHA-supervised development"
              subtitle="Margalla Orchards is developed under DHA Islamabad with SCBAP and FGEHA, so buyers get clear planning, solid infrastructure, and long-term value."
            />
            <Reveal className="mt-12 sm:mt-14 lg:mt-16">
              <Stats />
            </Reveal>
          </div>
        </SectionShell>

        <SectionShell
          beam
          id="concierge"
          className="bg-gradient-to-b from-[#f3f1eb] to-cream dark:from-navy-950 dark:to-navy-900"
        >
          <div className="relative mx-auto max-w-3xl">
            <SectionHeading
              eyebrow="Personalized search"
              title="Find your perfect match"
              subtitle="Share your goals in a few guided steps. Our team uses your answers to shortlist options that fit your budget and timeline."
            />
            <Reveal className="mt-12 sm:mt-14">
              <Suspense fallback={<SectionDeferredFallback />}>
                <MultiStepForm />
              </Suspense>
            </Reveal>
          </div>
        </SectionShell>

        <SectionShell
          beam
          pattern
          id="testimonials"
          className="border-y border-navy-100/60 bg-white dark:border-navy-800 dark:bg-navy-900"
        >
          <div className="relative mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Client stories"
              title="What our clients say"
              subtitle="Honest words from people who trusted Vertex Estate with one of life's biggest decisions."
            />
            <Reveal className="mt-12 sm:mt-14 lg:mt-16">
              <Suspense fallback={<SectionDeferredFallback />}>
                <Testimonials />
              </Suspense>
            </Reveal>
          </div>
        </SectionShell>

        <SectionShell id="site-visit" className="bg-cream pb-12 dark:bg-navy-950 sm:pb-16">
          <Reveal>
            <div className="relative mx-auto max-w-7xl">
              <CTA />
            </div>
          </Reveal>
        </SectionShell>

        <SectionShell id="faq" className="border-t border-navy-100/60 bg-white dark:border-navy-800 dark:bg-navy-900">
          <div className="relative mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="FAQ"
              title="Frequently asked questions"
              subtitle="Everything you need to know about buying at DHA Margalla Orchards with Vertex Estate."
            />
            <Reveal className="mt-12 sm:mt-14">
              <HomeFaq />
            </Reveal>
          </div>
        </SectionShell>
      </div>

      <AnimatePresence>
        {showTop && (
          <motion.button
            type="button"
            initial={{ opacity: 0, scale: 0.85, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 12 }}
            transition={{ type: 'spring', stiffness: 420, damping: 28 }}
            whileHover={{ scale: 1.06, y: -2 }}
            whileTap={{ scale: 0.94 }}
            className="inset-fab-above-chat fixed z-[55] flex h-11 w-11 items-center justify-center rounded-full border border-gold-500/40 bg-navy-800 text-gold-400 shadow-xl shadow-black/25 transition-colors hover:bg-navy-700 hover:text-gold-300 sm:h-12 sm:w-12"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to top"
          >
            <ArrowUpIcon className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </main>
  );
}
