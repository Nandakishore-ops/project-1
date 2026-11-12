"use client";

import { ModernDeveloper } from "./ModernDeveloper";
import { MinimalProfessional } from "./MinimalProfessional";
import { CreativeDeveloper } from "./CreativeDeveloper";
import { CorporateProfessional } from "./CorporateProfessional";

interface PortfolioRendererProps {
  user: any;
  isPublicView?: boolean;
}

export function PortfolioRenderer({ user, isPublicView = false }: PortfolioRendererProps) {
  if (!user) return null;

  const template = user.template || "modern-developer";

  switch (template) {
    case "minimal-professional":
      return <MinimalProfessional user={user} isPublicView={isPublicView} />;
    case "creative-developer":
      return <CreativeDeveloper user={user} isPublicView={isPublicView} />;
    case "corporate-professional":
      return <CorporateProfessional user={user} isPublicView={isPublicView} />;
    case "modern-developer":
    default:
      return <ModernDeveloper user={user} isPublicView={isPublicView} />;
  }
}
