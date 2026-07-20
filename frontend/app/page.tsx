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
      cache: "no-store", // Ensures we always check fresh content
    });

    if (!res.ok) return [];

    const json = await res.json();
    if (!json.data || json.data.length === 0) return [];

    return json.data.map((data: any) => ({
      id: data.id,
      title: data.title || data.attributes?.title,
      slug: data.slug || data.attributes?.slug,
      category: data.category || data.attributes?.category,
      client: data.client || data.attributes?.client,
      year: data.year || data.attributes?.year,
      image: data.coverImage?.url 
        ? `http://127.0.0.1:1337${data.coverImage.url}` 
        : data.attributes?.coverImage?.data?.attributes?.url 
          ? `http://127.0.0.1:1337${data.attributes.coverImage.data.attributes.url}`
          : "/project_1.jpg",
      description: data.description || data.attributes?.description || "",
    }));
  } catch (error) {
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
