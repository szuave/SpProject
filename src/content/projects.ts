export type Project = {
  image: string;
  title: string;
  category: string;
  location: string;
};

export const projects: Project[] = [
  { image: "/img/project-1.png", title: "Gevelrenovatie", category: "Gevelwerken", location: "Gentbrugge" },
  { image: "/img/project-2.png", title: "Dak & houtbekleding", category: "Dakwerken", location: "Gent" },
  { image: "/img/project-3.png", title: "Badkamerrenovatie", category: "Renovatie", location: "Oost-Vlaanderen" },
  { image: "/img/project-4.png", title: "Totaalrenovatie", category: "Renovatie", location: "Gent" },
  { image: "/img/vloerwerken.jpg", title: "Vloerwerken", category: "Renovatie", location: "Oost-Vlaanderen" },
  { image: "/img/zolderwerken.jpg", title: "Zolderwerken", category: "Renovatie", location: "Gent" },
  { image: "/img/gevel-2.webp", title: "Gevelafwerking", category: "Gevelwerken", location: "Gent" },
  { image: "/img/renovatie.jpeg", title: "Ruwbouw & renovatie", category: "Renovatie", location: "Oost-Vlaanderen" },
];
