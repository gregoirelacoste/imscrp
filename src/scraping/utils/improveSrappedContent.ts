export const improveSrappedContent = (content: string) => {
  content = content.replace(/\s+/g, " ");

  // Supprimer le contenu des balises <script>
  const scriptRegex = /<script[^>]*>([\s\S]*?)<\/script>/gi;
  content = content.replace(scriptRegex, "");

  // Supprimer les commentaires
  const commentRegex = /<!--([\s\S]*?)-->/g;
  content = content.replace(commentRegex, "");
  /*
   // Supprimer les commentaires JavaScript
   const jsCommentRegex = /\/\/[^\n]*|\/\*[\s\S]*?\*\//g;
   content = content.replace(jsCommentRegex, "");
 */
  return content;
};
