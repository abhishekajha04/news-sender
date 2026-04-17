jest.mock("../services/news.service", () => ({
  fetchNews: jest.fn().mockResolvedValue(true)
}));

const { fetchNews } = require("../services/news.service");

describe("News Service", () => {
  test("Fetch news (mock)", async () => {
    await fetchNews();

    expect(fetchNews).toHaveBeenCalled();
  });
});