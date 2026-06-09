export const genreColours = {
  Comedy: "#EAB308",
  Theatre: "#3B82F6",
  Music: "#EC4899",
  "Dance, Physical Theatre & Circus": "#8B5CF6",
  "Cabaret and Variety": "#F97316",
  "Children's Shows": "#22C55E",
  "Musicals and Opera": "#EF4444",
  "Spoken Word": "#14B8A6",
  Exhibitions: "#A855F7",
  Events: "#F59E0B",
};

export const getGenreColour = (genre) => genreColours[genre] || "#6B7280";
