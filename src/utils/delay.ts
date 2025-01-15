export async function artificialDelay(delay: number) {
  await new Promise((resolve) => setTimeout(resolve, delay));
}
