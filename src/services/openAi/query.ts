export type Query = {
    prompt: string,
    model: "text-curie-001" | "text-davinci-003"
}

export const createQuery = ({prompt, model = "text-curie-001"}: Query) => ({
    model,
    prompt,
    temperature: 0,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
})