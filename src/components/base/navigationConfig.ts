/**
 * Navigation types for the header mega menus.
 * Content is defined as direct HTML in NavigationBar.tsx (no arrays).
 */

/** Unique identifier for each mega menu section */
export type MegaMenuId =
  | "who-we-are"
  | "our-collection"
  | "fenesta-difference"
  | "projects-stories"
  | "contact-us"
  | null;

/** Returns menu title for aria-label (no config object needed) */
export function getMegaMenuTitle(id: MegaMenuId): string {
  if (!id) return "Navigation";
  const titles: Record<Exclude<MegaMenuId, null>, string> = {
    "who-we-are": "Who we are",
    "our-collection": "Our Collection",
    "fenesta-difference": "The Fenesta Difference",
    "projects-stories": "Projects & stories",
    "contact-us": "Contact us",
  };
  return titles[id] ?? "Navigation";
}
