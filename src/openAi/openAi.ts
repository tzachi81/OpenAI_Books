import { OpenAI, ClientOptions } from "openai";


const clientOptions: ClientOptions = {
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
};


const client = new OpenAI(clientOptions);

export const getBooksCollection = async () => {
  const input = "Get a random collection of 20 published books. Each book items will contain: id, title, author, publication_year, genre, description, cover_image. id will contain the isbn number of each book. A book item can Match more than one genre. Set each cover_image URL value to: 'PLACEHOLDER'. A returned result JSON object example: [{'id': 1,'title': 'The Silent Patient', 'description': 'A psychological thriller about a ...','cover_image': 'url_to_cover_image_1.jpg', 'author': 'Alex Michaelides', 'publication_year': '2019', 'genre': ['Thriller', 'Mystery'}]";

  const response = await client.chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "system", content: "Return a JSON response based on user input." },
      { role: "user", content: input }
    ],
    temperature: 0.3,
  });


  let content = response.choices[0].message.content;

  if (content) {
    //The response_format: "json" option is not yet officially supported in OpenAI's SDKs, so I need to handle the response manually.
    content = content.replace(/```json|```/g, "").trim();

    const parsedResults = JSON.parse(content); // Ensure it is valid JSON

    //I use the ISBN number as the id of the book item, to fetch its matching cover image
    for (const bookItem of parsedResults) {
      bookItem.cover_image = `https://covers.openlibrary.org/b/isbn/${bookItem.id}-M.jpg`
    }

    return parsedResults;

  } else {
    throw new Error("Invalid response from GPT-4o.");
  }
}
