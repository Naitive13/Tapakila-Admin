import { useRecordContext, Button } from "react-admin";

export const EventPosterDownloadButton = () => {
  const record = useRecordContext();
  if (!record || !record.eventPoster) return null;

  const handleDownload = async () => {
    try {
      // Récupérer l'image via fetch
      const response = await fetch(record.eventPoster);
      
      if (!response.ok) {
        throw new Error("Failed to fetch image");
      }

      // Vérifier que l'URL est bien une image en fonction du type MIME
      const contentType = response.headers.get("Content-Type");
      if (!contentType || !contentType.startsWith("image/")) {
        throw new Error("The URL does not point to a valid image");
      }

      // Récupérer l'image sous forme de Blob
      const blob = await response.blob();
      
      // Créer une URL temporaire pour le Blob
      const url = window.URL.createObjectURL(blob);
      
      // Créer un élément <a> pour simuler un téléchargement
      const a = document.createElement("a");
      a.href = url;
      
      // Extraire l'extension de fichier à partir du type MIME
      const fileExtension = contentType.split("/")[1];
      a.download = `event-poster.${fileExtension}`; // Nom générique pour l'exemple (on peut rajouter un nom unique si besoin)
      
      // Ajouter l'élément à la page, le cliquer, puis le supprimer
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      // Libérer l'URL temporaire
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  return (
    <Button onClick={handleDownload} variant="contained" color="primary">
      DOWNLOAD EVENT POSTER
    </Button>
  );
};
