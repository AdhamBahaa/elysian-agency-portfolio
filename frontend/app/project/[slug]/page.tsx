import { notFound } from "next/navigation";
import { MOCK_PROJECTS, Project } from "@/lib/data";
import ProjectDetailClient from "@/components/ProjectDetailClient";

// Fetch project from Strapi (with silent error handling for local fallback)
async function getStrapiProject(slug: string): Promise<Project | null> {
  try {
    const res = await fetch(
      `http://127.0.0.1:1337/api/projects?filters[slug][$eq]=${slug}&populate=*`,
      {
        next: { revalidate: 60 }, // Revalidate every minute
      }
    );

    if (!res.ok) return null;
    
    const json = await res.json();
    if (!json.data || json.data.length === 0) return null;
    
    const data = json.data[0];
    
    // Map Strapi structure to our Project interface
    return {
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
      content: data.content || data.attributes?.content || "",
    };
  } catch (error) {
    // Silent catch to fallback to mock data
    console.warn("Strapi connection failed, falling back to mock data");
    return null;
  }
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;

  // 1. Try to fetch from Strapi CMS
  let project = await getStrapiProject(slug);

  // 2. Fall back to local mock data if Strapi is offline or project isn't found
  if (!project) {
    project = MOCK_PROJECTS.find((p) => p.slug === slug) || null;
  }

  // 3. Render 404 if project doesn't exist anywhere
  if (!project) {
    notFound();
  }

  return <ProjectDetailClient project={project} />;
}
