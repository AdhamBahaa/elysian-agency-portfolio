import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import HomeHeroClient from "@/components/HomeHeroClient";
import HorizontalGallery from "@/components/HorizontalGallery";
import Services from "@/components/Services";
import Footer from "@/components/Footer";

// Fetch projects from Strapi CMS
async function getProjects() {
  try {
    const res = await fetch("http://127.0.0.1:1337/api/projects?populate=*", {
      cache: "no-store",
    });

    if (!res.ok) return [];

    const json = await res.json();
    if (!json.data || json.data.length === 0) return [];

    const defaultImages = ["/project_1.jpg", "/project_2.jpg", "/project_3.jpg"];

    return json.data.map((data: any, idx: number) => {
      let imgUrl =
        data.coverImage?.url ||
        (Array.isArray(data.coverImage) ? data.coverImage[0]?.url : null) ||
        data.attributes?.coverImage?.url ||
        data.attributes?.coverImage?.data?.attributes?.url;

      if (!imgUrl) {
        imgUrl = defaultImages[idx % defaultImages.length];
      } else if (!imgUrl.startsWith("http")) {
        imgUrl = `http://127.0.0.1:1337${imgUrl.startsWith("/") ? "" : "/"}${imgUrl}`;
      }

      return {
        id: String(data.id || idx + 1),
        title: data.title || data.attributes?.title || `Project ${idx + 1}`,
        slug: data.slug || data.attributes?.slug || `project-${idx + 1}`,
        category: data.category || data.attributes?.category || "Creative Direction",
        client: data.client || data.attributes?.client || "Studio Client",
        year: data.year || data.attributes?.year || 2026,
        image: imgUrl,
        description: data.description || data.attributes?.description || "",
      };
    });
  } catch {
    console.warn("Strapi connection failed, using local mock projects on landing page.");
    return [];
  }
}

export default async function Home() {
  const strapiProjects = await getProjects();

  // If projects were loaded from Strapi, we pass them. 
  // Otherwise, HorizontalGallery will fall back to its internal mock data!
  const hasStrapiProjects = strapiProjects.length > 0;

  return (
    <SmoothScroll>
      {/* Premium custom mouse follower */}
      <CustomCursor />
      
      {/* Layout items */}
      <Navbar />
      
      <main className="flex flex-col">
        {/* Animated Hero Header */}
        <HomeHeroClient />

        {/* Horizontal Pin Scrolling Showcase */}
        <HorizontalGallery projects={hasStrapiProjects ? strapiProjects : undefined} />

        {/* GSAP dynamic height accordions */}
        <Services />
        
        {/* Contact info & socials */}
        <Footer />
      </main>
    </SmoothScroll>
  );
}
