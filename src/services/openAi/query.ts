export type Query = {
    prompt:string
}

export const createQuery = ({prompt}:Query) => ({
    model: "text-curie-001",
    prompt,
    temperature: 1,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
})