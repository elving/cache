export default function respondWithError(res, response) {
  if (response instanceof Error) {
    res.status(500).json({ error: response.message });
  } else {
    res.status(500).json(response.data);
  }
}
