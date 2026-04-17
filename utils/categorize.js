const CATEGORIES = [
  "gold", "silver", "diamonds", "jewellery",
  "stock_market", "global_markets", "banking", "insurance", "mutual_funds", "ipo",
  "venture_capital", "personal_finance",
  "fintech", "digital_payments", "upi", "lending", "bnpl", "crypto",
  "startups", "global_startups", "saas", "ai", "cybersecurity", "big_tech",
  "apps", "developer",
  "real_estate", "automobile", "ev", "energy", "renewable_energy",
  "fmcg", "retail", "ecommerce", "logistics",
  "indian_economy", "global_economy", "government_policy", "rbi", "tax",
  "marketing", "sales", "hr", "productivity",
  "spacetech", "defence", "climate", "healthtech", "edtech",
  "media"
];

const CATEGORY_MAP = {
  gold: ["gold", "bullion", "hallmark"],
  silver: ["silver"],
  diamonds: ["diamond"],
  jewellery: ["jewellery", "jewelry", "ornament"],

  stock_market: ["stock", "sensex", "nifty", "shares"],
  global_markets: ["nasdaq", "dow jones", "s&p 500"],
  banking: ["bank", "loan", "credit"],
  insurance: ["insurance", "policy"],
  mutual_funds: ["mutual fund", "sip"],
  ipo: ["ipo", "listing"],
  venture_capital: ["funding", "vc", "valuation"],
  personal_finance: ["saving", "investment", "wealth"],

  fintech: ["fintech"],
  digital_payments: ["payment", "wallet"],
  upi: ["upi", "phonepe", "gpay"],
  lending: ["loan", "nbfc"],
  bnpl: ["buy now pay later", "bnpl"],
  crypto: ["bitcoin", "crypto", "blockchain"],

  startups: ["startup"],
  global_startups: ["y combinator", "silicon valley"],
  saas: ["saas", "subscription software"],
  ai: ["ai", "artificial intelligence", "machine learning"],
  cybersecurity: ["hack", "cyber attack"],
  big_tech: ["google", "apple", "amazon", "meta"],
  apps: ["app launch", "mobile app"],
  developer: ["developer", "programming"],

  real_estate: ["real estate", "property"],
  automobile: ["car", "auto"],
  ev: ["electric vehicle", "ev"],
  energy: ["oil", "gas"],
  renewable_energy: ["solar", "wind"],
  fmcg: ["fmcg"],
  retail: ["retail"],
  ecommerce: ["ecommerce", "amazon", "flipkart"],
  logistics: ["supply chain", "logistics"],

  indian_economy: ["gdp india", "economy india"],
  global_economy: ["global economy", "inflation"],
  government_policy: ["government", "policy"],
  rbi: ["rbi", "repo rate"],
  tax: ["tax", "gst"],

  marketing: ["marketing", "ads"],
  sales: ["sales"],
  hr: ["hiring", "hr"],
  productivity: ["productivity", "tools"],

  spacetech: ["space", "isro"],
  defence: ["defence", "military"],
  climate: ["climate", "global warming"],
  healthtech: ["health tech", "medical tech"],
  edtech: ["edtech", "education tech"],
  media: ["media", "entertainment"]
};

const categorize = (title, description = "") => {
  const text = (title + " " + description).toLowerCase();

  for (let category in CATEGORY_MAP) {
    for (let keyword of CATEGORY_MAP[category]) {
      const regex = new RegExp(`\\b${keyword}\\b`, "i");

      if (regex.test(text)) {
        return category;
      }
    }
  }

  return "general";
};

module.exports = { categorize, CATEGORIES };